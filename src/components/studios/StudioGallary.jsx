const StudioGallery = ({ image, gallery = [], title }) => {
  const images = [image, ...gallery].filter(Boolean);

  return (
    <div className="grid grid-cols-1 gap-3 overflow-hidden rounded-2xl md:grid-cols-4">
      <div className="md:col-span-3">
        <img
          src={images[0]}
          alt={title}
          className="h-[280px] w-full object-cover sm:h-[380px] md:h-[440px]"
        />
      </div>

      <div className="hidden flex-col gap-3 md:col-span-1 md:flex">
        {images.slice(1, 3).map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={`${title} gallery ${index + 1}`}
            className="h-[214px] w-full rounded-xl object-cover"
          />
        ))}

        {images.length === 1 && (
          <div className="flex h-full items-center justify-center rounded-xl bg-sage p-5 text-center text-sm text-muted">
            More studio photos coming soon
          </div>
        )}
      </div>
    </div>
  );
};

export default StudioGallery;