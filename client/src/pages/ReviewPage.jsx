import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext"; // Import the UserContext
import { Rating } from "@material-tailwind/react";

export default function ReviewPage({ placeId }) {
  const { user } = useContext(UserContext); // Access the user from UserContext

  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    axios.get(`/reviews/${placeId}`).then((response) => {
      setReviews(response.data);
      const hasReviewed = response.data.some((review) => review.user._id === user.userId);
      setHasReviewed(hasReviewed);
    });
  };

  const handleReviewSubmit = (ev) => {
    ev.preventDefault();

    if (!user) {
      alert("Please log in to leave a review.");
      return;
    }

    if (hasReviewed) {
      alert("You have already reviewed this place.");
      return;
    }

    const newReview = {
      title: placeId,
      rating: userRating,
      comment: userReview,
      propertyId: placeId,
    };

    axios.post(`/reviews`, newReview).then((response) => {
      setUserReview("");
      setUserRating(0);
      setHasReviewed(true);
      alert("Review added successfully!");
      fetchReviews();
    });
  };

  return (
    <div className="pt-8">
      <h2 className="text-2xl mt-2 mb-2">Reviews</h2>
      {!user && <p>Please log in to leave a review.</p>}
      {user && !hasReviewed && (
        <form onSubmit={handleReviewSubmit}>
          <label>
            Rating:
            <select value={userRating} onChange={(e) => setUserRating(e.target.value)}>
              <option value={0}>Select rating</option>
              <option value={1}>1 star</option>
              <option value={2}>2 stars</option>
              <option value={3}>3 stars</option>
              <option value={4}>4 stars</option>
              <option value={5}>5 stars</option>
            </select>
          </label>
          <br />
          <label>
            Comment:
            <textarea value={userReview} onChange={(e) => setUserReview(e.target.value)}></textarea>
          </label>
          <br />
          <button type="submit" className="rounded-full hover:bg-gray-200 hover:text-black bg-primary text-white px-2 py-2">Submit Review</button>
        </form>
      )}
      {hasReviewed && <p>You have already reviewed this place.</p>}
      {reviews.length === 0 && <p>No reviews available for this place.</p>}
      {reviews.length > 0 && (
        <div className="review-container">
          <h3>All Reviews:</h3>
          <div className="row-container pt-4">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="flex gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h2 className="mb-2 font-bold">{review.user.name}</h2>
                </div>
                <div className="flex gap-2">
                  <p className="font-bold">{review.rating}</p>
                  <Rating value={review.rating} readonly className="yellow-rating" style={{ "--mdc-icon-stroke-color": "black" }} />
                </div>
                <p className="mt-2 font-normal text-gray-500">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
