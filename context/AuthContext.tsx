"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  memberSince: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  enrolledCourseIds: string[];
  login: (email: string, name: string) => void;
  logout: () => void;
  enrollInCourse: (courseId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('astronovas_user');
    const savedCourses = localStorage.getItem('astronovas_courses');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedCourses) {
      setEnrolledCourseIds(JSON.parse(savedCourses));
    }
    setIsInitialized(true);
  }, []);

  const login = (email: string, name: string) => {
    const newUser = {
      name,
      email,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    setUser(newUser);
    localStorage.setItem('astronovas_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setEnrolledCourseIds([]);
    localStorage.removeItem('astronovas_user');
    localStorage.removeItem('astronovas_courses');
  };

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      const updatedCourses = [...enrolledCourseIds, courseId];
      setEnrolledCourseIds(updatedCourses);
      localStorage.setItem('astronovas_courses', JSON.stringify(updatedCourses));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn: !!user, 
      enrolledCourseIds, 
      login, 
      logout, 
      enrollInCourse 
    }}>
      {isInitialized ? children : <div className="min-h-screen bg-[#49136f]" />}
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
