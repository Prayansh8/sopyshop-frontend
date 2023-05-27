import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";
import Loader from "../layout/Loader/Loader.js";
import ReviewsCard from "./ReviewsCard.js";
import { addItemToCart } from "../../actions/cartAction";
import MataData from "../layout/MataData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quintity, setQuintity] = useState(1);

  const submitReviewToggel = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handlePlusClick = () => {
    if (product.stock <= quintity) return;
    const qty = quintity + 1;
    setQuintity(qty);
  };

  const handleMinusClick = () => {
    if (1 >= quintity) return;
    const qty = quintity - 1;
    setQuintity(qty);
  };

  const addToCartHendler = () => {
    dispatch(addItemToCart(id, quintity));
    toast.success("item added to cart");
  };

  const reviewSubmitHendeler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review Submitted Succesfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  return (
    <>
      <Fragment>
        <MataData title={"Sopyshop-ProductDetails"} />
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
                          <div key={item.id}>
                            <img
                              className="productImg"
                              src={item.url}
                              alt={`${i} Slide`}
                            />
                          </div>
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
                              className="qtyminus minus"
                              field="quantity"
                              onClick={handleMinusClick}
                            />
                            <input
                              type="text"
                              name="quantity"
                              value={quintity}
                              className="qty"
                              readOnly
                            />
                            <input
                              type="button"
                              value="+"
                              className="qtyplus plus"
                              field="quantity"
                              onClick={handlePlusClick}
                            />
                          </div>
                          <button onClick={addToCartHendler}>
                            Add to cart
                          </button>
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
                    <button
                      className="submitReviews"
                      onClick={submitReviewToggel}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="productReviewsContainer">
              <div className="review-heading">
                <h1>Reviews</h1>
              </div>

              <Dialog open={open} onClose={submitReviewToggel}>
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />
                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggel} color="primary">
                    Cancle
                  </Button>
                  <Button onClick={reviewSubmitHendeler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>

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
