import React, { useState } from 'react';

// Icon SVGs (assuming you are using Heroicons or similar for the plus/minus)
const MinusCircleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);
const PlusCircleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const CounterRow = ({ label, subtext, type, counts, updateCount }) => {
    const count = counts[type];
    const isMinusDisabled = count <= 0;
    
    const iconClass = (disabled) => 
        `p-1 ${disabled ? 'text-gray-300 border-gray-200' : 'text-gray-600 border-gray-400 hover:border-gray-600'} h-8 w-8 rounded-full border flex items-center justify-center transition`;

    return (
        <div className="flex justify-between items-center py-3">
            <div>
                <div className="font-bold text-base text-gray-800">{label}</div>
                <div className="text-gray-500 text-xs">{subtext}</div>
            </div>
            <div className="flex items-center space-x-3">
                <button 
                    type="button" 
                    onClick={() => updateCount(type, -1)}
                    disabled={isMinusDisabled}
                    className={iconClass(isMinusDisabled)}
                >
                    <MinusCircleIcon className="h-5 w-5" />
                </button>
                <span className="font-semibold text-gray-800 w-3 text-center text-base">{count}</span>
                <button 
                    type="button" 
                    onClick={() => updateCount(type, 1)}
                    className={iconClass(false)}
                >
                    <PlusCircleIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

const GuestSelector = ({ initialCounts, onGuestChange }) => {
    const [counts, setCounts] = useState(initialCounts);

    const updateCount = (type, delta) => {
        setCounts(prevCounts => {
            const newCount = Math.max(0, prevCounts[type] + delta);
            const newCounts = { ...prevCounts, [type]: newCount };
            onGuestChange(newCounts);
            return newCounts;
        });
    };

    return (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white p-5 rounded-xl shadow-2xl z-30 border border-gray-100">
            <CounterRow label="Adults" subtext="Ages 13 or above" type="adults" counts={counts} updateCount={updateCount} />
            <hr className="my-1 border-gray-100" />
            <CounterRow label="Children" subtext="Ages 2 or 12" type="children" counts={counts} updateCount={updateCount} />
            <hr className="my-1 border-gray-100" />
            <CounterRow label="Infants" subtext="Under 2" type="infants" counts={counts} updateCount={updateCount} />
        </div>
    );
};

export default GuestSelector;