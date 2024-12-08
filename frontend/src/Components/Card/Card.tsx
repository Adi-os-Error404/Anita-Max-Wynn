import React, { SyntheticEvent } from 'react'
import './Card.css'
import { CompanySearch } from '../../company';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio'

interface Props {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({id, searchResult, onPortfolioCreate}: Props): JSX.Element => {
  return (
    <div 
      className='card'
      id={id}
      key={id}
    >
      <img
          src='https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg'
          alt='compant logo'
      />
      <h2>{searchResult.name} ({searchResult.symbol})</h2>
      <p>${searchResult.currency}</p>
      <p className='info'>{searchResult.exchangeShortName} - {searchResult.stockExchange}</p>
      <AddPortfolio 
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  )
}

export default Card