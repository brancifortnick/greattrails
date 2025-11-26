// constants
const SET_REVIEWS = 'reviews/SET_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
const CLEAR_REVIEWS = 'reviews/CLEAR_REVIEWS';

const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  payload: reviews
});

const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review
});

const updateReviewAction = (review) => ({
  type: UPDATE_REVIEW,
  payload: review
});

const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  payload: reviewId
});

const clearReviews = () => ({
  type: CLEAR_REVIEWS
});

const initialState = { trailReviews: {} };

// Get reviews for a trail
export const getTrailReviews = (trailId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/trail/${trailId}`);
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setReviews(data.reviews));
    return data.reviews;
  }
};

// Create a review
export const createReview = (trailId, reviewText) => async (dispatch) => {
  const response = await fetch(`/api/reviews/trail/${trailId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      review: reviewText
    })
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setReviews(data.reviews));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

// Update a review
export const updateReview = (reviewId, reviewText) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      review: reviewText
    })
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(updateReviewAction(data.review));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

// Delete a review
export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setReviews(data.reviews));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

// Get user reviews
export const getUserReviews = (userId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/user/${userId}`);
  
  if (response.ok) {
    const data = await response.json();
    return data.reviews;
  }
};

// Clear reviews
export const clearAllReviews = () => (dispatch) => {
  dispatch(clearReviews());
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS: {
      const newState = { ...state, trailReviews: {} };
      action.payload.forEach(review => {
        newState.trailReviews[review.id] = review;
      });
      return newState;
    }
    case ADD_REVIEW: {
      const newState = { ...state };
      newState.trailReviews = { ...state.trailReviews };
      newState.trailReviews[action.payload.id] = action.payload;
      return newState;
    }
    case UPDATE_REVIEW: {
      const newState = { ...state };
      newState.trailReviews = { ...state.trailReviews };
      newState.trailReviews[action.payload.id] = action.payload;
      return newState;
    }
    case REMOVE_REVIEW: {
      const newState = { ...state };
      newState.trailReviews = { ...state.trailReviews };
      delete newState.trailReviews[action.payload];
      return newState;
    }
    case CLEAR_REVIEWS:
      return { trailReviews: {} };
    default:
      return state;
  }
}
