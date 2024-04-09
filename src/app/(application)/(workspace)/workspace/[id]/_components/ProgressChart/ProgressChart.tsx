import React from 'react'
import { AreaChart } from '@mantine/charts';
export const data = [
    {
        date: 'Mar 22',
        Completed: 4,
    },
    {
        date: 'Mar 23',
        Completed: 17,
    },
    {
        date: 'Mar 24',
        Completed: 8,
    },
    {
        date: 'Mar 25',
        Completed: 18,
    },
    {
        date: 'Mar 26',
        Completed: 22,
    },
];

const ProgressChart = () => {
    return (
        <div className='w-full h-full flex flex-col gap-2 relative'>
            <div className='z-[999] backdrop-blur-md  p-3 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
                <h1>Under Development</h1>
            </div>
            <div>
                <h2 className='font-semibold'>Your Progress status</h2>
            </div>
            <AreaChart
                h={200}
                data={data}
                dataKey="date"
                series={[
                    { name: 'Completed', color: 'teal.6' },
                ]}
                curveType="monotone"
            />
        </div>
    )
}

export default ProgressChart