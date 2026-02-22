import React, { Fragment } from "react";
import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper, Typography, useTheme, Box, alpha } from "@mui/material";

const CheckOutStep = ({ activeStep }) => {
  const theme = useTheme();

  const steps = [
    {
      label: "Shipping Details",
      icon: <LocalShipping />,
    },
    {
      label: "Confirm Order",
      icon: <LibraryAddCheck />,
    },
    {
      label: "Payment",
      icon: <AccountBalance />,
    },
  ];

  return (
    <Fragment>
      <Box sx={{ py: 4, px: { xs: 1, md: 5 } }}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((item, index) => (
            <Step 
              key={index} 
              active={activeStep === index} 
              completed={activeStep > index}
            >
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: activeStep >= index 
                        ? theme.palette.primary.main 
                        : alpha(theme.palette.text.disabled, 0.1),
                      color: activeStep >= index ? "#fff" : "text.disabled",
                      boxShadow: activeStep === index ? `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}` : "none",
                      transition: "all 0.3s ease",
                      zIndex: 2
                    }}
                  >
                    {React.cloneElement(item.icon, { sx: { fontSize: 20 } })}
                  </Box>
                )}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: activeStep >= index ? 800 : 500,
                    color: activeStep >= index ? "text.primary" : "text.disabled",
                    transition: "all 0.3s ease",
                    mt: 1
                  }}
                >
                  {item.label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Fragment>
  );
};

export default CheckOutStep;
