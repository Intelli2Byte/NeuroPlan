import Layout from '../components/Layout';
import { Bell, Shield, User, Database, Download, RefreshCcw, Edit2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
    const { studentData, updateStudentData } = useUser();
    const navigate = useNavigate();

    const preferences = studentData.preferences || {
        classReminders: true,
        morningSummary: true,
        internshipAlerts: true
    };

    const handleToggle = (key) => {
        updateStudentData({
            preferences: {
                ...preferences,
                [key]: !preferences[key]
            }
        });
    };

    const exportData = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(studentData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `neuroplan_data_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const resetData = () => {
        if (window.confirm("Are you sure you want to reset all data? This cannot be undone.")) {
            updateStudentData({
                university: '', course: '', semester: '', year: '',
                collegeStartTime: '09:00', collegeEndTime: '17:00',
                attendanceDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], subjects: [],
                preferences: { classReminders: true, morningSummary: true, internshipAlerts: true }
            });
            alert("Data reset successfully.");
            navigate('/wizard');
        }
    };

    return (
        <Layout showSidebar={true}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: 'var(--spacing-6)' }}>Settings</h1>

            <div style={{ display: 'grid', gap: 'var(--spacing-6)', maxWidth: '600px' }}>
                <SettingSection icon={User} title="Academic Profile">
                    <p className="text-secondary" style={{ fontSize: '13px', marginBottom: 'var(--spacing-4)' }}>Update your university and semester details.</p>
                    <button onClick={() => navigate('/wizard', { state: { fromSettings: true } })} className="btn btn-secondary" style={{ gap: '8px' }}>
                        <Edit2 size={16} /> Edit Profile
                    </button>
                </SettingSection>

                <SettingSection icon={Bell} title="Notifications & Alerts">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        <Toggle
                            label="Class Reminder (30 mins before)"
                            checked={preferences.classReminders}
                            onToggle={() => handleToggle('classReminders')}
                        />
                        <Toggle
                            label="Daily Morning Summary"
                            checked={preferences.morningSummary}
                            onToggle={() => handleToggle('morningSummary')}
                        />
                        <Toggle
                            label="Internship Alerts"
                            checked={preferences.internshipAlerts}
                            onToggle={() => handleToggle('internshipAlerts')}
                        />
                    </div>
                </SettingSection>

                <SettingSection icon={Database} title="Data Management">
                    <p className="text-secondary" style={{ fontSize: '12px', marginBottom: 'var(--spacing-4)' }}>Manage your academic data and report.</p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexDirection: 'column' }}>
                        <button onClick={() => navigate('/progress', { state: { autoPrint: true } })} className="btn btn-primary" style={{ gap: '8px', justifyContent: 'flex-start' }}>
                            <Download size={16} /> Export Academic Report (PDF)
                        </button>
                        <button onClick={resetData} className="btn btn-secondary" style={{ color: 'var(--color-error)', gap: '8px', borderStyle: 'dashed' }}>
                            <RefreshCcw size={16} /> Reset All Academic Data
                        </button>
                    </div>
                </SettingSection>
            </div>
        </Layout>
    );
}

function SettingSection({ icon: Icon, title, children }) {
    return (
        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)' }}>
                <Icon size={20} className="text-primary" />
                <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}>{title}</h3>
            </div>
            {children}
        </div>
    );
}

function Toggle({ label, checked, onToggle }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-main)' }}>{label}</span>
            <div
                onClick={onToggle}
                style={{
                    width: '42px', height: '22px', borderRadius: '11px',
                    backgroundColor: checked ? 'var(--color-primary)' : '#94A3B8',
                    position: 'relative', cursor: 'pointer',
                    transition: 'background-color 0.2s'
                }}
            >
                <div style={{
                    width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'white',
                    position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}></div>
            </div>
        </div>
    );
}
