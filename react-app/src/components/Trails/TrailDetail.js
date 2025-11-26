import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getTrail, clearSingleTrail } from '../../store/trails';
import { getTrailReviews, createReview, deleteReview } from '../../store/reviews';
import { toggleCollection, getToggleStatus } from '../../store/collections';
import './TrailDetail.css';

const TrailDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { trailId } = useParams();
  const [reviewText, setReviewText] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [visited, setVisited] = useState(false);
  const [interested, setInterested] = useState(false);
  
  const trail = useSelector(state => state.trails.singleTrail);
  const reviews = useSelector(state => state.reviews.trailReviews);
  const currentUser = useSelector(state => state.session.user);
  const reviewsArray = Object.values(reviews);

  useEffect(() => {
    dispatch(getTrail(trailId));
    dispatch(getTrailReviews(trailId));
    
    // Get toggle status if user is logged in
    if (currentUser) {
      dispatch(getToggleStatus(trailId)).then(collection => {
        if (collection) {
          setVisited(collection.visited);
          setInterested(collection.want_to_visit);
        }
      });
    }

    return () => {
      dispatch(clearSingleTrail());
    };
  }, [dispatch, trailId, currentUser]);

  const handleVisitedToggle = async () => {
    const newVisited = !visited;
    setVisited(newVisited);
    await dispatch(toggleCollection(trailId, newVisited, interested));
  };

  const handleInterestedToggle = async () => {
    const newInterested = !interested;
    setInterested(newInterested);
    await dispatch(toggleCollection(trailId, visited, newInterested));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!reviewText.trim()) {
      setErrors(['Review text is required']);
      return;
    }

    const result = await dispatch(createReview(trailId, reviewText));
    if (result) {
      setErrors(result);
    } else {
      setReviewText('');
      setShowReviewForm(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      await dispatch(deleteReview(reviewId));
    }
  };

  if (!trail) {
    return <div className="trail-detail-container">Loading...</div>;
  }

  return (
    <div className="trail-detail-container">
      <button className="back-button" onClick={() => history.goBack()}>
        ← Back to Trails
      </button>

      <img 
        src={trail.image_url || `/assets/images/trail${trail.id}.jpg`}
        alt={trail.name}
        className="trail-detail-hero-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/1200x400/86C232/ffffff?text=Trail+Image';
        }}
      />

      <div className="trail-detail-header">
        <div className="trail-title-section">
          <h1>{trail.name}</h1>
          {trail.state && (
            <div className="trail-state-info">
              <span className="state-badge">{trail.state.state_code}</span>
              <span className="state-name">{trail.state.state_name}</span>
            </div>
          )}
        </div>

        {currentUser && (
          <div className="trail-toggles">
            <button
              className={`toggle-button ${visited ? 'toggled' : ''}`}
              onClick={handleVisitedToggle}
            >
              {visited ? '✓ Visited' : 'Mark as Visited'}
            </button>
            <button
              className={`toggle-button ${interested ? 'toggled' : ''}`}
              onClick={handleInterestedToggle}
            >
              {interested ? '★ Want to Visit' : 'Add to Wishlist'}
            </button>
          </div>
        )}
      </div>

      <div className="trail-stats">
        <div className="stat-box">
          <span className="stat-label">Distance</span>
          <span className="stat-value">{trail.length} miles</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Difficulty</span>
          <span className="stat-value">{trail.difficulty}/10</span>
        </div>
        {trail.cross_state && (
          <div className="stat-box cross-state">
            <span className="stat-label">Type</span>
            <span className="stat-value">Cross-State Trail</span>
          </div>
        )}
      </div>

      <div className="trail-description-section">
        <h2>About This Trail</h2>
        <p>{trail.description}</p>
      </div>

      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Reviews ({reviewsArray.length})</h2>
          {currentUser && !showReviewForm && (
            <button
              className="write-review-button"
              onClick={() => setShowReviewForm(true)}
            >
              Write a Review
            </button>
          )}
        </div>

        {showReviewForm && (
          <form className="review-form" onSubmit={handleSubmitReview}>
            <h3>Write Your Review</h3>
            {errors.length > 0 && (
              <div className="errors">
                {errors.map((error, idx) => (
                  <div key={idx} className="error">{error}</div>
                ))}
              </div>
            )}
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience on this trail..."
              rows="6"
            />
            <div className="form-buttons">
              <button type="submit" className="submit-button">Submit Review</button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setShowReviewForm(false);
                  setReviewText('');
                  setErrors([]);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="reviews-list">
          {reviewsArray.length === 0 ? (
            <p className="no-reviews">No reviews yet. Be the first to review this trail!</p>
          ) : (
            reviewsArray.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-user">
                    <strong>{review.user?.username || 'Anonymous'}</strong>
                  </div>
                  {currentUser && currentUser.id === review.user_id && (
                    <button
                      className="delete-review-button"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="review-text">{review.review}</p>
                <span className="review-date">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailDetail;
