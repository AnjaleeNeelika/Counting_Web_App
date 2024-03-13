import React from 'react';
import Table from '../components/ReportsTable';
import ReportsTable from '../components/ReportsTable';

const Reports = () => {
    return (
        <div className='w-full h-full overflow-auto p-14 flex flex-wrap justify-center items-center gap-10'>
            <div className=''>
                <ReportsTable />
            </div>
        </div>
    )
}

export default Reports