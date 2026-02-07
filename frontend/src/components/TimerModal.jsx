import { X, Play, Pause, RotateCcw } from 'lucide-react';
import { useTimer } from '../context/TimerContext';

export default function TimerModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    const { seconds, isActive, toggleTimer, resetTimer } = useTimer();

    const formatTime = (totalSeconds) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'var(--color-bg-card)',
                padding: 'var(--spacing-8)',
                borderRadius: 'var(--radius-xl)',
                width: '320px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-border)',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                    <X size={20} />
                </button>

                <h2 style={{ marginBottom: 'var(--spacing-6)', fontSize: 'var(--font-size-xl)' }}>Focus Session</h2>

                <div style={{
                    fontSize: '48px',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    marginBottom: 'var(--spacing-8)',
                    color: 'var(--color-primary)'
                }}>
                    {formatTime(seconds)}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
                    <button
                        onClick={toggleTimer}
                        className="btn btn-primary"
                        style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                    >
                        {isActive ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <button
                        onClick={resetTimer}
                        className="btn btn-secondary"
                        style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>

                <p style={{ marginTop: 'var(--spacing-6)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    {isActive ? "Focus mode active. You're doing great!" : "Ready to start your next session?"}
                </p>
            </div>
        </div>
    );
}
