import { useEffect, useState } from "react";
import GoToTopComponent from "../../components/reusable/GoToTopComponent/GoToTopComponent";
import SpinnerComponent from "../../components/reusable/SpinnerComponent/SpinnerComponent";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../redux/features/product/productSlice";
import { CartItemType } from "../../misc/cartType";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { sizeData } from "../../data/categoryData";

const Product = () => {
  const { product, isLoading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const addToCartHandler = () => {
    setIsLoadingProduct(true);
    console.log("I am adding to cart");
    const cartProduct: CartItemType = {
      quantity: 1,
      product: {
        id: Number(id),
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
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
    { name: "Product Details", route: `/products/${id}` },
  ];

  if (isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <section>
      <div>
        <p>
          {/* Product path */}
          {routes?.map((item, index) => {
            return (
              <Link to={item.route}>
                {item.name}
                {index < 2 && <span>&nbsp;&gt;&nbsp;</span>}
              </Link>
            );
          })}
        </p>

        {/* Product container */}
        <div>
          <div>
            <img src={product.image} alt="" />
          </div>
          <div>
            <div>{product.title}</div>
            <div>{product.description}</div>
          </div>
          <div>
            <div>Size:</div>
            <div>
              <div>
                {sizeData?.map((item) => {
                  return (
                    <div>
                      <input type="radio" id={item} name="category" />
                      <label htmlFor={item}>{item}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <div>Price: </div>
            <div>€{product.price}</div>
          </div>
          <div>
            <div onClick={() => addToCartHandler()}>
              {isLoadingProduct ? <SpinnerComponent /> : "Add to cart"}
            </div>

            <Link to={`/catalog/All`}> Continue Shopping</Link>
          </div>
        </div>
      </div>
      <GoToTopComponent />
    </section>
  );
};

export default Product;
