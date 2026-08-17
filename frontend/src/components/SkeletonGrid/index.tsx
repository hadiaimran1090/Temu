export function SkeletonGrid() {
  return (
    <div className="grid gap-4 grid-cols-5 max-[1100px]:grid-cols-3 max-[720px]:grid-cols-2 max-[720px]:gap-3">
      {Array.from({ length: 5 }, (_, index) => (
        <div className="animate-pulse bg-slate-200 aspect-[1/1.35] rounded-[14px]" key={index} />
      ))}
    </div>
  );
}
