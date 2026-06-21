const filters = [
  { value: 'all', label: 'Все' },
  { value: 'html', label: 'HTML' },
  { value: 'semantics', label: 'Семантика' },
  { value: 'forms', label: 'Формы' }
];

export default function ArticleFilters({ selectedCategory, onChange }) {
  return (
    <div className="article-filters" aria-label="Фильтр статей по категориям">
      {filters.map((filter) => (
        <button
          className={`filter-button ${selectedCategory === filter.value ? 'active' : ''}`}
          type="button"
          key={filter.value}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
