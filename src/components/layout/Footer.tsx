import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Heart, Mail, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                {t('app.name')}
              </span>
            </Link>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              {t('app.tagline')}
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              {t('footer.features')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/swap" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                  {t('footer.face_swapping')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                  {t('footer.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                  {t('footer.about_ai')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              {t('footer.support')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                  {t('footer.help_center')}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                  {t('footer.privacy_policy')}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              {t('footer.subscribe')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {t('footer.subscribe_desc')}
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder={t('footer.email_placeholder')}
                className="min-w-0 flex-1 px-3 py-2 rounded-l-md text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                {t('footer.subscribe_button')}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          <p>
            {t('footer.copyright').replace('{year}', currentYear.toString()).replace('{appName}', t('app.name'))}
          </p>
          <p className="mt-2 flex items-center justify-center">
            {t('footer.made_with_love').replace('{heart}', '')} <Heart size={16} className="mx-1 text-red-500" /> by StackBlitz
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;