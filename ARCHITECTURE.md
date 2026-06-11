# Arquitetura

O projeto segue **Clean Architecture** adaptada ao Next.js App Router, combinada com o padrão de **Data Access Layer** recomendado pela documentação oficial do Next.js. O objetivo é manter as regras de negócio independentes de framework, banco e provedor de IA — cada um desses é um detalhe substituível atrás de uma interface.

## Camadas

```
┌─────────────────────────────────────────────────────────┐
│  app/            Framework (rotas finas, páginas, API)  │
│  components/     Apresentação (Atomic Design)           │
├─────────────────────────────────────────────────────────┤
│  di/             Composition root (liga ports→adapters) │
├─────────────────────────────────────────────────────────┤
│  infrastructure/ Adapters: Prisma, LLM, env (server-only)│
├─────────────────────────────────────────────────────────┤
│  application/    Casos de uso + ports (interfaces)      │
├─────────────────────────────────────────────────────────┤
│  domain/         Entidades, schemas e regras puras      │
└─────────────────────────────────────────────────────────┘
```

**Dependency rule**: as dependências apontam sempre para baixo. `domain` não importa nada das outras camadas; `application` só importa `domain`; `infrastructure` implementa os ports de `application`; `app` consome tudo via `di`.

## Pastas

| Pasta | Responsabilidade |
| --- | --- |
| `src/domain` | Tipos do negócio (`Property`, `ExperienceGuide`), schemas Zod, estação do ano, labels. Puro e isomórfico — pode ser importado por Client Components. |
| `src/application/ports` | Interfaces (`PropertyRepository`, `ExperienceGuideRepository`, `ExperienceGuideGenerator`). |
| `src/application/use-cases` | Regras de orquestração. `GetOrGenerateExperienceGuide` decide entre guia persistido e nova geração, com deduplicação de gerações concorrentes. |
| `src/infrastructure` | Implementações: repositórios Prisma, adapter do LLM (Vercel AI SDK + Anthropic), prompts, acesso a `process.env`. Todos os módulos importam `server-only`, impedindo vazamento para o bundle do cliente. |
| `src/di` | Composition root: instancia adapters e injeta nos casos de uso. Único lugar que conhece implementações concretas. |
| `src/components` | Atomic Design: `atoms` → `molecules` → `organisms` → `templates`. Server Components por padrão; `"use client"` apenas nas folhas interativas (galeria, chat, guia de experiências, copiar senha). |
| `src/app` | Rotas finas: páginas resolvem params, chamam o caso de uso/repositório e delegam a renderização aos templates. Route handlers cuidam apenas de HTTP (status, validação de entrada, streaming). |

## Fluxos principais

### Guia de Experiências (`GET /api/properties/[code]/experience-guide`)

1. Route handler normaliza o código e busca o imóvel (404 se não existir).
2. `GetOrGenerateExperienceGuide` consulta o repositório: se há guia persistido **da estação atual**, retorna sem tocar no LLM.
3. Caso contrário, o port `ExperienceGuideGenerator` (adapter: `generateObject` com schema Zod) gera o conteúdo contextualizado pelo endereço real e pela estação, valida a estrutura e persiste via upsert.
4. Acessos concorrentes ao mesmo imóvel compartilham a mesma Promise de geração (mapa `inFlight`), evitando chamadas duplicadas ao LLM.
5. Falhas viram `502` com mensagem amigável; o componente cliente oferece retry.

A chave de persistência inclui a estação (`inverno-2026`): o guia não é regenerado a cada acesso, mas a dica sazonal não fica obsoleta entre estações.

### Assistente Virtual (`POST /api/properties/[code]/chat`)

1. Valida as mensagens recebidas (`validateUIMessages`) e limita o histórico.
2. Monta o system prompt com a ficha completa do imóvel + guia persistido (grounding): o assistente é instruído a responder apenas com base nesses dados e a encaminhar ao anfitrião o que não souber.
3. `streamText` responde no protocolo de UI message stream consumido pelo `useChat`; erros do stream viram mensagem amigável via `onError`.

## Decisões e trade-offs

- **DI manual via composition root** em vez de container IoC: o grafo de dependências é pequeno; uma função por serviço mantém tudo tipado e rastreável sem `reflect-metadata`.
- **Campos planos no Postgres** com mapeamento para objetos de domínio no repositório: evita joins para um agregado que é sempre lido inteiro, e o mapper é testado isoladamente.
- **Conteúdo do guia validado com Zod na leitura**: registro persistido corrompido/legado é tratado como inexistente e regenerado — nunca renderizado quebrado.
- **Recomendações vêm do conhecimento do modelo**: o prompt proíbe inventar detalhes incertos. Evolução natural: ferramenta de busca/Places API como segundo adapter do mesmo port.
- **Soft 404 em código inexistente**: o Next 16 faz streaming das páginas dinâmicas, então o status HTTP já foi enviado quando `notFound()` é avaliado. Seguimos o comportamento documentado do framework: tela amigável + `<meta name="robots" content="noindex">` injetada automaticamente, o que evita indexação sem abrir mão do streaming (um 404 físico exigiria bloquear a resposta em `proxy.ts`).

## Referências

- [Next.js — Data Security & Data Access Layer](https://nextjs.org/docs/app/guides/data-security)
- [Clean Architecture aplicada a Next.js (Lazar Nikolov)](https://github.com/nikolovlazar/nextjs-clean-architecture)
- [Feature-Sliced Design — App Router](https://feature-sliced.design/blog/nextjs-app-router-guide)
