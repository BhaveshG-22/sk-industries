"use client"

import * as React from "react"
import { Check, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CategoryProduct {
  id: string;
  title: string;
  originalPrice?: number;
  salePrice: number;
  status: "available" | "sold_out";
  image: string;
  badge?: string;
}

const allProducts: CategoryProduct[] = [
  {
    id: "1",
    title: "2Ply Facial Tissue Box 100 Pulls - (Pack of 3)",
    salePrice: 299,
    status: "sold_out",
    image: "https://prd.place/400?id=1",
    badge: "3 BOXES"
  },
  {
    id: "2", 
    title: "Premium Face Wash Set",
    salePrice: 199,
    status: "available",
    image: "https://prd.place/400?id=2"
  },
  {
    id: "3",
    title: "Hand Sanitizer Gel 500ml",
    originalPrice: 150,
    salePrice: 120,
    status: "available",
    image: "https://prd.place/400?id=6",
    badge: "500ML"
  },
  {
    id: "4",
    title: "Moisturizing Body Lotion 200ml",
    originalPrice: 180,
    salePrice: 149,
    status: "available",
    image: "https://prd.place/400?id=13",
    badge: "ORGANIC"
  },
  {
    id: "5",
    title: "Toothbrush Set Electric",
    salePrice: 899,
    status: "available",
    image: "https://prd.place/400?id=18",
    badge: "RECHARGEABLE"
  },
  {
    id: "6",
    title: "Body Wash Antibacterial",
    originalPrice: 249,
    salePrice: 199,
    status: "available",
    image: "https://prd.place/400?id=19"
  },
  {
    id: "7",
    title: "Hand Cream Moisturizing",
    salePrice: 129,
    status: "sold_out",
    image: "https://prd.place/400?id=20",
    badge: "VITAMIN E"
  },
  {
    id: "8",
    title: "Nail Care Kit Complete",
    originalPrice: 399,
    salePrice: 299,
    status: "available",
    image: "https://prd.place/400?id=21",
    badge: "12 PIECES"
  },
  {
    id: "9",
    title: "Deodorant Spray Set",
    salePrice: 449,
    status: "available",
    image: "https://prd.place/400?id=22",
    badge: "PACK OF 3"
  },
  {
    id: "10",
    title: "Lip Balm Collection",
    originalPrice: 199,
    salePrice: 149,
    status: "available",
    image: "https://prd.place/400?id=23",
    badge: "6 FLAVORS"
  },
  {
    id: "11",
    title: "Food Wrapping Paper 21 Meters - (Pack of 2)",
    salePrice: 245,
    status: "sold_out",
    image: "https://prd.place/400?id=24",
    badge: "21 METERS"
  },
  {
    id: "12",
    title: "Aluminium Foil 9 Meters - (Pack of 2)",
    salePrice: 199,
    status: "sold_out",
    image: "https://prd.place/400?id=25"
  },
  {
    id: "13",
    title: "Baking Paper Sheets 10.25*10.25 Inches - 100 Sheets",
    originalPrice: 299,
    salePrice: 245,
    status: "available",
    image: "https://prd.place/400?id=26",
    badge: "100 SHEETS"
  },
  {
    id: "14",
    title: "2Ply Facial Tissue Box 200 Pulls - (Pack of 3)",
    originalPrice: 525,
    salePrice: 299,
    status: "available",
    image: "https://prd.place/400?id=27",
    badge: "3 BOXES"
  },
  {
    id: "15",
    title: "Plastic Wrap Heavy Duty",
    salePrice: 179,
    status: "available",
    image: "https://prd.place/400?id=28",
    badge: "500M"
  },
  {
    id: "16",
    title: "Vacuum Seal Bags Pack",
    originalPrice: 399,
    salePrice: 299,
    status: "available",
    image: "https://prd.place/400?id=29",
    badge: "PACK OF 50"
  },
  {
    id: "17",
    title: "Food Storage Containers",
    salePrice: 699,
    status: "available",
    image: "https://prd.place/400?id=30",
    badge: "SET OF 10"
  },
  {
    id: "18",
    title: "Freezer Bags Assorted",
    salePrice: 249,
    status: "sold_out",
    image: "https://prd.place/400?id=31",
    badge: "MULTI-SIZE"
  },
  {
    id: "19",
    title: "Wax Paper Roll",
    originalPrice: 149,
    salePrice: 119,
    status: "available",
    image: "https://prd.place/400?id=32"
  },
  {
    id: "20",
    title: "Ziplock Bags Premium",
    salePrice: 329,
    status: "available",
    image: "https://prd.place/400?id=33",
    badge: "LEAK-PROOF"
  },
  {
    id: "21",
    title: "Kitchen Cleaning Spray 500ml",
    originalPrice: 180,
    salePrice: 149,
    status: "available",
    image: "https://prd.place/400?id=18"
  },
  {
    id: "22",
    title: "Dishwashing Liquid 1L",
    salePrice: 99,
    status: "available", 
    image: "https://prd.place/400?id=19",
    badge: "1L"
  },
  {
    id: "23",
    title: "Microfiber Kitchen Towels Set",
    originalPrice: 299,
    salePrice: 199,
    status: "available",
    image: "https://prd.place/400?id=20",
    badge: "SET OF 5"
  },
  {
    id: "24",
    title: "Steel Scrubber Pack",
    salePrice: 75,
    status: "available",
    image: "https://prd.place/400?id=21",
    badge: "PACK OF 6"
  },
  {
    id: "25",
    title: "Oven Cleaner Heavy Duty",
    salePrice: 299,
    status: "available",
    image: "https://prd.place/400?id=26",
    badge: "DEEP CLEAN"
  },
  {
    id: "26",
    title: "All Purpose Cleaner 1L",
    originalPrice: 250,
    salePrice: 199,
    status: "available",
    image: "https://prd.place/400?id=32",
    badge: "1L"
  },
  {
    id: "27",
    title: "Toilet Bowl Cleaner 500ml",
    salePrice: 129,
    status: "available",
    image: "https://prd.place/400?id=33"
  },
  {
    id: "28",
    title: "Glass Cleaner Spray 400ml",
    originalPrice: 160,
    salePrice: 120,
    status: "sold_out",
    image: "https://prd.place/400?id=34",
    badge: "400ML"
  }
];

interface ProductSearchBarProps {
  onProductSelect?: (product: CategoryProduct) => void;
  placeholder?: string;
  className?: string;
}

export function ProductSearchBar({ 
  onProductSelect, 
  placeholder = "Search products...", 
  className 
}: ProductSearchBarProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const selectedProduct = allProducts.find(product => product.id === value)

  const handleSelect = (productId: string) => {
    setValue(productId === value ? "" : productId)
    setOpen(false)
    
    if (onProductSelect && productId !== value) {
      const product = allProducts.find(p => p.id === productId)
      if (product) {
        onProductSelect(product)
      }
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between border-[var(--primary-light)] bg-[var(--accent-cream)] hover:bg-[var(--primary-light)] text-[var(--primary-dark)] hover:text-[var(--accent-cream)] transition-colors",
            className
          )}
        >
          {selectedProduct ? (
            <span className="truncate">{selectedProduct.title}</span>
          ) : (
            <span className="text-[var(--primary-medium)]">{placeholder}</span>
          )}
          <Search className="ml-2 h-4 w-4 shrink-0 text-[var(--primary-light)]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-[var(--accent-cream)] border-[var(--primary-light)]" align="start">
        <Command className="bg-[var(--accent-cream)]">
          <CommandInput 
            placeholder={placeholder}
            className="h-9 border-b border-[var(--primary-light)] text-[var(--primary-dark)] placeholder:text-[var(--primary-medium)] font-medium"
          />
          <CommandList className="bg-[var(--accent-cream)]">
            <CommandEmpty className="text-[var(--primary-medium)]">No products found.</CommandEmpty>
            <CommandGroup>
              {allProducts.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.title}
                  onSelect={() => handleSelect(product.id)}
                  className="cursor-pointer hover:bg-[var(--primary-light)] text-[var(--primary-dark)] hover:text-[var(--accent-cream)] aria-selected:bg-[var(--primary-light)] aria-selected:text-[var(--accent-cream)] font-medium"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-semibold text-[var(--primary-dark)]">{product.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-[var(--primary-light)]">
                          Rs. {product.salePrice}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[var(--primary-medium)] line-through font-medium">
                            Rs. {product.originalPrice}
                          </span>
                        )}
                        {product.status === "sold_out" && (
                          <span className="text-xs text-red-700 font-bold">
                            Sold Out
                          </span>
                        )}
                        {product.badge && (
                          <span className="text-xs bg-[var(--primary-light)] text-[var(--accent-cream)] px-2 py-0.5 rounded">
                            {product.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4 shrink-0 text-[var(--primary-light)]",
                        value === product.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}