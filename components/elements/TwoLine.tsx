import React from 'react';

type TwoLineProps = {
    title: string;
    value: string;
    align?: 'left' | 'right' | 'center';
};

const TwoLine = ({title, value, align = 'left'}: TwoLineProps) => {
    return (
        <div className={`flex flex-col text-${align}`}>
            <div className=" text-blue-200 text-[10px] font-bold uppercase font-figtree leading-snug tracking-tight">{title}</div>
            <div className=" text-white/90 text-base font-bold font-figtree leading-snug">
            {value}
            </div>
        </div>
    );
};

export default TwoLine;
