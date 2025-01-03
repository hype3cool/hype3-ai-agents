'use client';
import React from 'react';
import { useCreateAgentClick } from '@/hooks/useCreateAgentClick';

const CreateNewAgent = () => {    
    const handleClick = useCreateAgentClick();

    return (
        <button onClick={handleClick} type="button" className="w-full">
            <div className="w-full h-[200px] relative bg-slate-400/5 rounded-lg shadow-inner border border-slate-400/20 p-2.5">
                <div className="h-full flex flex-col items-center justify-center bg-slate-400/5 rounded-lg border border-dashed border-blue-200/30">
                    <div className="icon-add-circle text-blue-200 text-[60px]" />
                    <div className="text-blue-200 text-lg font-semibold font-figtree mt-[22px]">Create New Agent</div>
                </div>
            </div>
        </button>
    );
};

export default CreateNewAgent;
