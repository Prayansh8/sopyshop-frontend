import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Paper from "@mui/material/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";
import MobileAdminBar from "./MobileAdminBar";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllOrdersByAdmin } from "../../actions/orderAction";
import { toast } from "react-toastify";
import { getAllUsers } from "../../actions/userAction";
import { getAdminProducts } from "../../actions/productAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { orders, totalAmount, error } = useSelector((state) => state.orders);
  const { users } = useSelector((state) => state.getAllUsers);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllOrdersByAdmin());
    dispatch(getAllUsers());
    dispatch(getAdminProducts());
  }, [error, dispatch]);

  const data = orders.map((order, index) => ({
    argument: index + 1,
    value: order.totalPrice,
  }));

  const chartData = orders.map((order) => ({
    country: order.shippingInfo.state,
    area: order.itemPrice,
  }));

  return (
    <div>
      <div className="mobileTopBarContainer">
        <MobileAdminBar />
      </div>
      <div className="mainCont">
        <div className="rightContAdmin">
          <Sidebar />
        </div>
        <div className="leftContAdmin">
          <h2 className="text-center my-2">Dashboard</h2>
          <div className="totalAmount">
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="deshCount">
            <div className="productCont">
              <Link to={"/admin/product"}>
                <div className="productCont1">
                  <p>Product</p>
                  <p>{products.length}</p>
                </div>
              </Link>
            </div>
            <div className="orderCont">
              <Link to={"/admin/orders"}>
                <div className="productCont1">
                  <p>Orders</p>
                  <p>{orders.length}</p>
                </div>
              </Link>
            </div>
            <div className="userCont">
              <Link to={"/admin/users"}>
                <div className="productCont1">
                  <p>Users</p>
                  <p>{users.length}</p>
                </div>
              </Link>
            </div>
          </div>
          <br />
          <div className="lineChart">
            <Paper>
              <Chart data={data}>
                <ArgumentAxis />
                <ValueAxis />

                <LineSeries valueField="value" argumentField="argument" />
              </Chart>
            </Paper>
            <br />
            <Paper>
              <Chart data={chartData}>
                <PieSeries valueField="area" argumentField="country" />
              </Chart>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
