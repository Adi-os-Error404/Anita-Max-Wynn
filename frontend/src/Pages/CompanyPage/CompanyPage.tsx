import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api'; 
import Sidebar from '../../Components/Sidebar/Sidebar';
import Dashboard from '../../Components/Dashboard/Dashboard';
import Tile from '../../Components/Tile/Tile';
import Spinner from '../../Components/Spinner/Spinner';
import TenKFinder from '../../Components/TenKFinder/TenKFinder';

interface Props {}

const CompanyPage = (props: Props) => {
    let { ticker } = useParams();
    const [company, setCompany] = useState<CompanyProfile>();
    
    useEffect(() => {
        const getProfileInit = async () => {
            const res = await getCompanyProfile(ticker!);
            setCompany(res?.data[0]);
        }
        getProfileInit();
    }, [])

    return (
        <>
            {company ? (
              <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
              <Sidebar />
              <Dashboard ticker={ticker!}>

                <Tile title='Company Name' subTitle={company.companyName} />
                
                <Tile title='Price' subTitle={"$" + company.price.toString()} />

                <Tile title='DCF' subTitle={"$" + company.dcf.toString()} />

                <Tile title='Sector' subTitle={company.sector} />

                <TenKFinder ticker={company.symbol} />


                <p className='bg-white shadow rounded text-medium text-gray-500 p-3 mt-1 m-4'>
                    {company.description}
                </p>


            </Dashboard>
            </div>
            ) :
                <Spinner />
            }
        </>
    )
}

export default CompanyPage