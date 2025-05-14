import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { User, Mail, Globe, Paintbrush } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { SupportedLanguage } from '../utils/translations';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

type Theme = 'light' | 'dark' | 'purple' | 'blue' | 'bright';

const Profile: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(language);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(theme as Theme);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // If not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Apply language and theme changes
    setLanguage(selectedLanguage);
    setTheme(selectedTheme);
    
    // In a real app, this would be an API call to update user data
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      
      // Reset saved message after 3 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }, 1000);
  };

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Français', value: 'fr' },
    { label: 'Deutsch', value: 'de' },
    { label: '中文', value: 'zh' },
    { label: '日本語', value: 'ja' },
  ];

  const themeOptions = [
    { label: t('settings.theme.light'), value: 'light' },
    { label: t('settings.theme.dark'), value: 'dark' },
    { label: t('settings.theme.purple'), value: 'purple' },
    { label: t('settings.theme.blue'), value: 'blue' },
    { label: t('settings.theme.bright'), value: 'bright' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t('profile.title')}</h1>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        {/* Profile header with avatar */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 py-6 px-8 flex items-center">
          <img 
            src={user?.avatarUrl || 'https://via.placeholder.com/100'} 
            alt={user?.name} 
            className="w-16 h-16 rounded-full border-4 border-white object-cover"
          />
          <div className="ml-5 text-white">
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-white/80">User</p>
          </div>
        </div>
        
        {/* Profile form */}
        <div className="p-8">
          {isSaved && (
            <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 p-3 rounded-md">
              Profile settings saved successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name input */}
              <Input
                label={t('profile.name')}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                leftIcon={<User size={18} />}
              />
              
              {/* Email input */}
              <Input
                label={t('profile.email')}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                leftIcon={<Mail size={18} />}
                disabled
              />
              
              {/* Language selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('profile.language')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Globe size={18} />
                  </div>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
                    className="block w-full pl-10 pr-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {languageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Theme selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('profile.theme')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Paintbrush size={18} />
                  </div>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value as Theme)}
                    className="block w-full pl-10 pr-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {themeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Theme color preview */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">{t('settings.theme')} Preview</h3>
              <div className="flex space-x-3">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedTheme === option.value 
                        ? 'ring-2 ring-offset-2 ring-purple-600 dark:ring-offset-gray-800' 
                        : ''
                    }`}
                    onClick={() => setSelectedTheme(option.value as Theme)}
                    style={{
                      backgroundColor: 
                        option.value === 'light' ? '#ffffff' :
                        option.value === 'dark' ? '#1f2937' :
                        option.value === 'purple' ? '#8b5cf6' :
                        option.value === 'bright' ? '#f97316' :
                        '#3b82f6'
                    }}
                  >
                    {selectedTheme === option.value && (
                      <span className={`text-${option.value === 'light' ? 'gray-800' : 'white'}`}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={isLoading}
              >
                {t('profile.save')}
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Account activity */}
      <div className="mt-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Account Activity</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
            <div>
              <h3 className="font-medium">Created Images</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total face swaps generated</p>
            </div>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">8</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
            <div>
              <h3 className="font-medium">Account Type</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your current plan</p>
            </div>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm py-1 px-3 rounded-full">Free</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;