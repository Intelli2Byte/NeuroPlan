import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const API_BASE = 'http://localhost:5000';

export function UserProvider({ children }) {
    const [studentData, setStudentData] = useState(() => {
        try {
            const saved = localStorage.getItem('neuroplan_data');
            return saved ? JSON.parse(saved) : {
                name: '', university: '', course: '', semester: '', year: '',
                collegeStartTime: '09:00', collegeEndTime: '17:00',
                attendanceDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], subjects: [],
                preferences: { classReminders: true, morningSummary: true, internshipAlerts: true }
            };
        } catch (e) {
            console.error('Error parsing student data:', e);
            return {
                name: '', university: '', course: '', semester: '', year: '',
                collegeStartTime: '09:00', collegeEndTime: '17:00',
                attendanceDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], subjects: [],
                preferences: { classReminders: true, morningSummary: true, internshipAlerts: true }
            };
        }
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('neuroplan_auth') === 'true';
    });

    useEffect(() => {
        if (isAuthenticated && studentData.email) {
            fetch(`${API_BASE}/api/user/${studentData.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data && !data.message) {
                        setStudentData(prev => {
                            const merged = { ...prev, ...data };
                            localStorage.setItem('neuroplan_data', JSON.stringify(merged));
                            return merged;
                        });
                    }
                })
                .catch(err => console.error('Sync error:', err));
        }
    }, [isAuthenticated, studentData.email]);

    const saveToBackend = async (data) => {
        if (!data.email) return;
        try {
            await fetch(`${API_BASE}/api/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.email, studentData: data })
            });
        } catch (err) {
            console.error('Save error:', err);
        }
    };

    const login = async (data) => {
        setIsAuthenticated(true);
        localStorage.setItem('neuroplan_auth', 'true');

        const cleanData = data ? Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== '' && v !== undefined)
        ) : {};

        setStudentData(prev => {
            const next = { ...prev, ...cleanData };
            localStorage.setItem('neuroplan_data', JSON.stringify(next));
            return next;
        });

        // Background sync
        const syncWorkflow = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/user/${data.email}`);
                if (response.ok) {
                    const existing = await response.json();
                    if (existing && !existing.message) {
                        setStudentData(prev => {
                            const final = { ...prev, ...existing, ...cleanData };
                            localStorage.setItem('neuroplan_data', JSON.stringify(final));
                            saveToBackend(final);
                            return final;
                        });
                    }
                } else {
                    saveToBackend({ ...studentData, ...cleanData });
                }
            } catch (e) {
                console.error('Sync failed:', e);
            }
        };
        syncWorkflow();
        return true;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('neuroplan_auth');
        localStorage.removeItem('neuroplan_data');
        setStudentData({
            name: '', university: '', course: '', semester: '', year: '',
            collegeStartTime: '09:00', collegeEndTime: '17:00',
            attendanceDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], subjects: [],
            preferences: { classReminders: true, morningSummary: true, internshipAlerts: true }
        });
    };

    const updateStudentData = async (newData) => {
        setStudentData(prev => {
            const updated = typeof newData === 'function' ? newData(prev) : { ...prev, ...newData };
            localStorage.setItem('neuroplan_data', JSON.stringify(updated));
            saveToBackend(updated);
            return updated;
        });
    };

    return (
        <UserContext.Provider value={{ studentData, updateStudentData, isAuthenticated, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
