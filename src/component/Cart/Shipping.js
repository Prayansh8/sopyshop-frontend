import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MataData from "../layout/MataData";
import { Country, State } from "country-state-city";
import {
  Home,
  LocationCity,
  Phone,
  Place,
  Public,
  TransferWithinAStation,
} from "@mui/icons-material";
import CheckOutStep from "./CheckOutStep.js";
import "./Shipping.css";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [name, setName] = useState(shippingInfo.name);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = () => {
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert("Phone Number should be 10 digit");
      return;
    }
    dispatch(
      saveShippingInfo({
        name,
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );
    navigate("/order/comfirm");
  };
  return (
    <Fragment>
      <MataData title={"Sopyshop-Shipping"} />
      <div className="shippingContainer">
        <CheckOutStep aciveStap={0} />
        <div className="shippingDetailsCont">
          <h2 className="sipHed">Shipping Details</h2>
          <form
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
            className="shippingform"
          >
            <div className="inputText">
              <Home />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="inputText">
              <Home />
              <input
                type="text"
                placeholder="Addresh"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="inputText">
              <LocationCity />
              <input
                type="text"
                placeholder="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="inputText">
              <Place />
              <input
                type="number"
                placeholder="pincode"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="inputText">
              <Phone />
              <input
                type="number"
                placeholder="Mobile Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="inputText">
              <Public />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div className="inputText">
                <TransferWithinAStation />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">state</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="continueBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
