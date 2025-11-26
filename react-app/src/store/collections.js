// constants
const SET_COLLECTIONS = 'collections/SET_COLLECTIONS';
const SET_VISITED = 'collections/SET_VISITED';
const SET_INTERESTED = 'collections/SET_INTERESTED';
const UPDATE_COLLECTION = 'collections/UPDATE_COLLECTION';
const REMOVE_COLLECTION = 'collections/REMOVE_COLLECTION';
const CLEAR_COLLECTIONS = 'collections/CLEAR_COLLECTIONS';

const setCollections = (collections) => ({
  type: SET_COLLECTIONS,
  payload: collections
});

const setVisited = (collections) => ({
  type: SET_VISITED,
  payload: collections
});

const setInterested = (collections) => ({
  type: SET_INTERESTED,
  payload: collections
});

const updateCollection = (collection) => ({
  type: UPDATE_COLLECTION,
  payload: collection
});

const removeCollection = (collectionId) => ({
  type: REMOVE_COLLECTION,
  payload: collectionId
});

const clearCollections = () => ({
  type: CLEAR_COLLECTIONS
});

const initialState = { 
  allCollections: {}, 
  visited: {}, 
  interested: {} 
};

// Get all collections (visited + interested)
export const getAllCollections = () => async (dispatch) => {
  const response = await fetch('/api/collections/');
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setCollections(data.collections));
    return data.collections;
  }
};

// Get visited trails
export const getVisitedTrails = () => async (dispatch) => {
  const response = await fetch('/api/collections/visited');
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setVisited(data.collections));
    return data.collections;
  }
};

// Alias for consistency with naming convention
export const getVisitedCollections = getVisitedTrails;

// Get interested trails (want to visit)
export const getInterestedTrails = () => async (dispatch) => {
  const response = await fetch('/api/collections/interested');
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setInterested(data.collections));
    return data.collections;
  }
};

// Alias for consistency with naming convention
export const getInterestedCollections = getInterestedTrails;


// Get toggle status for a trail
export const getToggleStatus = (trailId) => async (dispatch) => {
  const response = await fetch(`/api/collections/toggle/${trailId}`);
  
  if (response.ok) {
    const data = await response.json();
    return data.collection;
  }
};

// Toggle visited/interested status
export const toggleCollection = (trailId, visited, wantToVisit) => async (dispatch) => {
  const response = await fetch(`/api/collections/toggle/${trailId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      visited,
      want_to_visit: wantToVisit
    })
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(updateCollection(data.collection));
    return data.collection;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

// Delete a collection
export const deleteCollection = (collectionId) => async (dispatch) => {
  const response = await fetch(`/api/collections/${collectionId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (response.ok) {
    dispatch(removeCollection(collectionId));
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

// Clear all collections
export const clearAllCollections = () => (dispatch) => {
  dispatch(clearCollections());
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_COLLECTIONS: {
      const newState = { ...state, allCollections: {} };
      action.payload.forEach(collection => {
        newState.allCollections[collection.id] = collection;
      });
      return newState;
    }
    case SET_VISITED: {
      const newState = { ...state, visited: {} };
      action.payload.forEach(collection => {
        newState.visited[collection.id] = collection;
      });
      return newState;
    }
    case SET_INTERESTED: {
      const newState = { ...state, interested: {} };
      action.payload.forEach(collection => {
        newState.interested[collection.id] = collection;
      });
      return newState;
    }
    case UPDATE_COLLECTION: {
      const newState = { ...state };
      const collection = action.payload;
      
      // Update in allCollections
      newState.allCollections = { ...state.allCollections };
      newState.allCollections[collection.id] = collection;
      
      // Update in visited if applicable
      if (collection.visited) {
        newState.visited = { ...state.visited };
        newState.visited[collection.id] = collection;
      } else {
        newState.visited = { ...state.visited };
        delete newState.visited[collection.id];
      }
      
      // Update in interested if applicable
      if (collection.want_to_visit) {
        newState.interested = { ...state.interested };
        newState.interested[collection.id] = collection;
      } else {
        newState.interested = { ...state.interested };
        delete newState.interested[collection.id];
      }
      
      return newState;
    }
    case REMOVE_COLLECTION: {
      const newState = { ...state };
      newState.allCollections = { ...state.allCollections };
      newState.visited = { ...state.visited };
      newState.interested = { ...state.interested };
      
      delete newState.allCollections[action.payload];
      delete newState.visited[action.payload];
      delete newState.interested[action.payload];
      
      return newState;
    }
    case CLEAR_COLLECTIONS:
      return { allCollections: {}, visited: {}, interested: {} };
    default:
      return state;
  }
}
