import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import DragCompare from '../components/face-swap/DragCompare';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12 py-12">
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {t('home.hero.subtitle')}
          </p>
          <Link to="/swap">
            <Button size="lg" rightIcon={<ArrowRight size={20} />}>
              {t('common.try')}
            </Button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <DragCompare
              beforeImage="https://picsum.photos/800/600?random=1"
              afterImage="https://picsum.photos/800/600?random=2"
              height="400px"
            />
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <section className="py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          {t('home.examples.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative group cursor-pointer">
            <img 
              src="https://picsum.photos/400/600?random=3" 
              alt={t('home.examples.image1')} 
              className="w-full aspect-[3/4] object-cover rounded-lg" 
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <span className="text-white font-medium">{t('home.examples.select')}</span>
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <img 
              src="https://picsum.photos/400/600?random=4" 
              alt={t('home.examples.image2')} 
              className="w-full aspect-[3/4] object-cover rounded-lg" 
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <span className="text-white font-medium">{t('home.examples.select')}</span>
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <img 
              src="https://picsum.photos/400/600?random=5" 
              alt={t('home.examples.image3')} 
              className="w-full aspect-[3/4] object-cover rounded-lg" 
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <span className="text-white font-medium">{t('home.examples.select')}</span>
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <img 
              src="https://picsum.photos/400/600?random=6" 
              alt={t('home.examples.image4')} 
              className="w-full aspect-[3/4] object-cover rounded-lg" 
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <span className="text-white font-medium">{t('home.examples.select')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;