import React, { useState, useRef } from 'react';
import { Upload, ImageIcon, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../ui/Button';

interface ImageUploaderProps {
  title: string;
  onImageSelected: (image: File) => void;
  imagePreviewUrl?: string;
  onRemoveImage?: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  title,
  onImageSelected,
  imagePreviewUrl,
  onRemoveImage
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    if (file.type.startsWith('image/')) {
      onImageSelected(file);
    } else {
      alert('Please upload an image file.');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    if (onRemoveImage) {
      onRemoveImage();
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      
      {imagePreviewUrl ? (
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src={imagePreviewUrl} 
            alt="Preview" 
            className="w-full h-64 object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors focus:outline-none"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-64 transition-colors ${
            dragActive 
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500">
              <ImageIcon size={48} className="mx-auto" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Drag and drop your image here, or
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleButtonClick}
                leftIcon={<Upload size={16} />}
                className="mt-2"
              >
                {t('common.upload')}
              </Button>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;