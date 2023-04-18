import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";
import Loader from "../layout/Loader/Loader.js";
import ReviewsCard from "./ReviewsCard.js";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <>
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="productDetailsContainer">
              <div className="container productDetails">
                <div className="productImgBlock-1">
                  <div className="productImgBlock-1-1">
                    <Carousel>
                      {product.images &&
                        product.images.map((item, i) => (
                          <img
                            className="productImg"
                            src={item.url}
                            alt={`${i} Slide`}
                          />
                        ))}
                    </Carousel>
                  </div>
                </div>
                <div className="productDetailsBlock m-1">
                  <div className="productDetailsBlock-1">
                    <div className="detailsBlock-1">
                      <h1>{product.name}</h1>
                      <p>product # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                      <ReactStars {...options} />
                      <spam>({product.numOfReviews} Reviews)</spam>
                    </div>
                    <div className="detailsBlock-3">
                      <div className="detailsBlock-3-1">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1-1">
                          <div className="detailsBlock-3-1-2">
                            <input
                              type="button"
                              value="-"
                              class="qtyminus minus"
                              field="quantity"
                            />
                            <input
                              type="text"
                              name="quantity"
                              value="0"
                              class="qty"
                            />
                            <input
                              type="button"
                              value="+"
                              class="qtyplus plus"
                              field="quantity"
                            />
                          </div>
                          <button>Add to cart</button>
                        </div>
                      </div>
                      <div className="detailsBlock-3-2">
                        <p>
                          Status :{" "}
                          <b
                            className={
                              product.Stock < 1 ? "redColor" : "greenColor"
                            }
                          >
                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                          </b>
                        </p>
                      </div>
                    </div>
                    <div className="discription">
                      <spam> Discription : </spam> <br /> {product.description}
                    </div>
                    <button className="submitReviews">Submit Review</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="productReviewsContainer">
              <div className="review-heading">
                <h1>Reviews</h1>
              </div>
              {product.reviews && product.reviews[0] ? (
                <div className="container productReviewsBox">
                  {product.reviews &&
                    product.reviews.map((reviews) => (
                      <ReviewsCard review={reviews} />
                    ))}
                </div>
              ) : (
                <p>NO Reviews Yet</p>
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    </>
  );
};

export default ProductDetails;
