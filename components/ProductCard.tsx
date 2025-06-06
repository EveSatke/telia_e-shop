import Image from "next/image";
import { Product } from "../types/index";

interface ProductCardProps {
  product: Product;
  onOrderNow: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOrderNow }) => {
  const {
    name,
    brand,
    image,
    colorOptions,
    price,
    stockAvailability,
    description,
  } = product;

  const handleOrderNow = () => {
    onOrderNow(product);
  };

  return (
    <div className="w-card bg-secondary rounded-lg border border-black-16 overflow-hidden pt-6 flex flex-col h-full lg:w-lg-card">
      <div className="flex flex-row space-between pb-6 px-6">
        <div className="mb-4 sm:mb-0 relative w-[131px] h-[104px]">
          <Image
            src={image}
            alt={`${name} product image`}
            fill
            sizes="131px"
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </div>
        <div>
          <p className="uppercase tracking-[1px] font-medium text-black-62 mb-1">
            {brand}
          </p>
          <h3 className="text-xl font-bold text-black-80">{name}</h3>
          <div className="flex space-x-2 mt-5" aria-label="Color options">
            {colorOptions.map(({ color, hex }, index) => (
              <div
                key={`${color}-${index}`}
                className="w-4 h-4 rounded-full border border-black-33"
                style={{ backgroundColor: hex }}
                aria-label={color}
                role="img"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <p className="mb-6">{description}</p>
        <div className="flex justify-between items-center">
          <span
            className="text-black-80 font-bold"
            aria-label="Price per month"
          >
            {price} €/month
          </span>
          <button
            onClick={handleOrderNow}
            className="bg-primary font-medium text-base text-white pl-6 pr-4 py-4 rounded-full hover:bg-purple-700 transition-colors flex items-center leading-4"
            aria-label={`Order now ${name}`}
          >
            Order now
            <Image
              src="images/arrow-right.svg"
              alt=""
              width={16}
              height={16}
              className="ml-2"
            />
          </button>
        </div>
      </div>

      <div className="mt-auto border-t w-full border-black-16 h-10 text-center flex items-center justify-center">
        {stockAvailability > 0 ? (
          <>
            <Image
              src="images/alert-badge-green.svg"
              alt=""
              width={13}
              height={12}
              className="mr-2"
            />
            <span className="text-base text-green-success font-medium">
              In stock
            </span>
          </>
        ) : (
          <>
            <Image
              src="images/alert-badge-red.svg"
              alt=""
              width={13}
              height={12}
              className="mr-2"
            />
            <span className="text-base text-red-alert font-medium">
              Out of stock
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
