import React from 'react';

type ProgressbarWithFigureProps = {
    percentage: number;
};

const ProgressbarWithFigure = ({ percentage }: ProgressbarWithFigureProps) => {
    return (
        <>
            <div className="flex w-full h-2.5 my-4 bg-gray-200 rounded-[30px] overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
                <div
                    className="flex flex-col justify-center rounded-[30px] overflow-hidden bg-blue-200 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-200"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <div className="text-right text-white/70 text-sm font-semibold font-figtree leading-snug tracking-normal w-14">{`${percentage.toFixed(2)}%`}</div>
        </>
    );
};

export default ProgressbarWithFigure;
