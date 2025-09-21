export interface ProductImage {
  id: string;
  url: string;
  altText?: string | null;
  sequence: number;
}

export interface CategoryProduct {
  id: string;
  title: string;
  originalPrice?: number | null;
  salePrice: number;
  status: "AVAILABLE" | "SOLD_OUT" | "DISCONTINUED" | "COMING_SOON";
  image: string | null;
  images?: ProductImage[];
  stock?: number;
  showStockCount?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  products: CategoryProduct[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  metaTitle: string | null;
  metaDescription: string | null;
  tags: string[];
  authorName: string | null;
  authorEmail: string | null;
  createdAt: Date;
  updatedAt: Date;
}