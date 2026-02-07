import { Calendar, AlertCircle } from 'lucide-react';

export default function WizardStep4({ data, updateData }) {
    const subjects = data.subjects || [];

    const updateSubject = (id, field, value) => {
        updateData({
            subjects: subjects.map(s => s.id === id ? { ...s, [field]: value } : s)
        });
    };

    if (subjects.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <AlertCircle size={48} color="var(--color-warning)" style={{ marginBottom: '1rem' }} />
                <p>No subjects found. Please go back to Step 2 and add subjects.</p>
            </div>
        );
    }

    return (
        <div className="wizard-step">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
                {subjects.map((subject) => (
                    <div key={subject.id} className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-4)' }}>{subject.name}</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)' }}>
                            <div>
                                <label className="input-label">Target Completion Date</label>
                                <div style={{ position: 'relative' }}>
                                    <Calendar size={18} className="text-secondary" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="date"
                                        value={subject.targetDate || ''}
                                        onChange={(e) => updateSubject(subject.id, 'targetDate', e.target.value)}
                                        className="input-field"
                                        style={{ paddingLeft: '40px', width: '100%' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="input-label">Confidence Level (1-5)</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '42px' }}>
                                    <input
                                        type="range" min="1" max="5" step="1"
                                        value={subject.confidence || 3}
                                        onChange={(e) => updateSubject(subject.id, 'confidence', parseInt(e.target.value))}
                                        style={{ flex: 1, accentColor: 'var(--color-primary)' }}
                                    />
                                    <span style={{
                                        fontWeight: 'bold',
                                        width: '24px',
                                        textAlign: 'center',
                                        color: (subject.confidence || 3) < 3 ? 'var(--color-error)' : 'var(--color-success)'
                                    }}>
                                        {subject.confidence || 3}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-4)' }}>
                            <label className="input-label">Strong Areas (comma separated)</label>
                            <input
                                type="text"
                                value={subject.strongAreas || ''}
                                onChange={(e) => updateSubject(subject.id, 'strongAreas', e.target.value)}
                                className="input-field"
                                placeholder="e.g. Loops, Arrays"
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div>
                            <label className="input-label">Weak Areas (comma separated)</label>
                            <input
                                type="text"
                                value={subject.weakAreas || ''}
                                onChange={(e) => updateSubject(subject.id, 'weakAreas', e.target.value)}
                                className="input-field"
                                placeholder="e.g. Pointers, Recursion"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
