import { useEffect, useContext, createContext, ReactNode } from "react";
import { motion } from "framer-motion";

interface IModal {
  onClose: () => void;
}

const ModalComponentContext = createContext<IModal | undefined>(undefined);

export const ModalComponent = ({
  children,
  onClose,
  isRight,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isRight?: boolean;
}) => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const cartModalVariants = isRight
    ? {
        hidden: { x: "50vw", opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: "50vw", opacity: 0 },
      }
    : {
        hidden: { y: "50vh", opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: "50vh", opacity: 0 },
      };

  // Wrap onClose in an object of type IModal
  const modalValue: IModal = {
    onClose: onClose,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cartModalVariants}
        exit="exit"
        className={`m-auto p-6 bg-white bg-gradient-to-b from-white to-pink-200 rounded-xl max-w-xl w-full ${
          isRight ? "flex-row-reverse" : "flex-col"
        }`}
      >
        <div>
          <ModalComponentContext.Provider value={modalValue}>
            {children}
          </ModalComponentContext.Provider>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DismissButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { onClose } = useContext(ModalComponentContext) as IModal;

  return (
    <button
      type="button"
      className={`border-none text-2xl font-bold cursor-pointer ${className}`}
      onClick={onClose}
    >
      {children}
    </button>
  );
};

const ModalHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-4">
      <div className="text-lg font-bold">{children}</div>
    </div>
  );
};

const ModalBody = ({
  children,
  isRight,
}: {
  children: ReactNode;
  isRight?: boolean;
}) => {
  return (
    <>
      {!isRight && (
        <div className="flex justify-end mb-4">
          <DismissButton className="">&times;</DismissButton>
        </div>
      )}
      <div className="">{children}</div>
    </>
  );
};

const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className="flex justify-end">{children}</div>;
};

ModalComponent.Header = ModalHeader;
ModalComponent.Body = ModalBody;
ModalComponent.Footer = ModalFooter;
ModalComponent.DismissButton = DismissButton;

export default ModalComponent;
