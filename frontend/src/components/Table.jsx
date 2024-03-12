import React from 'react';

const people = [
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image: 'https://bit.ly/33HnjK0',
    },
    {
      name: 'John Doe',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Tester',
      email: 'john.doe@example.com',
      image: 'https://bit.ly/3I9nL2D',
    },
    {
      name: 'Veronica Lodge',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: ' Software Engineer',
      email: 'veronica.lodge@example.com',
      image: 'https://bit.ly/3vaOTe1',
    },
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.coope@example.com',
        image: 'https://bit.ly/33HnjK0',
      },
      {
        name: 'John Doe',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Tester',
        email: 'john.do@example.com',
        image: 'https://bit.ly/3I9nL2D',
      },
      {
        name: 'Veronica Lodge',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: ' Software Engineer',
        email: 'veronica.lodg@example.com',
        image: 'https://bit.ly/3vaOTe1',
      },
      {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.coopr@example.com',
        image: 'https://bit.ly/33HnjK0',
      },
      {
        name: 'John Doe',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Tester',
        email: 'john.de@example.com',
        image: 'https://bit.ly/3I9nL2D',
      },
      {
        name: 'Veronica Lodge',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: ' Software Engineer',
        email: 'veronica.lode@example.com',
        image: 'https://bit.ly/3vaOTe1',
      },
      {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooer@example.com',
        image: 'https://bit.ly/33HnjK0',
      },
      {
        name: 'John Doe',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Tester',
        email: 'john.oe@example.com',
        image: 'https://bit.ly/3I9nL2D',
      },
      {
        name: 'Veronica Lodge',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: ' Software Engineer',
        email: 'veronica.loge@example.com',
        image: 'https://bit.ly/3vaOTe1',
      },
    // More people...
  ];

const Table = () => {
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow border-b border-[#c2a2a2d5] sm:rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-[#c2a2a2d5]">
                            <thead className="bg-[#d4a9a9]">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-s font-medium text-white uppercase tracking-wider"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-s font-medium text-white uppercase tracking-wider"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-s font-medium text-white uppercase tracking-wider"
                                    >
                                        Description
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">View</span>
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Download</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-[#c2a2a2d5]">
                                {people.map(person => (
                                    <tr key={person.email}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                2024/01/23
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{person.title}</div>
                                            <div className="text-sm text-gray-500">{person.department}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            Dress making using 3 steps
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className='bg-[#8b6b7c] w-[6rem] py-2 rounded-full text-white text-sm hover:bg-[#a08493] hover:-translate-y-1 tranform duration-200'>View</button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className='bg-[#85585f] w-[6rem] py-2 rounded-full text-white text-sm hover:bg-[#9b7076] hover:-translate-y-1 tranform duration-200'>Download</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;