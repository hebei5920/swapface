import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLanguage } from '../contexts/LanguageContext';
import { swapFaceApi } from '../api/index';
import Button from '../components/ui/Button';
import { X } from 'lucide-react';

const Swap: React.FC = () => {
  const { t } = useLanguage();
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [targetImage, setTargetImage] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [targetPreview, setTargetPreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDropSource = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSourceImage(file);
      // 创建预览
      const reader = new FileReader();
      reader.onload = () => {
        setSourcePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onDropTarget = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setTargetImage(file);
      // 创建预览
      const reader = new FileReader();
      reader.onload = () => {
        setTargetPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const clearSourceImage = useCallback(() => {
    setSourceImage(null);
    setSourcePreview(null);
  }, []);

  const clearTargetImage = useCallback(() => {
    setTargetImage(null);
    setTargetPreview(null);
  }, []);

  const { getRootProps: getSourceRootProps, getInputProps: getSourceInputProps } = useDropzone({
    onDrop: onDropSource,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const { getRootProps: getTargetRootProps, getInputProps: getTargetInputProps } = useDropzone({
    onDrop: onDropTarget,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const handleSwap = async () => {
    if (!sourceImage || !targetImage) {
      setError(t('swap.error.selectBoth'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      const result = await swapFaceApi(sourceImage, targetImage, (progress) => {
        setProgress(progress);
      });
      setResultImage(result!);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('swap.error.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">{t('swap.title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Source Image Upload */}
        <div>
          <h2 className="text-xl font-semibold mb-4">{t('swap.sourceImage')}</h2>
          <div
            {...getSourceRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors relative
              ${sourceImage ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
          >
            <input {...getSourceInputProps()} />
            {sourcePreview ? (
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSourceImage();
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title={t('swap.removeImage')}
                >
                  <X size={16} />
                </button>
                <img src={sourcePreview} alt="Source" className="max-h-64 mx-auto mb-4" />
                <p className="text-green-600">{t('swap.imageUploaded')}</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">{t('swap.dragOrClick')}</p>
                <p className="text-sm text-gray-500 mt-2">{t('swap.supportedFormats')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Target Image Upload */}
        <div>
          <h2 className="text-xl font-semibold mb-4">{t('swap.targetImage')}</h2>
          <div
            {...getTargetRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors relative
              ${targetImage ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
          >
            <input {...getTargetInputProps()} />
            {targetPreview ? (
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearTargetImage();
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title={t('swap.removeImage')}
                >
                  <X size={16} />
                </button>
                <img src={targetPreview} alt="Target" className="max-h-64 mx-auto mb-4" />
                <p className="text-green-600">{t('swap.imageUploaded')}</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">{t('swap.dragOrClick')}</p>
                <p className="text-sm text-gray-500 mt-2">{t('swap.supportedFormats')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="mt-8 text-center">
        <Button
          onClick={handleSwap}
          disabled={!sourceImage || !targetImage || isLoading}
          isLoading={isLoading}
          className="w-full md:w-auto"
        >
          {t('swap.startSwap')}
        </Button>
      </div>

      {/* Progress Bar */}
      {isLoading && (
        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-gray-600 mt-2">
            {t('swap.processing')} ({Math.round(progress)}%)
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {/* Result Image */}
      {resultImage && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{t('swap.result')}</h2>
          <div className="border rounded-lg p-4">
            <img src={resultImage} alt="Result" className="max-h-96 mx-auto" />
            <div className="mt-4 text-center">
              <Button
                onClick={() => window.open(resultImage, '_blank')}
                variant="outline"
              >
                {t('swap.download')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Swap;