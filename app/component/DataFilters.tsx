'use client';
export default function Filters({ onFilter }: { onFilter: (filters: any) => void }) {
  return (
    <div className="flex gap-4 mb-6">
      <select onChange={(e) => onFilter({ region: e.target.value })}>
        <option value="">Усі регіони</option>
        <option value="Західний">Західний</option>
        <option value="Східний">Східний</option>
      </select>
    </div>
  );
}