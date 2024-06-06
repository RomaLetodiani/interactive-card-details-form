import { useRef, useState } from "react";
import useDebounce from "../Hooks/useDebounce";
import { useInput } from "../Hooks/useInput";
import productServices from "../Services/ProductServices";
import Input from "./UI/Input";
import useClickOutside from "../Hooks/useClickOutside";
import useClickInside from "../Hooks/useClickInside";

const SearchBar = () => {
  const searchInput = useInput(() => true);
  const [products, setProducts] = useState<null | any>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleOutSideClick = () => {
    setVisible(false);
  };

  const handleInSideClick = () => {
    setVisible(true);
  };

  useClickInside(containerRef, handleInSideClick);

  useClickOutside(containerRef, handleOutSideClick);

  const fetchCourses = async (searchTerm: string) => {
    if (!searchTerm) {
      setProducts(null);

      return;
    }
    setLoading(true);
    productServices
      .allProducts({
        productName: searchTerm,
      })
      .then(({ data }) => {
        if (data.products.length === 0) {
          setProducts(null);
          return;
        }
        setProducts(data.products);
        setVisible(true);
      })
      .catch((error) => {
        console.log("🚀 ~ fetchCourses ~ error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useDebounce(
    () => {
      fetchCourses(searchInput.value);
    },
    500,
    [searchInput.value]
  );

  return (
    <div ref={containerRef} className="flex-1 relative mx-5">
      <Input
        inputClassName={`py-2 ${visible && "rounded-b-none"}`}
        label=""
        placeholder="Search the Course you would like to take..."
        {...searchInput}
      />
      {visible && (
        <div className="absolute bg-white border max-h-96 overflow-y-scroll w-full rounded-b-2xl">
          {!searchInput.value && !products && <p>Search for a course</p>}
          {!products && searchInput.value && !loading && (
            <p>No courses found</p>
          )}
          {loading && searchInput.value && !products && <p>Loading...</p>}
          {products &&
            searchInput.value &&
            products.map((product: any) => {
              return (
                <div className="p-10 shadow-sm" key={product.id}>
                  <p>{product.title}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
