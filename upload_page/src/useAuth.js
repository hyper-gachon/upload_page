import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 여기서 JWT 토큰이 유효한지 확인하는 로직을 추가
    const token = localStorage.getItem('accessToken'); // 예: localStorage에 저장된 토큰을 가져옴

    if (token) {
      setIsAuthenticated(true);
      // 이미 토큰이 있는 경우, 바로 /upload 페이지로 이동
      if (navigate) {
        if (window.location.pathname !== '/mypage') {
          navigate('/upload');
        }
      }
    } else {
      setIsAuthenticated(false);
      // JWT 토큰이 없는 경우 홈페이지로 리디렉션
      if (navigate) {
        if (window.location.pathname !== '/register') {
          navigate('/');
        }
      }
    }
  }, [navigate]);

  return isAuthenticated;
}
