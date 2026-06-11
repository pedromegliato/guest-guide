import { Skeleton } from "@/components/atoms/skeleton";

export default function PropertyGuideLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-28 pt-5 md:pt-8">
      <Skeleton className="aspect-[4/3] w-full rounded-2xl md:aspect-[16/9]" />
      <div className="mt-4 grid gap-2.5">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="mt-7 grid gap-5">
        <Skeleton className="h-52 w-full rounded-2xl" />
        <Skeleton className="h-52 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    </div>
  );
}
