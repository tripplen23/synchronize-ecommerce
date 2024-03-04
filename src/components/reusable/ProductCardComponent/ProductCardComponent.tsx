import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ProductType, Rating } from "../../../misc/productType";
import { useAppDispatch } from "../../../redux/utils/hooks";
import { CartItemType } from "../../../misc/cartType";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import { motion } from "framer-motion";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent";
import { CgShoppingBag } from "react-icons/cg";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface ProductCardComponentProps extends ProductType {
  productKey: number;
}

const ProductCardComponent: FC<ProductCardComponentProps> = ({
  id,
  productKey,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const dispatch = useAppDispatch();
  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(false);

  const addToCartHandler = () => {
    setIsLoadingProduct(true);

    const cartProduct: CartItemType = {
      quantity: 1,
      product: {
        id: id,
        title: title,
        price: price,
        image: image,
        description: description,
        category: category,
        rating: rating,
      },
    };

    dispatch(addToCart(cartProduct)).then(() => {
      setIsLoadingProduct(false);
    });
  };

  const renderRatingStars = (rating: Rating) => {
    const stars = [];
    const fullStars = Math.floor(rating.rate);
    const hasHalfStar = rating.rate - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={`full-${i}`} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<AiOutlineStar key={`half`} className="text-yellow-500" />);
    }

    const remainingStars = 5 - stars.length;

    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <AiOutlineStar key={`empty-${i}`} className="text-gray-400" />
      );
    }

    return stars;
  };

  return (
    <motion.div
      id={title}
      key={productKey}
      tabIndex={id}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)" }}
      className="flex flex-col max-w-xs rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
    >
      {/* Product Image */}
      <div className="flex justify-center">
        <Link to={`/products/${String(id)}`}>
          <img className="object-contain h-64 w-full" src={image} alt={title} />
        </Link>
      </div>

      {/* Product Details */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800 dark:text-white">
          {title}
        </div>
        <div className="flex items-center mb-2">
          {rating && renderRatingStars(rating)}
        </div>
        <p className="text-gray-700 text-base mb-2 dark:text-gray-300">
          {description}
        </p>
        <p className="text-gray-700 text-base mb-2 dark:text-gray-300">
          Category: {category}
        </p>
        <p className="text-gray-900 font-bold text-xl mb-2 dark:text-gray-100">
          €{price}
        </p>
      </div>

      {/* Add to Cart Button */}
      <div className="px-6 py-4">
        <motion.button
          onClick={() => addToCartHandler()}
          whileHover={{ scale: 1.1 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1 rounded-full text-white text-sm font-semibold text-white font-bold py-2 px-4 rounded-full w-full"
        >
          {isLoadingProduct ? (
            <SpinnerComponent className="h-4 w-4" />
          ) : (
            <div className="flex items-center justify-center">
              <CgShoppingBag className="mr-2" />
              Add to Cart
            </div>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCardComponent;
