"use client";

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function BlogImage({ src, alt, className }: BlogImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = "https://via.placeholder.com/400x225/DDA15E/283618?text=Blog+Image";
      }}
    />
  );
}