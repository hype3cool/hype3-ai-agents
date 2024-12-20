type FilterButtonProps = {
    text: string;
    isSelected: boolean;
    onClick: () => void;
};

export const FilterButton = ({ text, isSelected, onClick }: FilterButtonProps) => {
    return (
        <div
            onClick={onClick}
            className={`py-3 px-6 bg-slate-400/10 hover:bg-blue-200 text-white hover:text-black rounded-full text-nowrap inline-flex items-center gap-3 active:bg-blue-200 active:text-black cursor-pointer ${
                isSelected ? 'bg-blue-200 text-black' : ''
            }`}
        >
            <div className="text-center text-xs sm:text-sm  font-semibold font-figtree md:text-base">{text}</div>
        </div>
    );
};
