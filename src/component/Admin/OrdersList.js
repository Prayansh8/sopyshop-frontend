import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./ProductList.css";
import { toast } from "react-toastify";
import {
  clearErrors,
  deleteOrderByAdmin,
  getAllOrdersByAdmin,
} from "../../actions/orderAction";
import MobileAdminBar from "./MobileAdminBar";

const OrdersList = () => {
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.orders);
  const { isDeleteded } = useSelector((state) => state.deleteOrder);

  const deleteOrderHendeler = (id) => {
    dispatch(deleteOrderByAdmin(id));
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
    dispatch(getAllOrdersByAdmin());
  }, [error, dispatch, isDeleteded]);

  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 300, flex: 0.5 },
    { field: "user", headerName: "User Id", minWidth: 300, flex: 1 },
    {
      field: "orderStatus",
      headerName: "Srder Status",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
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
            <Link to={`/admin/order/${params.id}`}>
              <EditIcon />
            </Link>
            <button
              className="deleteProductBtn"
              onClick={() => deleteOrderHendeler(params.id)}
            >
              <DeleteIcon />
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.user,
        orderStatus: item.orderStatus,
        totalPrice: item.totalPrice,
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
              <div>
                <h2>All Orders</h2>
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

export default OrdersList;
