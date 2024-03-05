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
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isRight?: boolean;
}) => {
  // TODO: Press esc key on the keyboard to close the modal
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      setTimeout(() => {
        onClose();
      }, 300); // Adjust the delay as needed
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const cartModalVariants = {
    hidden: { x: isRight ? "100%" : "-100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
    exit: { x: isRight ? "100%" : "-100%", opacity: 0 },
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
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cartModalVariants}
        exit="exit"
        className={`fixed top-5  ${
          isRight ? "right-5" : "left-0"
        } w-96 h-auto max-h-full bg-light z-50 rounded-2xl shadow-lg overflow-y-auto`}
      >
        <div className="p-6 h-full bg-gradient-to-b from-white to-gray-900 rounded-xl">
          <div>
            <ModalComponentContext.Provider value={modalValue}>
              {children}
            </ModalComponentContext.Provider>
          </div>
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

const ModalBody = ({ children }: { children: ReactNode }) => {
  return (
    <>
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
