import Collections from "./Sections/Collections";
import Slider from "./Sections/Slider";
import QuickView from "./Sections/QuickView";
import GoToTopComponent from "../../components/reusable/GoToTopComponent/GoToTopComponent";

const Home = () => {
  return (
    <>
      <div className="dark:bg-dark">
        <Slider />
        <QuickView />
        <Collections />
        <GoToTopComponent />
      </div>
    </>
  );
};

export default Home;
