import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { productsStore } from "@/store/productStore";
import { useNavigate } from "react-router-dom";

const SearchMenu = ({ openSearch, setOpenSearch }) => {
  const [searchResults, setSearchResults] = useState(null);

  const category = [
    { name: "Pants" },
    { name: "T-Shirts" },
    { name: "Hoodies" },
    { name: "Shoes" },
    { name: "Bags" },
    { name: "Accessories" },
  ];
  const { products } = productsStore();

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      setSearchResults(null); // Clear search on empty input
    } else {
      const filteredCategories = category.filter((cat) =>
        cat.name.toLowerCase().includes(value)
      );
      const filteredProducts = products?.filter((product) =>
        product.name.toLowerCase().includes(value)
      );

      setSearchResults({
        categories: filteredCategories,
        products: filteredProducts,
      });
    }
  };

  const navigateTo = useNavigate();
  const handleNavigate = (path) => {
    navigateTo(path);
    setOpenSearch(false);
    setSearchResults(null)
  }
  return (
    <Dialog open={openSearch} onOpenChange={setOpenSearch}>
      <DialogContent className="md:max-w-4xl w-full md:max-h-[70vh] max-h-[40vh] overflow-y-auto pt-10">
        <Input
          type="text"
          className="rounded-full h-12 px-5"
          placeholder="Search here..."
          onChange={handleSearch}
        />

        {searchResults && (
          <Card className="w-full p-5 space-y-2">
            {/* Categories Section */}
            {searchResults.categories?.length > 0 && (
              <div>
                <h3 className="font-bold text-primary">Categories</h3>
                {searchResults.categories.map((item) => (
                  <div key={item.name} className="border-b py-1 hover:bg-input px-2 cursor-pointer"
                  onClick={() => handleNavigate(`/category/${item.name}`)}>
                    {item.name}
                  </div>
                ))}
              </div>
            )}

            {/* Products Section */}
            {searchResults.products?.length > 0 && (
              <div>
                <h3 className="font-bold text-primary">Products</h3>
                {searchResults.products.map((product) => (
                  <div key={product._id} className="border-b py-1 hover:bg-input px-2 cursor-pointer"
                  onClick={() => handleNavigate(`/product/${product._id}`)}>
                    {product.name}
                  </div>
                ))}
              </div>
            )}

            {/* No Results Fallback */}
            {searchResults.categories.length === 0 &&
              searchResults.products.length === 0 && (
                <div className="text-center text-gray-500">
                  No results found.
                </div>
              )}
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchMenu;
