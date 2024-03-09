import { useEffect, useState } from "react";
import GoToTopComponent from "../../components/reusable/GoToTopComponent/GoToTopComponent";
import SpinnerComponent from "../../components/reusable/SpinnerComponent/SpinnerComponent";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../redux/features/product/productSlice";
import { CartItemType } from "../../misc/cartType";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { sizeData } from "../../data/categoryData";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import TransitionEffect from "../../components/reusable/TransitionEffect/TransitionEffect";

const Product = () => {
  const { product, isLoading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const addToCartHandler = () => {
    setIsLoadingProduct(true);
    const cartProduct: CartItemType = {
      quantity: 1,
      product: {
        id: Number(id),
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
        rating: product.rating,
      },
    };
    dispatch(addToCart(cartProduct)).then(() => {
      setIsLoadingProduct(false);
    });
  };

  useEffect(() => {
    dispatch(getProductById(Number(id)));
  }, [dispatch, id]);

  const routes = [
    { name: "Home", route: "/" },
    { name: "Products", route: "/catalog/" },
  ];

  return (
    <>
      <TransitionEffect />
      <section className="container mx-auto px-4 py-8">
        <div>
          {/* Routing */}
          <div className="mb-8 flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:underline">
              {routes[0].name}
            </Link>
            <span>&gt;</span>
            <Link
              to={routes[1].route}
              className="text-gray-500 hover:underline"
            >
              {routes[1].name}
            </Link>
            <span>&gt;</span>
            <p>{product.title}</p>
          </div>

          {/* Product container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute top-4 left-4">
                <button
                  onClick={() => navigate(-1)}
                  className="text-gray-800 hover:text-primary transition duration-300"
                >
                  <AiOutlineArrowLeft size={24} />
                </button>
              </div>
            </div>

            {/* Right side */}
            <div>
              <h2 className="text-3xl smPhone:text-xl font-semibold mb-4">
                {product.title}
              </h2>
              <p className="text-gray-800 dark:text-gray-500 mb-6 ipadMini:text-sm">
                {product.description}
              </p>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Size:</h3>

                <div className="flex smPhone:grid ipadMini:grid grid-cols-2 gap-2">
                  {sizeData?.map((item, index) => (
                    <label
                      key={index}
                      htmlFor={item}
                      className="cursor-pointer rounded-full border border-gray-300 px-4 py-2 hover:bg-pink-300 transition duration-300"
                    >
                      <input
                        type="radio"
                        id={item}
                        name="size"
                        className="hidden"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center mb-6">
                <h3 className="text-xl font-semibold mr-4">Price:</h3>
                <p className="text-2xl font-bold text-primary">
                  €{product.price}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => addToCartHandler()}
                  className="bg-primary hover:bg-green-600 text-light px-6 py-3 rounded-lg font-semibold flex items-center transision duration-300"
                >
                  {isLoadingProduct ? (
                    <SpinnerComponent />
                  ) : (
                    <>
                      <FaOpencart size={24} className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>

                <Link
                  to={`/catalog/All`}
                  className="bg-gray-200 text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
                >
                  {" "}
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
        <GoToTopComponent />
      </section>
    </>
  );
};

export default Product;
