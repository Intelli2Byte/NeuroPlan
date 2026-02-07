import { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export function TimerProvider({ children }) {
    const [seconds, setSeconds] = useState(() => {
        const saved = localStorage.getItem('neuroplan_timer_seconds');
        return saved ? parseInt(saved, 10) : 0;
    });
    const [isActive, setIsActive] = useState(() => {
        return localStorage.getItem('neuroplan_timer_active') === 'true';
    });

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prev => {
                    const next = prev + 1;
                    localStorage.setItem('neuroplan_timer_seconds', next.toString());
                    return next;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        localStorage.setItem('neuroplan_timer_active', isActive.toString());
    }, [isActive]);

    const resetTimer = () => {
        setIsActive(false);
        setSeconds(0);
        localStorage.setItem('neuroplan_timer_seconds', '0');
        localStorage.setItem('neuroplan_timer_active', 'false');
    };

    const toggleTimer = () => setIsActive(prev => !prev);

    return (
        <TimerContext.Provider value={{ seconds, isActive, toggleTimer, resetTimer }}>
            {children}
        </TimerContext.Provider>
    );
}

export const useTimer = () => useContext(TimerContext);
