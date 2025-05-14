import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Globe, ChevronDown, Palette } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { SupportedLanguage } from '../../utils/translations';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguageDropdown = () => setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  
  // 处理点击外部区域关闭主题选项菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeMenuRef.current && 
        !themeMenuRef.current.contains(event.target as Node) &&
        themeButtonRef.current && 
        !themeButtonRef.current.contains(event.target as Node)
      ) {
        setShowThemeOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setShowThemeOptions(false);
  };

  const changeTheme = (newTheme: 'light' | 'dark' | 'purple' | 'blue' | 'bright') => {
    setTheme(newTheme);
    setShowThemeOptions(false);
  };

  // 获取当前主题的颜色
  const getThemeColor = () => {
    switch(theme) {
      case 'purple': return 'bg-purple-500';
      case 'blue': return 'bg-blue-500';
      case 'bright': return 'bg-orange-500';
      case 'dark': return 'bg-gray-800';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const languageOptions: { label: string; value: SupportedLanguage }[] = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Français', value: 'fr' },
    { label: 'Deutsch', value: 'de' },
    { label: '中文', value: 'zh' },
    { label: '日本語', value: 'ja' },
  ];

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {t('app.name')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 ${location.pathname === '/' ? 'text-purple-600 dark:text-purple-400 font-medium' : ''}`}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/swap" 
              className={`text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 ${location.pathname === '/swap' ? 'text-purple-600 dark:text-purple-400 font-medium' : ''}`}
            >
              {t('nav.swap')}
            </Link>
            <Link 
              to="/gallery" 
              className={`text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 ${location.pathname === '/gallery' ? 'text-purple-600 dark:text-purple-400 font-medium' : ''}`}
            >
              {t('nav.gallery')}
            </Link>
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle with Palette */}
            <div className="relative">
              <button 
                ref={themeButtonRef}
                onClick={() => setShowThemeOptions(!showThemeOptions)}
                className={`p-2 rounded-full focus:outline-none transition-colors flex items-center ${getThemeColor()} ${theme === 'light' ? 'text-gray-700' : 'text-white'} hover:opacity-90`}
                aria-label="Change theme"
              >
                <Palette size={20} />
              </button>
              
              {showThemeOptions && (
                <div 
                  ref={themeMenuRef}
                  className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="py-2">
                    <div className="px-4 py-1 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-700">
                      {t('settings.theme')}
                    </div>
                    
                    <button 
                      onClick={toggleDarkMode}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {theme === 'dark' ? 
                        <><Sun size={18} className="mr-3 text-yellow-500" /> {t('settings.theme.light')}</> : 
                        <><Moon size={18} className="mr-3 text-blue-400" /> {t('settings.theme.dark')}</>
                      }
                      {(theme === 'light' || theme === 'dark') && <span className="ml-auto bg-green-500 rounded-full w-2 h-2"></span>}
                    </button>
                    
                    <button 
                      onClick={() => changeTheme('purple')}
                      className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === 'purple' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                    >
                      <span className="w-[18px] h-[18px] mr-3 rounded-full bg-purple-500 flex-shrink-0"></span>
                      {t('settings.theme.purple')}
                      {theme === 'purple' && <span className="ml-auto bg-green-500 rounded-full w-2 h-2"></span>}
                    </button>
                    
            <button 
                      onClick={() => changeTheme('blue')}
                      className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === 'blue' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
            >
                      <span className="w-[18px] h-[18px] mr-3 rounded-full bg-blue-500 flex-shrink-0"></span>
                      {t('settings.theme.blue')}
                      {theme === 'blue' && <span className="ml-auto bg-green-500 rounded-full w-2 h-2"></span>}
            </button>
                    
                    <button 
                      onClick={() => changeTheme('bright')}
                      className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === 'bright' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                    >
                      <span className="w-[18px] h-[18px] mr-3 rounded-full bg-orange-500 flex-shrink-0"></span>
                      {t('settings.theme.bright')}
                      {theme === 'bright' && <span className="ml-auto bg-green-500 rounded-full w-2 h-2"></span>}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={toggleLanguageDropdown}
                className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                aria-label="Change language"
              >
                <Globe size={20} />
                <span className="text-sm">{language.toUpperCase()}</span>
                <ChevronDown size={16} />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  {languageOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleLanguageChange(option.value)}
                      className={`block w-full text-left px-4 py-2 text-sm ${language === option.value ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center">
                  <img 
                    src={user?.avatarUrl || 'https://via.placeholder.com/40'} 
                    alt={user?.name} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="ml-2 text-sm font-medium">{user?.name}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="text-sm text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
                  {t('nav.login')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/" 
              className={`block py-2 ${location.pathname === '/' ? 'text-purple-600 dark:text-purple-400 font-medium' : 'text-gray-700 dark:text-gray-200'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/swap" 
              className={`block py-2 ${location.pathname === '/swap' ? 'text-purple-600 dark:text-purple-400 font-medium' : 'text-gray-700 dark:text-gray-200'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.swap')}
            </Link>
            <Link 
              to="/gallery" 
              className={`block py-2 ${location.pathname === '/gallery' ? 'text-purple-600 dark:text-purple-400 font-medium' : 'text-gray-700 dark:text-gray-200'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.gallery')}
            </Link>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Theme Controls - Mobile */}
            <div className="py-2">
              <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-200">{t('settings.theme')}</span>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                <button 
                  onClick={() => {
                    setTheme('light');
                    setIsMenuOpen(false);
                  }}
                  className={`p-2 rounded-md flex justify-center items-center ${theme === 'light' ? 'bg-gray-200 ring-2 ring-purple-500' : 'bg-gray-100 dark:bg-gray-700'}`}
                >
                  <Sun size={20} className="text-yellow-500" />
                </button>
                
                <button 
                  onClick={() => {
                    setTheme('dark');
                    setIsMenuOpen(false);
                  }}
                  className={`p-2 rounded-md flex justify-center items-center ${theme === 'dark' ? 'bg-gray-700 ring-2 ring-purple-500' : 'bg-gray-100 dark:bg-gray-700'}`}
                >
                  <Moon size={20} className="text-blue-400" />
                </button>
                
                <button 
                  onClick={() => {
                    setTheme('purple');
                    setIsMenuOpen(false);
                  }}
                  className={`p-2 rounded-md flex justify-center items-center ${theme === 'purple' ? 'bg-purple-100 dark:bg-purple-900 ring-2 ring-purple-500' : 'bg-gray-100 dark:bg-gray-700'}`}
                >
                  <div className="w-5 h-5 rounded-full bg-purple-500"></div>
                </button>
                
                <button 
                  onClick={() => {
                    setTheme('blue');
                    setIsMenuOpen(false);
                  }}
                  className={`p-2 rounded-md flex justify-center items-center ${theme === 'blue' ? 'bg-blue-100 dark:bg-blue-900 ring-2 ring-purple-500' : 'bg-gray-100 dark:bg-gray-700'}`}
                >
                  <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                </button>
                
              <button 
                  onClick={() => {
                    setTheme('bright');
                    setIsMenuOpen(false);
                  }}
                  className={`p-2 rounded-md flex justify-center items-center ${theme === 'bright' ? 'bg-orange-100 dark:bg-orange-900 ring-2 ring-purple-500' : 'bg-gray-100 dark:bg-gray-700'}`}
              >
                  <div className="w-5 h-5 rounded-full bg-orange-500"></div>
              </button>
              </div>
            </div>

            {/* Language Controls - Mobile */}
            <div className="py-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-200">{t('settings.language')}</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  className="bg-gray-100 dark:bg-gray-700 rounded p-1 text-sm"
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="flex items-center py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img 
                    src={user?.avatarUrl || 'https://via.placeholder.com/40'} 
                    alt={user?.name} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-200">{user?.name}</span>
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-gray-700 dark:text-gray-200"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 text-gray-700 dark:text-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.login')}
                </Link>
 
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;