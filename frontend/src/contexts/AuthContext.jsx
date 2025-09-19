import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('educa-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password, userType = 'student') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: '1',
      name: 'Tawsif Mannan',
      email,
      role: userType,
      joinedDate: '2023-01-15',
      coursesEnrolled: userType === 'student' ? 8 : 0,
      coursesCompleted: userType === 'student' ? 3 : 0,
      coursesCreated: userType === 'teacher' ? 5 : 0,
      studentsEnrolled: userType === 'teacher' ? 245 : 0,
      badges: userType === 'student' 
        ? ['Early Adopter', 'Math Whiz', 'Consistent Learner'] 
        : ['Course Creator', 'Expert Educator', 'Community Builder']
    };
    
    setUser(mockUser);
    localStorage.setItem('educa-user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('educa-user');
  };

  const register = async (name, email, password, role) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: '1',
      name,
      email,
      role: role,
      joinedDate: new Date().toISOString().split('T')[0],
      coursesEnrolled: role === 'student' ? 0 : undefined,
      coursesCompleted: role === 'student' ? 0 : undefined,
      coursesCreated: role === 'teacher' ? 0 : undefined,
      studentsEnrolled: role === 'teacher' ? 0 : undefined,
      badges: role === 'student' 
        ? ['New Member'] 
        : ['New Educator']
    };
    
    setUser(mockUser);
    localStorage.setItem('educa-user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}