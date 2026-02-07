import { User, School, BookOpen, GraduationCap, Mail, Building, Landmark } from 'lucide-react';

export default function WizardStep1({ data, updateData }) {
    const handleChange = (e) => {
        updateData({ [e.target.name]: e.target.value });
    };

    return (
        <div className="wizard-step" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label className="input-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                    <User size={18} className="text-secondary" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        name="name"
                        value={data.name || ''}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="e.g. Rahul Sharma"
                        style={{ paddingLeft: '40px', width: '100%' }}
                    />
                </div>
            </div>

            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label className="input-label">University Name</label>
                <div style={{ position: 'relative' }}>
                    <Landmark size={18} className="text-secondary" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        name="university"
                        value={data.university || ''}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="e.g. Mumbai University, VTU, AKTU"
                        style={{ paddingLeft: '40px', width: '100%' }}
                    />
                </div>
            </div>

            <div className="input-group">
                <label className="input-label">Course / Degree</label>
                <div style={{ position: 'relative' }}>
                    <Building size={18} className="text-secondary" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        name="course"
                        value={data.course || ''}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="e.g. B.Tech CS"
                        style={{ paddingLeft: '40px', width: '100%' }}
                    />
                </div>
            </div>

            <div className="input-group">
                <label className="input-label">Semester</label>
                <div style={{ position: 'relative' }}>
                    <GraduationCap size={18} className="text-secondary" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <select
                        name="semester"
                        value={data.semester || ''}
                        onChange={handleChange}
                        className="input-field"
                        style={{ paddingLeft: '40px', width: '100%' }}
                    >
                        <option value="">Select Sem</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                    </select>
                </div>
            </div>

            <div className="input-group">
                <label className="input-label">College Name</label>
                <div style={{ position: 'relative' }}>
                    <School size={18} className="text-secondary" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        name="college"
                        value={data.college || ''}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="e.g. IIT Bombay"
                        style={{ paddingLeft: '40px', width: '100%' }}
                    />
                </div>
            </div>

            <div className="input-group">
                <label className="input-label">Email</label>
                <div style={{ position: 'relative' }}>
                    <Mail size={18} className="text-secondary" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="email"
                        name="email"
                        value={data.email || ''}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="rahul@example.com"
                        style={{ paddingLeft: '40px', width: '100%' }}
                    />
                </div>
            </div>
        </div>
    );
}
