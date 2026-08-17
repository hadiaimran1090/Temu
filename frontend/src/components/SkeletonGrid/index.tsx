import "./SkeletonGrid.css";

export function SkeletonGrid() {
  return (
    <div className="card-grid">
      {Array.from({ length: 5 }, (_, index) => (
        <div className="skeleton-card" key={index} />
      ))}
    </div>
  );
}
