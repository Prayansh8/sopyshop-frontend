export const config = {
  // baseUrl: "http://localhost:5000",
  // baseUrl: process.env.REACT_APP_API_BASE_URI,http://sopyshop-env.eba-55ypccgw.ap-south-1.elasticbeanstalk.com/,
  baseUrl: "//sopyshop-env.eba-55ypccgw.ap-south-1.elasticbeanstalk.com/",

  stripe: {
    stripeApi: process.env.REACT_APP_STRIPE_API_KEY,
  },
};
