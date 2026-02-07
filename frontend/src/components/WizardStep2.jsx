import { Plus, X, Book, Search } from 'lucide-react';
import { useState } from 'react';

const SUGGESTED_SUBJECTS = [
    "DBMS", "Advanced DBMS", "Operating Systems", "Computer Networks",
    "Software Engineering", "Engineering Mathematics III", "Data Structures",
    "Design & Analysis of Algorithms", "Theory of Computation"
];

export default function WizardStep2({ data, updateData }) {
    const subjects = data.subjects || [];
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const addSubject = (name) => {
        const sName = name || searchTerm;
        if (!sName) return;
        updateData({
            subjects: [...subjects, { id: Date.now(), name: sName, credits: 4 }]
        });
        setSearchTerm('');
        setShowSuggestions(false);
    };

    const removeSubject = (id) => {
        updateData({ subjects: subjects.filter(s => s.id !== id) });
    };

    const filteredSuggestions = SUGGESTED_SUBJECTS.filter(s =>
        s.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !subjects.find(sub => sub.name === s)
    );

    return (
        <div className="wizard-step">
            <div style={{ position: 'relative', marginBottom: 'var(--spacing-6)' }}>
                <label className="input-label">Search and Add subjects</label>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={18} className="text-secondary" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setShowSuggestions(true); }}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            className="input-field"
                            placeholder="Start typing (e.g. DB...)"
                            style={{ paddingLeft: '40px', width: '100%' }}
                        />
                        {showSuggestions && filteredSuggestions.length > 0 && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', zIndex: 20, marginTop: '4px', maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--color-border)' }}>
                                {filteredSuggestions.map(s => (
                                    <div
                                        key={s}
                                        onMouseDown={(e) => { e.preventDefault(); addSubject(s); }}
                                        style={{ padding: '10px 16px', cursor: 'pointer', fontSize: '14px', color: 'var(--color-text-main)' }}
                                        className="suggestion-item"
                                    >
                                        {s}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={() => addSubject()} className="btn btn-primary">Add</button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                {subjects.map((subject) => (
                    <div key={subject.id} className="card" style={{ padding: 'var(--spacing-3) var(--spacing-4)', boxShadow: 'var(--shadow-sm)', backgroundColor: 'white', borderLeft: '4px solid var(--color-primary)', display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontWeight: '500' }}>{subject.name}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 'bold', backgroundColor: 'var(--color-primary-light)', padding: '2px 8px', borderRadius: '4px' }}>
                            4 Credits
                        </div>
                        <button
                            onClick={() => removeSubject(subject.id)}
                            className="btn btn-ghost"
                            style={{ color: 'var(--color-error)', padding: '4px' }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {subjects.length === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0', color: '#9CA3AF' }}>
                    <Book size={48} style={{ marginBottom: '1rem', opacity: 0.1 }} />
                    <p style={{ fontSize: '14px' }}>Add subjects to get a smart analysis of your workload.</p>
                </div>
            )}
        </div>
    );
}
