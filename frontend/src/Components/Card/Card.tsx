import React from 'react'
import './Card.css'

type Props = {}

const Card = (props: Props) => {
  return (
    <div className='card'>
        <img
            src='https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg'
            alt='Cat'
        />
        <h2>AAPL</h2>
        <p>$110</p>
        <p className='info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, asperiores.</p>
    </div>
  )
}

export default Card