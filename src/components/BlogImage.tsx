"use client";

import Image from "next/image";
import { useState } from "react";

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function BlogImage({ src, alt, className }: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      width={400}
      height={225}
      onError={() => {
        setImgSrc("https://via.placeholder.com/400x225/DDA15E/283618?text=Blog+Image");
      }}
    />
  );
}