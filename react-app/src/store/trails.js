// constants
const SET_TRAILS = 'trails/SET_TRAILS';
const SET_TRAIL = 'trails/SET_TRAIL';
const REMOVE_TRAIL = 'trails/REMOVE_TRAIL';
const CLEAR_TRAILS = 'trails/CLEAR_TRAILS';

const setTrails = (trails) => ({
  type: SET_TRAILS,
  payload: trails
});

const setTrail = (trail) => ({
  type: SET_TRAIL,
  payload: trail
});

const removeTrail = (trailId) => ({
  type: REMOVE_TRAIL,
  payload: trailId
});

const clearTrails = () => ({
  type: CLEAR_TRAILS
});

const initialState = { allTrails: {}, singleTrail: null };

// Get all trails
export const getAllTrails = () => async (dispatch) => {
  const response = await fetch('/api/trails/');
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setTrails(data.trails));
    return data.trails;
  }
};

// Get single trail with details
export const getTrail = (trailId) => async (dispatch) => {
  const response = await fetch(`/api/trails/${trailId}/detailed`);
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setTrail(data));
    return data;
  }
};

// Get trails by state
export const getTrailsByState = (stateId) => async (dispatch) => {
  const response = await fetch(`/api/trails/state/${stateId}`);
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setTrails(data.trails));
    return data.trails;
  }
};

// Search trails by name
export const searchTrails = (name) => async (dispatch) => {
  const response = await fetch(`/api/trails/search?name=${encodeURIComponent(name)}`);
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setTrails(data.trails));
    return data.trails;
  }
};

// Get trails by difficulty
export const getTrailsByDifficulty = (difficulty) => async (dispatch) => {
  const response = await fetch(`/api/trails/difficulty/${difficulty}`);
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setTrails(data.trails));
    return data.trails;
  }
};

// Get trails by difficulty range
export const getTrailsByDifficultyRange = (minDiff, maxDiff) => async (dispatch) => {
  const response = await fetch(`/api/trails/difficulty-range/${minDiff}/${maxDiff}`);
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setTrails(data.trails));
    return data.trails;
  }
};

// Get trails by length range
export const getTrailsByLength = (minLength, maxLength) => async (dispatch) => {
  const response = await fetch(`/api/trails/length/${minLength}/${maxLength}`);
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setTrails(data.trails));
    return data.trails;
  }
};

// Get cross-state trails
export const getCrossStateTrails = () => async (dispatch) => {
  const response = await fetch('/api/trails/cross-state');
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setTrails(data.trails));
    return data.trails;
  }
};

// Clear single trail
export const clearSingleTrail = () => (dispatch) => {
  dispatch(setTrail(null));
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRAILS: {
      const newState = { ...state, allTrails: {} };
      action.payload.forEach(trail => {
        newState.allTrails[trail.id] = trail;
      });
      return newState;
    }
    case SET_TRAIL:
      return { ...state, singleTrail: action.payload };
    case REMOVE_TRAIL: {
      const newState = { ...state };
      delete newState.allTrails[action.payload];
      return newState;
    }
    case CLEAR_TRAILS:
      return { allTrails: {}, singleTrail: null };
    default:
      return state;
  }
}
