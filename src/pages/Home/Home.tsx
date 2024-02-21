import Collections from "./Sections/Collections";
import Slider from "./Sections/Slider";
import QuickView from "./Sections/QuickView";

const Home = () => {
  return (
    <>
      <div>
        <Slider />
        <QuickView />
        <Collections />
      </div>
    </>
  );
};

export default Home;
