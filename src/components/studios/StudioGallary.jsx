"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

const StudioGallery = ({ image, gallery = [], title }) => {
  const images = [image, ...gallery].filter(Boolean);
  const [activeImage, setActiveImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center gap-3 rounded-2xl bg-sage text-muted">
        <ImageOff size={40} />
        <p>No studio images available</p>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      {/* Main Image */}
      <div className="overflow-hidden rounded-2xl bg-sage">
        <img
          src={images[activeImage]}
          alt={`${title} - Image ${activeImage + 1}`}
          className="h-[280px] w-full object-cover sm:h-[400px] lg:h-[500px]"
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1}`}
              aria-pressed={activeImage === index}
              className={`shrink-0 overflow-hidden rounded-xl border-2 transition ${
                activeImage === index
                  ? "border-brand"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt={`${title} thumbnail ${index + 1}`}
                className="h-20 w-28 object-cover sm:h-24 sm:w-36"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default StudioGallery;