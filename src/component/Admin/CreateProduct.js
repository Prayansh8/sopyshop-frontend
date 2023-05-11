import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../actions/productAction";
import "./CreateProduct.css";
import { CLEAR_ERRORS } from "../../constants/productConstant";
import { ToastContainer, toast } from "react-toastify";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.newProducts);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const categories = [
    "Clothes",
    "Shoos",
    "Laptop",
    "Daskstop",
    "Moniter",
    "Jacket",
    "Camera",
  ];

  const handleImageChange = (event) => {
    const newImages = [...images, event.target.files[0]];
    setImages(newImages);

    const newImagePreviews = [];
    for (let i = 0; i < newImages.length; i++) {
      const url = URL.createObjectURL(newImages[i]);
      newImagePreviews.push(url);
    }
    setImagePreviews(newImagePreviews);
  };

  const ProductSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    dispatch(createProduct(formData));
    setTimeout(() => {
      window.location.reload();
    }, 6000);
    toast.success("Create Product Successful!");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(CLEAR_ERRORS);
    }
  }, [error, dispatch]);

  return (
    <Fragment>
      <div className="container">
        <div className="createProductContaner">
          <form id="Product" onSubmit={ProductSubmit} className="loginForm">
            <div className="createProductFormText">
              <input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                required
                onChange={(e) => setName(e.target.value)}
                minLength="1"
                maxLength="32"
              />
            </div>
            <div className="createProductFormText">
              <input
                type="number"
                placeholder="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                maxLength="32"
              />
            </div>
            <div className="createProductFormText">
              <select onChange={(e) => setCategory(e.target.value)}>
                <option>Choose Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="createProductFormText">
              <input
                type="number"
                placeholder="stock"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                minLength="4"
                maxLength="100"
                required
              />
            </div>
            <div className="createProductFormText">
              <input
                type="text"
                placeholder="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minLength="4"
                maxLength="100"
                required
              />
            </div>
            <div className="registerImage">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                multiple
              />
            </div>
            <div className="imagepriviue">
              {imagePreviews.map((url) => (
                <img key={url} src={url} alt="Preview" />
              ))}
            </div>
            <input
              type="submit"
              value="Create"
              className="submitBtn"
              disabled={loading ? true : false}
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default CreateProduct;
