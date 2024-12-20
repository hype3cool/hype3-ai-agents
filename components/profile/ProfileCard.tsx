import React from 'react';

const ProfileCard = () => {
    return (
        // bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70
        <div className="flex flex-col border border-slate-400/10 rounded-tl-lg rounded-tr-lg rounded-bl-[18px] rounded-br-[18px]">
            <div className="relative w-full h-60 bg-gradient-to-b from-black to-black rounded-tl-lg rounded-tr-lg">
                <img
                    className="w-full h-auto rounded-tl-lg rounded-tr-lg"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7aa177dcfdaed3041daa49a0faaf5ce5189065d1b6932b8696e9a3706865cdc5?placeholderIfAbsent=true&apiKey=20766fa84f9a4404961ff5304dbabdcf"
                    alt="Card Image"
                />
                {/* <img
                    className="w-[60px] h-[60px] left-[27px] top-[157px] absolute rounded-full border-2 border-black"
                    src="https://via.placeholder.com/60x60"
                    alt="Profile Image"
                /> */}
                <div className="w-4 h-4 left-[489px] top-[204px] absolute" />
            </div>
            {/* <img
                className="w-full h-auto"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7aa177dcfdaed3041daa49a0faaf5ce5189065d1b6932b8696e9a3706865cdc5?placeholderIfAbsent=true&apiKey=20766fa84f9a4404961ff5304dbabdcf"
                alt="Card Image"
            /> */}
            <div className="p-4 md:p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="icon-x-twitter text-slate-400 text-4xl mr-2" />
                        <div>
                            <div className="flex items-center">
                                <h3 className="text-white text-lg font-bold font-figtree leading-tight tracking-tight">Elon Musk</h3>
                                <div className="ml-1 w-4 h-4 icon-badge text-blue-200" />
                            </div>

                            <span className="text-slate-400/80 text-xs font-semibold font-figtree leading-tight tracking-tight">@elonmusk</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className=" text-blue-200 text-[10px] font-bold font-figtree uppercase leading-snug tracking-tight">TOTAL EARNINGS</div>
                        <div>
                            <span className="text-white text-base font-bold font-figtree">$15,508 </span>
                            <span className="text-slate-400/60 text-base font-bold font-figtree">(233 SOL)</span>
                        </div>
                        <div>
                            <div className="w-[86px] h-[38px] p-1.5 bg-slate-400/10 rounded-[100px] justify-center items-center gap-1.5 inline-flex">
                                <div className="text-center text-white text-sm font-semibold font-['Figtree']">💰 Claim</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="w-[798px] h-20 rounded-bl-[18px] rounded-br-[18px] border border-slate-400/10" /> */}

                {/* <p className="mt-1 text-gray-500 dark:text-neutral-400">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a
                    className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    href="#"
                >
                    Go somewhere
                </a> */}
            </div>
        </div>
    );
};

export default ProfileCard;
