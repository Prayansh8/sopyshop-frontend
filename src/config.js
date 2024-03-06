export const config = {
  // baseUrl: process.env.REACT_APP_API_BASE_URI || "http://localhost:5000",
  baseUrl: process.env.REACT_APP_API_BASE_URI,

  stripe: {
    stripeApi: process.env.REACT_APP_STRIPE_API_KEY,
  },
};
