import { useEffect, useRef } from 'react';

const AnimatedNumber = ({ value = 0, suffix = '', duration = 1000 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const start = 0;
        const end = Number(value);
        if (!ref.current || isNaN(end)) return;

        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            if (ref.current) ref.current.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [value, suffix, duration]);

    return <span ref={ref}>{Number(value).toLocaleString()}{suffix}</span>;
};

export default AnimatedNumber;