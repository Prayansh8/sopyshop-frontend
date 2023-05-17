import React from "react";
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

const Dashboard = () => {
  const data = [
    { argument: 1, value: 10 },
    { argument: 2, value: 14 },
    { argument: 3, value: 28 },
    { argument: 4, value: 22 },
    { argument: 5, value: 31 },
  ];

  const chartData = [
    { country: 'Russia', area: 12 },
    { country: 'Canada', area: 7 },
    { country: 'USA', area: 7 },
    { country: 'China', area: 7 },
    { country: 'Brazil', area: 6 },
    { country: 'Australia', area: 5 },
    { country: 'India', area: 2 },
    { country: 'Others', area: 55 },
  ];
  return (
    <div>
      <div className="mainCont">
        <div className="rightCont">
          <Sidebar />
        </div>
        <div className="leftCont">
          <h2 className="text-center my-2">Dashboard</h2>
          <div className="totalAmount">
            <p>
              Total Amount <br /> ₹2000
            </p>
          </div>
          <div className="deshCount">
            <div className="productCont">
              <Link to={"/admin/product"}>
                <div className="productCont1">
                  <p>Product</p>
                  <p>40</p>
                </div>
              </Link>
            </div>
            <div className="orderCont">
              <Link to={"/admin/orders"}>
                <div className="productCont1">
                  <p>Orders</p>
                  <p>4</p>
                </div>
              </Link>
            </div>
            <div className="userCont">
              <Link to={"/admin/users"}>
                <div className="productCont1">
                  <p>Users</p>
                  <p>7</p>
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
            </Paper><br />
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
