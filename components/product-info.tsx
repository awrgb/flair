"use client"
import { SanityProduct } from "@/config/inventory";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"; // Assuming this function is imported correctly
import { Button } from "./ui/button";
import { getSizeName } from "@/lib/utils";
import { ProductFilters } from "./product-filters";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  product: SanityProduct; // Make sure this type matches your data structure
}

export function ProductInfo({ product }: Props) {
  const { name, price, description, sizes, currency } = product;
  const { addItem, cartDetails, incrementItem } = useShoppingCart();
  const isInCart = !!cartDetails?.[product._id];
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState(sizes[0]); // Initialize selectedSize with the first size option

  function addToCart() {
    const item = {
      ...product,
      product_data: {
        size: selectedSize,
      },
    };
    isInCart ? incrementItem(item._id) : addItem(item);
    toast({
      title: `${item.name} (${getSizeName(selectedSize)})`,
      description: "Product added to cart",
      action: (
        <Link href="/cart">
          <Button variant="link" className="gap-x-2 whitespace-nowrap">
            <span>Open Cart</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      ),
    });
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product Information</h2>
        <p className="text-3xl tracking-tight">{formatCurrencyString({ value: price, currency })}</p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{description}</div>
      </div>

      <div className="mt-4">
        <p>
          Size: <strong>{getSizeName(selectedSize)}</strong>
        </p>
        {/* Display size options */}
        {sizes.map((size) => (
          <Button
            onClick={() => setSelectedSize(size)}
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            className="mr-2 mt-4"
          >
            {getSizeName(size)}
          </Button>
        ))}
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            onClick={addToCart}
            type="button"
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  );
}
