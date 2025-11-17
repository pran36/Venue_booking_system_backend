import React, { useState, useRef, useEffect } from 'react';

// Mock data for categories
const categories = [
    { id: 'function-center', name: 'Function Center', icon: '🎉' },
    { id: 'catering', name: 'Catering', icon: '🍽️' },
    { id: 'photo-video', name: 'Photo & Video', icon: '📸' },
    { id: 'kids-party', name: 'Kids Party', icon: '🥳' },
    { id: 'dj-service', name: 'Dj Service', icon: '💿' },
    { id: 'decor', name: 'Decor', icon: '🎊' },
    { id: 'makeup-artist', name: 'Makeup Artist', icon: '💄' },
];

const CategorySelector = () => {
    // State for tracking the currently active (clicked) category
    const [activeCategory, setActiveCategory] = useState('function-center');
    
    // State for the position and size of the moving blue bar
    const [barStyle, setBarStyle] = useState({ width: 0, left: 0 });
    
    // Refs to measure the container and individual items
    const containerRef = useRef(null);
    const itemRefs = useRef({});

    // Function to calculate and update the bar position/width
    const updateBarStyle = (categoryId) => {
        const activeItem = itemRefs.current[categoryId];
        const container = containerRef.current;
        
        if (activeItem && container) {
            const containerRect = container.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();
            
            // Calculate the bar width to be 80% of the item's width (for padding)
            // and its position relative to the container's left edge
            const barWidth = itemRect.width;
            const barLeft = itemRect.left - containerRect.left;
            
            setBarStyle({
                width: barWidth,
                left: barLeft,
            });
        }
    };

    // Effect to set the bar position on initial load and when active category changes
    useEffect(() => {
        // We use the activeCategory to set the bar's default position
        updateBarStyle(activeCategory);
        
        // Recalculate position on window resize
        window.addEventListener('resize', () => updateBarStyle(activeCategory));
        return () => window.removeEventListener('resize', () => updateBarStyle(activeCategory));
    }, [activeCategory]);
    
    // Handler for moving the bar to the hovered item
    const handleMouseEnter = (categoryId) => {
        updateBarStyle(categoryId);
    };

    // Handler for returning the bar to the active item
    const handleMouseLeave = () => {
        updateBarStyle(activeCategory);
    };

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
    };

    return (
        <div className="bg-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div 
                    ref={containerRef}
                    className="relative flex justify-between items-start text-center space-x-4 overflow-x-auto scrollbar-hide"
                >
                    {categories.map((category) => (
                        <div 
                            key={category.id} 
                            ref={el => itemRefs.current[category.id] = el}
                            className="shrink-0 flex flex-col items-center cursor-pointer group pb-4 pt-1" // Added padding to compensate for bar height
                            onClick={() => handleCategoryClick(category.id)}
                            onMouseEnter={() => handleMouseEnter(category.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Icon Circle */}
                            <div className="relative w-16 h-16 rounded-full flex items-center justify-center mb-2 bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
                                <span className="text-3xl">{category.icon}</span>
                            </div>
                            
                            {/* Category Name */}
                            <div className={`text-sm font-medium whitespace-nowrap ${activeCategory === category.id ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-500'} transition-colors duration-200`}>
                                {category.name}
                            </div>
                        </div>
                    ))}

                    {/* The Single Moving Underline Bar */}
                    <div 
                        className="absolute bottom-0 h-1 bg-blue-600 rounded-full transition-all duration-300 ease-out" 
                        style={{ 
                            width: `${barStyle.width * 0.8}px`, // Use 80% of item width for a centered bar
                            transform: `translateX(${barStyle.left + barStyle.width * 0.1}px)`, // Adjust position for 80% width centering
                        }}
                    ></div>
                </div>
            </div>
            {/* Optional: A bottom border for the entire selector area */}
            <div className="border-b border-gray-200 mt-2"></div>
        </div>
    );
};

export default CategorySelector;