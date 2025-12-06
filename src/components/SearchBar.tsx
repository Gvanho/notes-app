import React, { JSX, memo, useState } from "react";

export const SearchBarComponent: (props: SearchBarProps) => JSX.Element = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="搜索笔记..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
}

export const SearchBar = memo(SearchBarComponent);
SearchBar.displayName = 'SearchBar';