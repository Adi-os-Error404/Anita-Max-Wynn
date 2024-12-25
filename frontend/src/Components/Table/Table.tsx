import React from 'react'
import { testIncomeStatementData } from '../../Components/Table/testData';


type Props = {}

const data = testIncomeStatementData;
type Company = (typeof data)[0];
const configs = [
    {
        label: "Year",
        render: (comp: Company) => comp.acceptedDate,
    },
    {
        label: "Cost of Revenue",
        render: (comp: Company) => comp.costOfRevenue
    }
]

const Table = (props: Props) => {
    const renderedRows = data.map((company: any) => {
        return (
        <tr key={company.cik}>
            {configs.map((val: any) => {
            return <td className="p-3">{val.render(company)}</td>;
            })}
        </tr>
        );
    });

    const renderedHeaders = configs.map((config: any) => {
        return (
        <th
            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            key={config.label}
        >
            {config.label}
        </th>
        );
    });


    return (
        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:0-8'>
            <table>
                <thead className='min-w-full divide-y divide=gray-200 m-5'>
                    {renderedHeaders}
                </thead>
                <tbody>
                    {renderedRows}
                </tbody>
            </table>
        </div>
    )
}

export default Table