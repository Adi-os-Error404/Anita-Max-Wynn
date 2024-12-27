import React from 'react'
import { CompanyTenK } from '../../../company';
import { Link } from 'react-router';

type Props = {
    tenK: CompanyTenK;
}

const TenKFinderItem = ({ tenK }: Props) => {
    const fillingData = new Date(tenK.fillingDate).getFullYear();

  return (
    <Link
        reloadDocument
        to={tenK.finalLink}
        type="button"
        className='inline-flex items-center p-4 text-md text-white bg-lightGreen rounded-md m-2'
    >
        10K - {tenK.symbol} - {fillingData}
    </Link>
  )
}

export default TenKFinderItem