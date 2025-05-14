import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface DragCompareProps {
  beforeImage: string;
  afterImage: string;
  height?: string;
}

const DragCompare: React.FC<DragCompareProps> = ({ 
  beforeImage, 
  afterImage,
  height = '400px'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const calculatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const offsetX = clientX - containerRect.left;
    
    let newPosition = (offsetX / containerWidth) * 100;
    
    // Clamp the value between 0 and 100
    newPosition = Math.max(0, Math.min(100, newPosition));
    
    setSliderPosition(newPosition);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    calculatePosition(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    calculatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef} 
      className="relative select-none overflow-hidden rounded-lg shadow-md" 
      style={{ height }}
    >
      {/* Before Image (Full width) */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src={afterImage} 
          alt={t('swap.original')} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* After Image (Partial width based on slider) */}
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt={t('swap.swapped')} 
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: 'none' }}
        />
      </div>
      
      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize border-2 border-purple-500">
          <div className="w-1 h-4 bg-purple-500 mx-0.5"></div>
          <div className="w-1 h-4 bg-purple-500 mx-0.5"></div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 text-xs rounded">
        {t('swap.original')}
      </div>
      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 text-xs rounded">
        {t('swap.swapped')}
      </div>
      
      {/* Instruction */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 text-sm rounded-full">
        {t('swap.compare')}
      </div>
    </div>
  );
};

export default DragCompare;