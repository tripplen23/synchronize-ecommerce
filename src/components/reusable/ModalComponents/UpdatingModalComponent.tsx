import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ProductType } from "../../../misc/productType";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { categories } from "../../../data/categoryData";

interface UpdatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (productData: ProductType) => void;
  product: ProductType;
}

const UpdatingModalComponent: React.FC<UpdatingModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  product,
}) => {
  const [formData, setFormData] = useState<ProductType>(product);

  useEffect(() => {
    // Reset form data when the product prop changes
    setFormData(product);
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <div className="max-w-md mx-auto bg-light rounded p-6">
        <h2 className="text-xl font-semibold mb-4 ">Update Product</h2>
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
                value={formData.title}
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
                value={formData.price}
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
                value={formData.description}
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
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-4 flex space-x-2 justify-end">
            <ButtonComponent type="button" onClick={handleUpdate}>
              Update Product
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

export default UpdatingModalComponent;
