export const config = {
  // baseUrl: process.env.REACT_APP_API_BASE_URI || "http://localhost:5000",
  baseUrl: process.env.REACT_APP_API_BASE_URI || "https://sopyshop.worksnet.in",

  stripe: {
    stripeApi:
      process.env.REACT_APP_STRIPE_API_KEY ||
      "pk_test_51NBJjqSHHwsm4i0iP267XyzQXcD87NNlb17LHQBCZ4nTY7eCXF8O846cYWMraeTBkgmf9dbZpjdMQ5jzKAK9Vhmv00c5blnWIB",
  },
};
