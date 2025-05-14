import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { Heart, Download, Share2, Trash2, Calendar } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  createdAt: string;
  imageUrl: string;
  likes: number;
  liked: boolean;
}

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate sample gallery items
  useEffect(() => {
    // Simulate loading from API
    setTimeout(() => {
      if (isAuthenticated) {
        // Sample gallery items for logged in users
        const sampleItems: GalleryItem[] = [
          {
            id: '1',
            title: 'Beach Vacation',
            createdAt: '2025-02-15',
            imageUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            likes: 24,
            liked: false
          },
          {
            id: '2',
            title: 'Mountain Hike',
            createdAt: '2025-02-10',
            imageUrl: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            likes: 18,
            liked: true
          },
          {
            id: '3',
            title: 'City Trip',
            createdAt: '2025-02-05',
            imageUrl: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            likes: 32,
            liked: false
          },
          {
            id: '4',
            title: 'Family Photo',
            createdAt: '2025-01-28',
            imageUrl: 'https://images.pexels.com/photos/4823233/pexels-photo-4823233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            likes: 47,
            liked: true
          }
        ];
        setGalleryItems(sampleItems);
      } else {
        // Sample gallery items for guests
        const sampleItems: GalleryItem[] = [
          {
            id: '1',
            title: 'Example 1',
            createdAt: '2025-02-15',
            imageUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            likes: 24,
            liked: false
          },
          {
            id: '2',
            title: 'Example 2',
            createdAt: '2025-02-10',
            imageUrl: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            likes: 18,
            liked: false
          }
        ];
        setGalleryItems(sampleItems);
      }
      setIsLoading(false);
    }, 1500);
  }, [isAuthenticated]);

  const toggleLike = (id: string) => {
    setGalleryItems(galleryItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          liked: !item.liked,
          likes: item.liked ? item.likes - 1 : item.likes + 1
        };
      }
      return item;
    }));
  };

  const deleteItem = (id: string) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('gallery.title')}</h1>
        {isAuthenticated && (
          <Link to="/swap">
            <Button className="mt-4 sm:mt-0">{t('gallery.create_new')}</Button>
          </Link>
        )}
      </div>

      {galleryItems.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{t('gallery.empty')}</p>
          <Link to="/swap">
            <Button>{t('gallery.start_creating')}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative group">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105" 
                />
                
                {isAuthenticated && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button 
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      aria-label="Download"
                    >
                      <Download size={20} className="text-gray-800" />
                    </button>
                    <button 
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      aria-label="Share"
                    >
                      <Share2 size={20} className="text-gray-800" />
                    </button>
                    <button 
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      aria-label="Delete"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 size={20} className="text-red-600" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <Calendar size={16} className="mr-1" />
                  <span>{t('gallery.date')} {new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <button 
                    className={`flex items-center space-x-1 ${
                      item.liked 
                        ? 'text-red-500' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500'
                    }`}
                    onClick={() => toggleLike(item.id)}
                    disabled={!isAuthenticated}
                  >
                    <Heart size={18} fill={item.liked ? 'currentColor' : 'none'} />
                    <span>{item.likes}</span>
                  </button>
                  
                  <Link to={`/swap`} className="text-purple-600 dark:text-purple-400 hover:underline text-sm">
                    {t('gallery.try_similar')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isAuthenticated && (
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">{t('gallery.cta.title')}</h2>
          <p className="mb-6">{t('gallery.cta.description')}</p>
          <div className="flex space-x-4">
 
            <Link to="/login">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                {t('gallery.cta.login')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;