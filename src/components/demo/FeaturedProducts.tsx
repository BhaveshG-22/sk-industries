"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { scrollToContact } from "@/lib/scroll";

const products = [
  {
    id: 1,
    name: "250ml Container",
    volume: "250ml",
    price: "₹200",
    quantity: "100 pieces",
    image: "https://gavali-group-products.s3.us-east-1.amazonaws.com/products/250ml-container-new.png",
    description: "Perfect for small portions and sampling",
    features: ["Food grade material", "Leak-proof design", "Stackable"]
  },
  {
    id: 2,
    name: "450ml Container", 
    volume: "450ml",
    price: "₹230",
    quantity: "100 pieces",
    image: "https://gavali-group-products.s3.us-east-1.amazonaws.com/products/450ml-container.png",
    description: "Ideal for individual servings",
    features: ["Microwave safe", "Dishwasher friendly", "Durable construction"]
  },
  {
    id: 3,
    name: "600ml Oval Container",
    volume: "600ml Oval",
    price: "₹260", 
    quantity: "100 pieces",
    image: "https://gavali-group-products.s3.us-east-1.amazonaws.com/products/600ml-oval-container.png",
    description: "Unique oval design for versatile use",
    features: ["Space efficient", "Elegant design", "Multi-purpose"]
  },
  {
    id: 4,
    name: "750ml Container",
    volume: "750ml", 
    price: "₹290",
    quantity: "100 pieces",
    image: "https://gavali-group-products.s3.us-east-1.amazonaws.com/products/750ml-container.png",
    description: "Large capacity for family portions",
    features: ["Family size", "Heavy duty", "Premium quality"]
  }
];

export default function FeaturedProducts() {
  const handleOrderNow = () => {
    scrollToContact();
    // You can add additional logic here to pre-fill contact form with product info
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#FEFAE0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#283618] mb-4 font-arimo">
            Our Product Range
          </h2>
          <p className="text-lg text-[#606C38] max-w-2xl mx-auto">
            Premium quality containers available in four convenient sizes. 
            All products sold in bulk quantities of 100 pieces per pack.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-[#DDA15E]/20 hover:border-[#BC6C25] bg-white">
              <CardContent className="p-6">
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-[#FEFAE0] to-[#F8F9FA] rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-[#283618] mb-2">
                      {product.volume}
                    </h3>
                    <p className="text-sm text-[#606C38] mb-3">
                      {product.description}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {product.features.map((feature, index) => (
                        <span key={index} className="text-xs bg-[#DDA15E]/20 text-[#BC6C25] px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-[#FEFAE0] to-[#F4F3EE] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#BC6C25] mb-1">
                      {product.price}
                    </div>
                    <div className="text-sm text-[#606C38]">
                      per {product.quantity}
                    </div>
                  </div>

                  {/* Order Button */}
                  <Button 
                    onClick={handleOrderNow}
                    className="w-full bg-[#BC6C25] hover:bg-[#A0571C] text-white font-medium py-2 transition-colors"
                  >
                    Contact for Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
              className="border-[#FEFAE0] text-[#FEFAE0] hover:bg-[#FEFAE0] hover:text-[#283618] px-8 py-3"
            >
              Request Samples
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}