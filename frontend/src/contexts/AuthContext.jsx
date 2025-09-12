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

  const login = async (email, password) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: '1',
  name: 'Tawsif Mannan',
      email,
      role: 'student',
      joinedDate: '2023-01-15',
      coursesEnrolled: 8,
      coursesCompleted: 3,
      badges: ['Early Adopter', 'Math Whiz', 'Consistent Learner']
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
      coursesEnrolled: 0,
      coursesCompleted: 0,
      badges: ['New Member']
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