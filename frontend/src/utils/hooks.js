import { useState, useEffect } from 'react';

export const useScrollPosition = (threshold = 0) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updatePosition = () => {
            setIsVisible(window.pageYOffset > threshold);
        };

        window.addEventListener('scroll', updatePosition);
        updatePosition();

        return () => window.removeEventListener('scroll', updatePosition);
    }, [threshold]);

    return isVisible;
};
