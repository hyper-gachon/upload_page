import React, { createContext, useContext } from 'react';
import { useAuth } from './useAuth'; // useAuth.js 파일에서 가져옴

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const isAuthenticated = useAuth(); // useAuth 함수를 호출하여 사용자 인증 상태를 가져옴

  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
