import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/avatar.png";

export default function ReviewsCard({ review }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="productReviews">
      <img src={profilePng} alt="User" />
      <h5>{review.name}</h5>
      <span>
        <ReactStars classNames="m-auto" {...options} />
      </span>
      <p>{review.comment}</p>
    </div>
  );
}
