import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { CompanySearch } from '../../company';
import { searchCompanies } from '../../api';
import Hero from '../../Components/Hero/Hero';
import Search from '../../Components/Search/Search';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';

interface Props {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [searchResults, setsearchResults] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);
    const [portfolioVals, setPortfolioVals] = useState<string[]>([]);

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
        
        const onPortfolioCreate = (e: any) => {
        e.preventDefault()
        if (!portfolioVals.includes(e.target[0].value)) {
            const pureUpdatedPort = [...portfolioVals, e.target[0].value]
            setPortfolioVals(pureUpdatedPort);
        }
        }
    
        const onPortfolioDelete = (e: any) => {
        e.preventDefault()
        const removed = portfolioVals.filter((val) => {
            return val !== e.target[0].value;
        })
        setPortfolioVals(removed);
        }

    return (
        <>
            <Search 
                onSearchSubmit={onSearchSubmit} 
                search={search} 
                handleSearchChange={handleSearchChange}
            />

            {serverError && 
                <h1>{serverError}</h1>
            }
            <ListPortfolio
                portfolioValues={portfolioVals}
                onPortfolioDelete={onPortfolioDelete}
            />
            <CardList 
                searchResults={searchResults} 
                onPortfolioCreate={onPortfolioCreate}
            />
        </>
    )
}

export default SearchPage