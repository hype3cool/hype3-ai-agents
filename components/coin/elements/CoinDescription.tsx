import React, { useState, useRef, useEffect } from 'react';

type CoinDescriptionProps = {
    description: string;
    expandable?: boolean;
};

const CoinDescription = ({ description, expandable = false }: CoinDescriptionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showMoreButton, setShowMoreButton] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkHeight = () => {
            if (contentRef.current) {
                const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
                const maxHeight = lineHeight * 2; // 3 lines
                setShowMoreButton(contentRef.current.scrollHeight > maxHeight);
                if (!isExpanded) {
                    contentRef.current.style.maxHeight = `${maxHeight}px`;
                    contentRef.current.style.overflow = 'hidden';
                } else {
                    contentRef.current.style.maxHeight = 'none';
                    contentRef.current.style.overflow = 'visible';
                }
            }
        };

        checkHeight();
        window.addEventListener('resize', checkHeight);
        return () => window.removeEventListener('resize', checkHeight);
    }, [isExpanded, description]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col">
            <div 
                ref={contentRef}
                className="text-white/70 text-sm font-medium font-figtree transition-all duration-300"
                dangerouslySetInnerHTML={{ __html: description }}
            />
            {showMoreButton && expandable && (
                <button 
                    onClick={toggleExpand}
                    className="mt-2 text-xs font-semibold text-white/70 leading-[18px] cursor-pointer hover:text-white self-start"
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                </button>
            )}
        </div>
    );
};

export default CoinDescription;