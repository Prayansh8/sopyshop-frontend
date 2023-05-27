import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { clearErrors, getMyOrders } from "../../actions/orderAction";
import { Launch } from "@mui/icons-material";
import "./MyOrders.css";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getMyOrders());
  }, [error, dispatch]);

  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 150, flex: 0.8 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemQty",
      headerName: "items Qty",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
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
            <Link to={`/order/${params.id}`}>
              <Launch />
            </Link>
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
        status: item.orderStatus,
        itemQty: item.orderItems.length,
        amount: item.totalPrice,
      });
    });

  return (
    <Fragment>
      <div className="myOrdersCount">
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          className="myOrderTable"
          autoHeight
        />
      </div>
    </Fragment>
  );
};

export default MyOrders;
