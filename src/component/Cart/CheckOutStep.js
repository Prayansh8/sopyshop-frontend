import React, { Fragment } from "react";
import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper } from "@mui/material";
import "./CheckOutStep.css";

const CheckOutStep = ({ aciveStap }) => {
  const staps = [
    {
      lable: <p className="sippingText">Sipping Details</p>,
      icon: <LocalShipping className="sippingIcon" />,
    },
    {
      lable: <p className="sippingText">Confirm Order</p>,
      icon: <LibraryAddCheck className="sippingIcon" />,
    },
    {
      lable: <p className="sippingText">Payment</p>,
      icon: <AccountBalance className="sippingIcon" />,
    },
  ];
  const stepStyle = {
    boxString: "border-box",
  };
  return (
    <Fragment>
      <Stepper alternateLabel aciveStap={aciveStap} style={stepStyle}>
        {staps.map((item, index) => (
          <Step key={index}>
            <StepLabel
              style={{
                color: aciveStap >= index ? "tomato" : "gray",
             
              }}
              icon={item.icon}
            >
              {item.lable}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckOutStep;
