import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteProduct, getAdminProducts } from "../../actions/productAction";
import "./ProductList.css";
import { CLEAR_ERRORS } from "../../constants/productConstant";
import { ToastContainer, toast } from "react-toastify";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);
  const { isDeleteded } = useSelector((state) => state.deleteProduct);
  const deleteProductHendeler = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(CLEAR_ERRORS);
    }

    if (isDeleteded) {
      toast.success("Product Deleted");
    }
    dispatch(getAdminProducts());
  }, [error, dispatch, isDeleteded]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 300, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 200,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.id}`}>
              <EditIcon />
            </Link>
            <button
              className="deleteProductBtn"
              onClick={() => deleteProductHendeler(params.id)}
            >
              <DeleteIcon />
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  {
    products &&
      products.forEach((item) => {
        rows.push({
          id: item._id,
          stock: item.stock,
          price: item.price,
          name: item.name,
        });
      });
  }
  return (
    <Fragment>
      <div>
        <div className="mainCont">
          <div className="rightCont">
            <Sidebar />
          </div>
          <div className="leftCont">
            <div className="AdminProductCont">
              <div className="ProductHed">
                <h2>All Products</h2>
              </div>
              <div className="ProductCreteBtn">
                <Link to={`/admin/create/product`}>
                  <button>Create Product</button>
                </Link>
              </div>
            </div>
            <div className="DataGIrd">
              <DataGrid rows={rows} columns={columns} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default ProductList;
