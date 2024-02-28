import React, { useState } from "react";
import Modal from "react-modal";
import { ModifiedProductType } from "../../../misc/productType";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { categories } from "../../../data/categoryData";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (productData: ModifiedProductType) => void;
}

const AddingModalComponent: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState<ModifiedProductType>({
    title: "",
    price: 0,
    category: "",
    description: "",
    image: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleAdd = () => {
    onAdd(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <div className="max-w-md mx-auto bg-light rounded p-6">
        <h2 className="text-xl font-semibold mb-4 ">Add Product</h2>
        <form>
          <div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full border rounded p-2"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                required
                className="w-full border rounded p-2"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700">
                Category:
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full border rounded p-2"
                value={formData.category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleInputChange(e)
                }
              >
                {/* Map through categories to create options */}
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">
                Description:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                required
                className="w-full border rounded p-2"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700">
                Image:
              </label>
              <input
                type="text"
                id="image"
                name="image"
                required
                className="w-full border rounded p-2"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-4 flex space-x-2 justify-end">
            <ButtonComponent type="button" onClick={handleAdd}>
              Add Product
            </ButtonComponent>
            <ButtonComponent type="button" onClick={onClose}>
              Cancel
            </ButtonComponent>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddingModalComponent;
