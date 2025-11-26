// constants
const SET_STATES = 'states/SET_STATES';
const SET_STATE = 'states/SET_STATE';
const CLEAR_STATES = 'states/CLEAR_STATES';

const setStates = (states) => ({
  type: SET_STATES,
  payload: states
});

const setState = (state) => ({
  type: SET_STATE,
  payload: state
});

const clearStates = () => ({
  type: CLEAR_STATES
});

const initialState = { allStates: {}, singleState: null };

// Get all states
export const getAllStates = () => async (dispatch) => {
  const response = await fetch('/api/states/');
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setStates(data.states));
    return data.states;
  }
};

// Get single state by ID
export const getState = (stateId) => async (dispatch) => {
  const response = await fetch(`/api/states/${stateId}`);
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setState(data));
    return data;
  }
};

// Get state with trails by ID
export const getStateWithTrails = (stateId) => async (dispatch) => {
  const response = await fetch(`/api/states/${stateId}/trails`);
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setState(data));
    return data;
  }
};

// Get state by code
export const getStateByCode = (stateCode) => async (dispatch) => {
  const response = await fetch(`/api/states/code/${stateCode}`);
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setState(data));
    return data;
  }
};

// Get state with trails by code
export const getStateWithTrailsByCode = (stateCode) => async (dispatch) => {
  const response = await fetch(`/api/states/code/${stateCode}/trails`);
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setState(data));
    return data;
  }
};

// Clear single state
export const clearSingleState = () => (dispatch) => {
  dispatch(setState(null));
};

// Clear all states
export const clearAllStates = () => (dispatch) => {
  dispatch(clearStates());
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATES: {
      const newState = { ...state, allStates: {} };
      action.payload.forEach(stateItem => {
        newState.allStates[stateItem.id] = stateItem;
      });
      return newState;
    }
    case SET_STATE:
      return { ...state, singleState: action.payload };
    case CLEAR_STATES:
      return { allStates: {}, singleState: null };
    default:
      return state;
  }
}
