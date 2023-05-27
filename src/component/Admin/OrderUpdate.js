import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "./OrderUpdate.css";
import { adminUpdateOrder, clearErrors } from "../../actions/orderAction";
import { AccountTree } from "@mui/icons-material";
import SingleOrder from "../Orders/SingleOrder";

const OrderUpdate = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.updateOrder);

  const { id } = useParams();

  const [status, setStatus] = useState("");

  const updateOrderSubmit = () => {
    const formData = new FormData();
    formData.append("status", status);

    dispatch(adminUpdateOrder(id, formData));
    toast.success("update Product Successful!");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);
  return (
    <Fragment>
      <div className="updateOrder">
        <div className="disFlexUpdateOrder">
          <div className="LeftOrderCont">
            <SingleOrder />
          </div>
          <div className="rightOrderCont">
            <div className="updateOrderCont">
              <form
                id="Product"
                onSubmit={updateOrderSubmit}
                className="loginForm updateOrderForm"
              >
                <div className="createProductFormText">
                  <AccountTree />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </div>

                <input
                  type="submit"
                  value="Update"
                  className="submitBtn"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderUpdate;
