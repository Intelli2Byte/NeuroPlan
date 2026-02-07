import { useState, useEffect } from 'react';

const quotes = [
    "The secret to getting ahead is getting started.",
    "Discipline is the bridge between goals and accomplishment.",
    "Your academic journey is a marathon, not a sprint.",
    "The only way to do great work is to love what you do.",
    "Focus on progress, not perfection.",
    "Success is the sum of small efforts, repeated day in and day out."
];

export default function QuoteHeader() {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);

    return (
        <div style={{
            textAlign: 'center',
            padding: 'var(--spacing-4)',
            backgroundColor: 'var(--color-primary-light)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-6)',
            border: '1px solid var(--color-primary)',
            color: 'var(--color-primary)',
            fontStyle: 'italic',
            fontSize: 'var(--font-size-sm)',
            fontWeight: '600'
        }}>
            "{quote}"
        </div>
    );
}
