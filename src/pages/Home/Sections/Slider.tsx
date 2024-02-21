import ButtonComponent from "../../../components/reusable/ButtonComponent/ButtonComponent";
import { heroImages } from "../../../data/images";
import {
  nextSlide,
  prevSlide,
  dotSlide,
} from "../../../redux/features/slider/sliderSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import { AppState } from "../../../redux/utils/store";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

const Slider = () => {
  const slideIndex = useAppSelector((state: AppState) => state.slider.value);
  // console.log("Slide index: ", slideIndex);

  const dispatch = useAppDispatch();

  return (
    <section>
      <div className="relative pb-4">
        <div className="mx-auto m-5 mb-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-sirin font-bold mb-10">
            ☀️New born stars from the dawn of the universe☀️
          </h1>
          <ButtonComponent
            to="/catalog"
            className="font-kaushan"
            children="Shop Now"
          />
        </div>
        <div>
          {/* TODO: display fetched data here */}
          {heroImages.map((item) => {
            return (
              <div>
                <div
                  key={item.id}
                  className={
                    item.id === slideIndex
                      ? "opacity-100 duration-700 ease-in-out scale-100"
                      : "opacity-0 duration-700 ease-in-out scale-95"
                  }
                >
                  <div>
                    {item.id === slideIndex && (
                      <img
                        className="h-[850px] w-auto mx-auto"
                        srcSet={item.path}
                        alt="heroes"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex absolute bottom-10 left-[48%]">
          {heroImages.map((dot, index) => {
            return (
              <div className="mr-4" key={index}>
                <div
                  className={
                    index === slideIndex
                      ? "bg-gray-600 rounded-full p-3 cursor-pointer"
                      : "bg-light rounded-full p-3 cursor-pointer"
                  }
                  onClick={() => dispatch(dotSlide(index))}
                ></div>
              </div>
            );
          })}
        </div>
        <div>
          <button
            className="absolute top-[50%] right-48 bg-gray-600 rounded-full p-4 hover:bg-gray-500"
            onClick={() => dispatch(nextSlide(slideIndex + 1))}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
          <button
            className="absolute top-[50%] left-48 bg-gray-600 rounded-full p-4 hover:bg-gray-500"
            onClick={() => dispatch(prevSlide(slideIndex - 1))}
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slider;
