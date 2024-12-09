import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api'; 
import Sidebar from '../../Components/Sidebar/Sidebar';
import Dashboard from '../../Components/Dashboard/Dashboard';
import Tile from '../../Components/Tile/Tile';

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
              <Dashboard>
                <Tile title='Company Name' subTitle={company.companyName} />
              </Dashboard>
            </div>
            ) :
                <div>
                    Company not found...
                </div>
            }
        </>
    )
}

export default CompanyPage