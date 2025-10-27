import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState<string>(images[0]);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    setLightboxIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setLightboxIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main image */}
        <div
          className="md:col-span-2 h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openLightbox(images.indexOf(mainImage))}
        >
          <img
            src={mainImage}
            alt="Property main view"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Thumbnail images */}
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className={`h-[150px] rounded-lg overflow-hidden cursor-pointer ${
              index >= 2 && images.length > 4 ? 'relative group' : ''
            }`}
            onClick={() => {
              setMainImage(image);
              openLightbox(index);
            }}
          >
            <img
              src={image}
              alt={`Property view ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />

            {/* "View all" overlay for the last thumbnail when there are more than 4 images */}
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">+{images.length - 4} more photos</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          <img
            src={images[lightboxIndex]}
            alt={`Property view ${lightboxIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-4 text-white">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
