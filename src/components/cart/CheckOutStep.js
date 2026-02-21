import React, { Fragment } from "react";
import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper } from "@mui/material";

const CheckOutStep = ({ activeStep }) => {
  const steps = [
    {
      label: <p className="sippingText">Shipping Details</p>,
      icon: <LocalShipping className="sippingIcon" />,
    },
    {
      label: <p className="sippingText">Confirm Order</p>,
      icon: <LibraryAddCheck className="sippingIcon" />,
    },
    {
      label: <p className="sippingText">Payment</p>,
      icon: <AccountBalance className="sippingIcon" />,
    },
  ];
  const stepStyle = {
    boxString: "border-box",
  };
  return (
    <Fragment>
      <Stepper alternateLabel activeStep={activeStep} style={stepStyle}>
        {steps.map((item, index) => (
          <Step key={index}>
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "gray",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckOutStep;
