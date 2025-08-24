"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { scrollToContact } from "@/lib/scroll";

interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  sequence: number;
  isActive: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  originalPrice: number | null;
  salePrice: number;
  status: string;
  image: string | null;
  badge: string | null;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  images: ProductImage[];
  category: Category;
}

interface FeaturedProductsDBProps {
  products: Product[];
}

export default function FeaturedProductsDB({ products }: FeaturedProductsDBProps) {
  const handleOrderNow = (productName: string) => {
    scrollToContact();
    // You can add additional logic here to pre-fill contact form with product info
  };

  if (!products || products.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-[#FEFAE0] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#283618] mb-4 font-arimo">
            Our Products
          </h2>
          <p className="text-lg text-[#606C38]">
            No products available at the moment. Please check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-[#FEFAE0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#283618] mb-4 font-arimo">
            Our Product Range
          </h2>
          <p className="text-lg text-[#606C38] max-w-2xl mx-auto">
            Premium quality containers available in various sizes. 
            All products sold in bulk quantities of 100 pieces per pack.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => {
            // Get the primary image (first image or fallback to product.image)
            const primaryImage = product.images && product.images.length > 0 
              ? product.images[0].url 
              : product.image || '/images/placeholder.txt';
            
            const altText = product.images && product.images.length > 0 
              ? product.images[0].altText || product.title
              : product.title;

            return (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-[#DDA15E]/20 hover:border-[#BC6C25] bg-white">
                <CardContent className="p-6">
                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-[#FEFAE0] to-[#F8F9FA] rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                    <Image
                      src={primaryImage}
                      alt={altText}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-[#283618] mb-2">
                        {product.title}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-[#606C38] mb-3">
                          {product.description}
                        </p>
                      )}
                      
                      {/* Badge if available */}
                      {product.badge && (
                        <div className="flex justify-center mb-4">
                          <span className="text-xs bg-[#DDA15E]/20 text-[#BC6C25] px-2 py-1 rounded-full">
                            {product.badge}
                          </span>
                        </div>
                      )}

                      {/* Stock info */}
                      {product.stock > 0 && (
                        <div className="text-xs text-[#606C38] mb-2">
                          In Stock: {product.stock} units
                        </div>
                      )}
                    </div>

                    {/* Pricing */}
                    <div className="bg-gradient-to-r from-[#FEFAE0] to-[#F4F3EE] rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="text-2xl font-bold text-[#BC6C25]">
                          ₹{product.salePrice}
                        </div>
                        {product.originalPrice && product.originalPrice > product.salePrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice}
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-[#606C38]">
                        per 100 pieces
                      </div>
                    </div>

                    {/* Order Button */}
                    <Button 
                      onClick={() => handleOrderNow(product.title)}
                      disabled={product.status === 'SOLD_OUT' || product.stock === 0}
                      className="w-full bg-[#BC6C25] hover:bg-[#A0571C] text-white font-medium py-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {product.status === 'SOLD_OUT' || product.stock === 0 
                        ? 'Out of Stock' 
                        : 'Contact for Order'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-[#283618] rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-semibold mb-4">Ready to Place Your Order?</h3>
          <p className="text-[#FEFAE0]/90 mb-6 max-w-2xl mx-auto">
            All products are available for bulk orders. Minimum order quantity is 100 pieces per size. 
            Contact us for custom quantities and special pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-[#BC6C25] hover:bg-[#A0571C] text-white px-8 py-3"
            >
              Get Quote for All Products
            </Button>
            <Button 
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="border-2 border-[#FEFAE0] text-[#FEFAE0] hover:bg-[#FEFAE0] hover:text-[#283618] px-8 py-3 bg-transparent"
            >
              Request Samples
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}