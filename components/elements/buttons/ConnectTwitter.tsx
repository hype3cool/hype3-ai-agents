import React from 'react';

const ConnectTwitter = () => {
    return (
        <div className="py-3 px-6 bg-slate-400/10 hover:bg-blue-200 text-white hover:text-black rounded-[100px] inline-flex justify-center items-center gap-3 active:bg-blue-200 active:text-black">
            <div className="text-center text-base font-semibold font-figtree">🔗 Connect</div>
            <span className="icon-x-twitter text-sm pl-1.5" />
        </div>
    );
};

export default ConnectTwitter;
