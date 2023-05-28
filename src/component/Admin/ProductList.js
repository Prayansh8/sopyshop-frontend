import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  deleteProduct,
  getAdminProducts,
  clearErrors,
} from "../../actions/productAction";
import "./ProductList.css";
import { toast } from "react-toastify";
import MobileAdminBar from "./MobileAdminBar";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);
  const { isDeleteded } = useSelector((state) => state.deleteProduct);
  const deleteProductHendeler = (id) => {
    dispatch(deleteProduct(id));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleteded) {
      toast.success("Product Deleted");
    }
    dispatch(getAdminProducts());
  }, [error, dispatch, isDeleteded]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 300, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 300, flex: 1 },
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
            <Link to={`/admin/update/product/${params.id}`}>
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <div>
        <div className="mobileTopBarContainer">
          <MobileAdminBar />
        </div>
        <div className="mainCont">
          <div className="rightContAdmin">
            <Sidebar />
          </div>
          <div className="leftContAdmin">
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
    </Fragment>
  );
};

export default ProductList;
