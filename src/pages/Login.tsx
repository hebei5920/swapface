import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 配置Google登录
  const googleLogin = useGoogleLogin({
    flow: 'implicit',
    onSuccess: async (tokenResponse) => {
      console.log('Google login success, token response:', tokenResponse);
      setError(null);
      setIsLoading(true);
      
      try {
        await loginWithGoogle(tokenResponse);
        console.log('Successfully logged in with Google');
        navigate('/swap');
      } catch (err) {
        console.error('Google login error:', err);
        setError(t('login.google_error'));
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error('Google login error response:', errorResponse);
      setError(t('login.google_error'));
    },
    // 请求用户的电子邮件和基本资料
    scope: 'email profile',
  });

  const handleGoogleLogin = () => {
    console.log('Google login button clicked');
    setError(null);
    try {
      console.log('Attempting to call googleLogin function');
      googleLogin();
      console.log('googleLogin function called successfully');
    } catch (err) {
      console.error('Error calling googleLogin:', err);
      setError(t('login.google_error'));
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 relative">
        <h1 className="text-2xl font-bold text-center mb-6">{t('login.title')}</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-md">
            {error}
          </div>
        )}
     
        
        <Button
          onClick={handleGoogleLogin}
          fullWidth
          isLoading={isLoading}
          variant="primary"
          className="flex items-center justify-center gap-2 mb-6 py-3"
        >
          {!isLoading && (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#FFFFFF"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#FFFFFF"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FFFFFF"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#FFFFFF"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
              <path fill="none" d="M1 1h22v22H1z" />
            </svg>
          )}
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('login.google')}
        </Button>
      </div>
    </div>
  );
};

export default Login;