import React from 'react'
import './Card.css'

interface Props {
  company: string;
  ticker: string;
  price: number;
}

const Card: React.FC<Props> = ({company, ticker, price}: Props): JSX.Element => {
  return (
    <div className='card'>
        <img
            src='https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg'
            alt='Cat'
        />
        <h2>{company} ({ticker})</h2>
        <p>${price}</p>
        <p className='info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, asperiores.</p>
    </div>
  )
}

export default Card