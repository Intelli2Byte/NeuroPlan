import { useTimer } from '../context/TimerContext';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

export default function ProductivityTimer() {
    const { seconds, isActive, toggleTimer, resetTimer } = useTimer();

    const formatTime = (totalSeconds) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-3)',
            backgroundColor: 'var(--color-bg-app)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
        }}>
            <Clock size={16} className="text-primary" />
            <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: 'var(--font-size-sm)', minWidth: '70px' }}>
                {formatTime(seconds)}
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={toggleTimer} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex' }}>
                    {isActive ? <Pause size={14} className="text-secondary" /> : <Play size={14} className="text-primary" />}
                </button>
                <button onClick={resetTimer} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex' }}>
                    <RotateCcw size={14} className="text-secondary" />
                </button>
            </div>
        </div>
    );
}
