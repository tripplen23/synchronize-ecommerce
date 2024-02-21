import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import { collectionImages } from "../../../data/images";
import { motion } from "framer-motion";

const Collections = () => {
  return (
    <section>
      <div>
        <p>Collections</p>
        <div>
          <div>
            {collectionImages.map((item, id) => {
              return (
                <Link key={id} to={item.link}>
                  <img srcSet={item.path} alt="" loading="lazy" />
                  <motion.div
                    key="cart"
                    whileHover={{ zoom: 1.5 }}
                    style={{ height: "100%" }}
                  >
                    <Link to={item.link}>
                      <MdArrowOutward />
                    </Link>
                  </motion.div>
                  <div>{item.name}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
