import React, { Fragment } from "react";
import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";

const CheckOutStep = ({ aciveStap }) => {
  const staps = [
    {
      lable: <Typography>Sipping Details</Typography>,
      icon: <LocalShipping />,
    },
    {
      lable: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheck />,
    },
    {
      lable: <Typography>Payment</Typography>,
      icon: <AccountBalance />,
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
