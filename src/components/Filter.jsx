function Filter({ filter, setFilter, search, setSearch }) {
  return (
    <div style={{ margin: "15px 0" }}>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Все</option>
        <option value="read">Прочитанные</option>
        <option value="unread">Непрочитанные</option>
      </select>

      <input
        type="text"
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
}

export default Filter;