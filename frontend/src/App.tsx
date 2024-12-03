import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './Components/CardList/CardList'
import Search from './Components/Search/Search'
import { CompanySearch } from './company';
import { searchCompanies } from './api';

function App() {

  const [search, setSearch] = useState<string>("");
  const [searchResults, setsearchResults] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }
  
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    }
    else if (Array.isArray(result.data)) {
      setsearchResults(result.data)
    }
  }
  
  const onPortfolioCreate = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log("add")
  }
  
  return (
    <div className="App">
      <Search 
        onSearchSubmit={onSearchSubmit} 
        search={search} 
        handleSearchChange={handleSearchChange}
      />

      {serverError && 
        <h1>{serverError}</h1>
      }

      <CardList 
        searchResults={searchResults} 
        onPortfolioCreate={onPortfolioCreate}
      />
    </div>
  );
}

export default App;
