import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { settingsConfig } from "./settingsConfig";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () => {
      const { themeColors, layout, typography } = settingsConfig;
      
      return createTheme({
        palette: {
          mode,
          primary: {
            main: themeColors.primary,
            light: themeColors.primaryLight,
            dark: themeColors.primaryDark,
            contrastText: "#fff",
          },
          secondary: {
            main: mode === "light" ? themeColors.secondary : themeColors.secondaryDark,
          },
          background: {
            default: mode === "light" ? themeColors.lightBg : themeColors.darkBg,
            paper: mode === "light" ? themeColors.lightPaper : themeColors.darkPaper,
          },
          text: {
            primary: mode === "light" ? themeColors.lightTextPrimary : themeColors.darkTextPrimary,
            secondary: mode === "light" ? themeColors.lightTextSecondary : themeColors.darkTextSecondary,
          },
          error: {
            main: themeColors.error,
          },
          success: {
            main: themeColors.success,
          },
          warning: {
            main: themeColors.warning,
          },
          divider: mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)",
        },
        shape: {
          borderRadius: layout.borderRadius,
        },
        typography: {
          fontFamily: typography.fontFamily,
          h1: { fontSize: "2.5rem", fontWeight: typography.fontWeightBold },
          h2: { fontSize: "2rem", fontWeight: typography.fontWeightBold },
          h3: { fontSize: "1.75rem", fontWeight: typography.fontWeightBold },
          h4: { fontSize: "1.5rem", fontWeight: typography.fontWeightMedium },
          h5: { fontSize: "1.25rem", fontWeight: typography.fontWeightMedium },
          h6: { fontSize: "1rem", fontWeight: typography.fontWeightMedium },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: `${layout.buttonBorderRadius}px`,
                fontWeight: typography.fontWeightMedium,
                padding: "8px 22px",
                transition: settingsConfig.transition,
              },
              containedPrimary: {
                "&:hover": {
                  boxShadow: `0 8px 16px 0 rgba(0, 150, 136, 0.24)`,
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: `${layout.cardBorderRadius}px`,
                boxShadow: mode === "light" 
                  ? settingsConfig.styles.boxShadowLight 
                  : settingsConfig.styles.boxShadowDark,
                backgroundImage: "none",
                border: mode === 'light' ? '1px solid rgba(144, 202, 249, 0.08)' : 'none',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      });
    },
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </ColorModeContext.Provider>
  );
};
