import { Sun, Moon, Coffee, Sunset, Clock, Calendar } from 'lucide-react';

export default function WizardStep3({ data, updateData }) {
    const handleChange = (field, value) => {
        updateData({ [field]: value });
    };

    const toggleDay = (day) => {
        const days = data.attendanceDays || [];
        if (days.includes(day)) {
            updateData({ attendanceDays: days.filter(d => d !== day) });
        } else {
            updateData({ attendanceDays: [...days, day] });
        }
    };

    return (
        <div className="wizard-step">
            <div className="card" style={{ padding: 'var(--spacing-6)', marginBottom: 'var(--spacing-6)' }}>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={20} className="text-primary" /> College Timings
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
                    <div className="input-group">
                        <label className="input-label">Start Time</label>
                        <input
                            type="time"
                            value={data.collegeStartTime || '09:00'}
                            onChange={(e) => handleChange('collegeStartTime', e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">End Time</label>
                        <input
                            type="time"
                            value={data.collegeEndTime || '17:00'}
                            onChange={(e) => handleChange('collegeEndTime', e.target.value)}
                            className="input-field"
                        />
                    </div>
                </div>

                <h3 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={18} className="text-primary" /> Attendance Days
                </h3>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                        const isSelected = (data.attendanceDays || []).includes(day);
                        return (
                            <button
                                key={day}
                                onClick={() => toggleDay(day)}
                                className="btn"
                                style={{
                                    backgroundColor: isSelected ? 'var(--color-primary)' : 'white',
                                    color: isSelected ? 'white' : 'var(--color-text-secondary)',
                                    borderColor: isSelected ? 'var(--color-primary)' : '#D1D5DB',
                                    padding: '4px 12px',
                                    fontSize: '12px'
                                }}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="card" style={{ padding: 'var(--spacing-6)', borderLeft: '4px solid #10B981' }}>
                <p style={{ fontSize: 'var(--font-size-sm)', color: '#065F46', lineHeight: '1.5' }}>
                    <strong>Note:</strong> Most Indian Universities assign 3–4 credits for core subjects. We will automatically apply this if you're unsure.
                </p>
            </div>
        </div>
    );
}
