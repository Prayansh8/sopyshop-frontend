import React, { Fragment, useEffect, useState } from "react";
import {
  adminUpdateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERRORS } from "../../constants/productConstant";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "./CreateProduct.css";
import EditIcon from "@mui/icons-material/Edit";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import InventoryIcon from "@mui/icons-material/Inventory";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error } = useSelector((state) => state.updateProduct);
  const { product } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  // const [images, setImages] = useState([]);
  // const [oldImages, setOldImages] = useState([]);
  // const [imagePreviews, setImagePreviews] = useState([]);

  let maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const categories = [
    "Clothes",
    "Shoos",
    "Phone",
    "Laptop",
    "Daskstop",
    "Jacket",
    "Camera",
  ];

  // const handleImageChange = (event) => {
  //   const newImages = [...images, event.target.files[0]];
  //   setImages(newImages);

  //   const newImagePreviews = [];
  //   for (let i = 0; i < newImages.length; i++) {
  //     const url = URL.createObjectURL(newImages[i]);
  //     newImagePreviews.push(url);
  //   }
  //   setImagePreviews(newImagePreviews);
  // };

  const updateProductSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);

    // for (let i = 0; i < images.length; i++) {
    //   formData.append("images", images[i]);
    // }
    dispatch(adminUpdateProduct(id, formData));
    toast.success("Create Product Successful!");
  };

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      // setOldImages(product.images);
    }

    if (error) {
      toast.error(error);
      dispatch(CLEAR_ERRORS);
    }
  }, [error, dispatch, product, id]);

  return (
    <Fragment>
      <div className="container">
        <div className="productUserContaner">
          <form
            id="Product"
            onSubmit={updateProductSubmit}
            className="loginForm"
          >
            <div className="createProductFormText">
              <EditIcon />
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
              <CurrencyRupeeIcon />
              <input
                type="number"
                placeholder="Price"
                name="price"
                onInput={maxLengthCheck}
                maxLength={6}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="createProductFormText">
              <DragIndicatorIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Choose Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="createProductFormText">
              <InventoryIcon />
              <input
                type="number"
                placeholder="Stock"
                name="stock"
                maxLength={4}
                onInput={maxLengthCheck}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div className="createProductFormText">
              <TextSnippetIcon />
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minLength="4"
                maxLength="100"
                required
              />
            </div>
            {/* <div className="registerImage">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                required
              />
            </div>
            <div className="imagepriviue">
              {oldImages &&
                oldImages.map((url) => (
                  <img key={url} src={url.url} alt="Old images" />
                ))}
            </div>
            <div className="imagepriviue">
              {imagePreviews.map((url) => (
                <img key={url} src={url} alt="Preview Images" />
              ))}
            </div> */}
            <input
              type="submit"
              value="Update"
              className="submitBtn"
              disabled={loading ? true : false}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
