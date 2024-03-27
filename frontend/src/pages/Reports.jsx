import React from 'react';
import ReportsTable from '../components/ReportsTable';


const Reports = () => {
    return (
        <div className='w-full h-full overflow-auto md:p-14 px-5 py-10 flex flex-wrap justify-center items-center gap-10'>
            <div className='h-full md:overflow-x-clip overflow-y-auto overflow-x-auto'>
                <ReportsTable />
            </div>
        </div>
    )
}

export default Reports