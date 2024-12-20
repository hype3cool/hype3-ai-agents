import Link from 'next/link';
import React from 'react';

const items = [
    {
        id: 1,
        name: 'John Doe',
        title: 'Regional Paradigm Technician',
        email: '',
    },
    {
        id: 2,
        name: 'Jane Doe',
        title: 'Optimization',
        email: '',
    },
    {
        id: 3,
        name: 'John Doe',
        title: 'Central Security Manager',
        email: '',
    },
];

const ProfileTable = () => {
    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead>
                                <tr>
                                    <th scope="col" className=" text-start h-table-thead w-full">
                                        Agents
                                    </th>
                                    <th scope="col" className=" text-start h-table-thead px-3">
                                        Ticker
                                    </th>
                                    <th scope="col" className=" text-start h-table-thead px-3">
                                        Price
                                    </th>
                                    <th scope="col" className=" text-start h-table-thead px-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-red-200 dark:divide-slate-400/10">
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="whitespace-nowrap pr-3">
                                            <div className="flex items-center">
                                                <img src="/assets/images/sqaure-avatar.png" alt="avatar" className="w-8 h-8 rounded-lg" />
                                                <div className="text-white text-base font-semibold font-figtree tracking-tight ml-4">DeGods AI</div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 text-white text-base font-semibold font-figtree tracking-tight">$GODAI</td>
                                        <td className="whitespace-nowrap px-3 text-white text-base font-semibold font-figtree tracking-tight">$0.00054</td>
                                        <td className="whitespace-nowrap px-3">
                                            <div className="flex item-center space-x-4">
                                                <Link href="#">
                                                    <button type="button">
                                                        <span className="icon-x-twitter text-blue-200 text-base mr-2" />
                                                    </button>
                                                </Link>
                                                <Link href="#">
                                                    <button type="button">
                                                        <span className="icon-telegram-no-bg text-blue-200 text-base mr-2" />
                                                    </button>
                                                </Link>
                                                <Link href="#">
                                                    <button type="button">
                                                        <span className="icon-discord text-blue-200 text-base mr-2" />
                                                    </button>
                                                </Link>
                                                <Link href="#">
                                                    <button type="button">
                                                        <span className="icon-globe text-blue-200 text-base mr-2" />
                                                    </button>
                                                </Link>
                                                <Link href="#">
                                                    <button type="button">
                                                        <span className="icon-expand text-blue-200 text-base mr-2" />
                                                    </button>
                                                </Link>
                                            </div>
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

export default ProfileTable;
