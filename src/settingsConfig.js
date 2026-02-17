/**
 * Global Settings Configuration for Sopyshop
 * Centralized design tokens and theme settings
 */

export const settingsConfig = {
  // Theme Colors
  themeColors: {
    primary: "#009688",         // Your requested green
    primaryLight: "#33ab9f",
    primaryDark: "#00695f",
    
    secondary: "#2196f3",
    secondaryDark: "#90caf9",
    
    // Backgrounds
    lightBg: "#eef2f6",
    lightPaper: "#ffffff",
    darkBg: "#111936",
    darkPaper: "#1a223f",
    
    // Text
    lightTextPrimary: "#364152",
    lightTextSecondary: "#697586",
    darkTextPrimary: "#bdc8f0",
    darkTextSecondary: "#8492c4",
    
    error: "#f44336",
    success: "#4caf50",
    warning: "#ff9800",
  },
  
  // Layout Tokens
  layout: {
    borderRadius: 12,           // Global border radius
    buttonBorderRadius: 8,
    cardBorderRadius: 16,
    navbarHeight: 70,
    containerMaxWidth: "lg",
  },
  
  // Spacing & Shadows
  styles: {
    boxShadowLight: "0 2px 14px 0 rgb(32 40 45 / 8%)",
    boxShadowDark: "0 2px 14px 0 rgb(0 0 0 / 25%)",
    mainPadding: { xs: 2, md: 4, lg: 6 },
  },
  
  // Typography
  typography: {
    fontFamily: "'Roboto', 'Inter', 'Public Sans', sans-serif",
    fontSizeBase: 16,
    fontWeightBold: 700,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
  },
  
  // Other Settings
  transition: "all 0.3s ease-in-out",
  drawerWidth: 280,
};
