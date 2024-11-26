import React from 'react'
import Card from '../Card/Card'

interface Props {}

const CardList: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div>
        <Card company='Apple' ticker='AAPL' price={100} />
        <Card company='Microsoft' ticker='MSFT' price={200} />
        <Card company='Tesla' ticker='TSLA' price={300} />
    </div>
  )
}

export default CardList