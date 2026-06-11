# Guia do Hóspede

Aplicação web que entrega ao hóspede tudo o que ele precisa durante a estadia em um imóvel de temporada: acesso por link único (`/FLN001`), informações operacionais (Wi-Fi, acesso, estacionamento, regras), um **Guia de Experiências da região gerado por IA** e um **assistente virtual em tempo real** que conhece o imóvel.

## Funcionalidades

- **Link único por imóvel** — `/{código}` renderiza o guia completo daquele imóvel; código inexistente cai em tela de erro amigável marcada com `noindex` (soft 404 do streaming do Next 16 — detalhes em [ARCHITECTURE.md](./ARCHITECTURE.md)).
- **Dados do imóvel** — fotos em galeria, tipo, localização, capacidade, amenidades, Wi-Fi com botão de copiar, instruções de acesso, estacionamento, regras da estadia e contato do anfitrião (telefone, WhatsApp e mapa).
- **Guia de Experiências por IA** — boas-vindas personalizada, restaurantes, atrações e serviços essenciais reais próximos do endereço, além de dica sazonal. Gerado uma única vez por estação e persistido no banco; feedback visual durante a geração e retry em caso de falha.
- **Assistente Virtual** — chat com streaming token a token, fundamentado exclusivamente nos dados do imóvel e no guia gerado; quando não sabe, orienta a falar com o anfitrião em vez de inventar.
- **Mobile-first** — layout pensado para o celular do hóspede, expandindo bem para desktop.

## Stack

Next.js 16 (App Router) · TypeScript estrito · Tailwind CSS 4 · PostgreSQL 17 + Prisma 7 · Vercel AI SDK + OpenAI · Vitest + Testing Library · Docker.

## Como rodar

### Com Docker (um comando)

```bash
cp .env.example .env   # preencha OPENAI_API_KEY
docker compose up -d
```

Sobe Postgres, aplica migrações + seed (FLN001 e GRM001) e inicia o app em [http://localhost:3000](http://localhost:3000).

### Desenvolvimento local

```bash
cp .env.example .env   # preencha OPENAI_API_KEY
docker compose up -d db
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm dev
```

### Variáveis de ambiente

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `DATABASE_URL` | sim | Conexão Postgres. |
| `OPENAI_API_KEY` | sim | Chave da API da OpenAI (guia de experiências e chat). |
| `AI_MODEL` | não | Modelo a usar (padrão `gpt-5.4-mini`). |

## Testes

```bash
pnpm test        # unitários + componentes (Vitest + Testing Library)
pnpm typecheck
pnpm lint
```

Cobrem o caso de uso de geração do guia (persistência por estação, deduplicação de chamadas concorrentes, propagação de falha), schemas Zod do conteúdo gerado, mapeamento banco→domínio, construção dos prompts (grounding e contextualização por endereço/estação) e estados de UI (loading, erro com retry, sucesso).

## Decisões técnicas

A arquitetura (Clean Architecture + Data Access Layer, com ports & adapters e composition root) está detalhada em [ARCHITECTURE.md](./ARCHITECTURE.md). Destaques:

- **Guia persistido por estação**: a chave de cache inclui a estação do ano (`inverno-2026`) — não regenera a cada acesso, mas a dica sazonal nunca fica obsoleta.
- **Saída estruturada com validação**: o LLM responde sob schema Zod (`generateObject`); conteúdo fora do contrato é rejeitado antes de persistir, e registro corrompido no banco é regenerado em vez de renderizado quebrado.
- **Grounding do chat**: o system prompt recebe a ficha completa do imóvel + o guia persistido e proíbe respostas fora desses dados; falhas no stream viram mensagem amigável no próprio chat.
- **Resiliência a falhas de IA**: geração concorrente deduplicada, `502` com mensagem clara e botão de tentar novamente; o restante do guia continua funcional mesmo com a IA indisponível.
- **`server-only` na infraestrutura**: segredos e acesso a dados não alcançam o bundle do cliente por construção.

## Limitações e evolução

- As recomendações vêm do conhecimento do modelo (com instruções para não inventar detalhes incertos); o próximo passo natural é um adapter com busca/Places API por trás do mesmo port.
- Testes E2E (Playwright) e rate limiting nas rotas de IA são as próximas adições óbvias para produção.
