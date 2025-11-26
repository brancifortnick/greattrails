import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllCollections, getVisitedCollections, getInterestedCollections } from '../../store/collections';
import './MyTrails.css';

function MyTrails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const allCollections = useSelector(state => state.collections.allCollections);
  const visited = useSelector(state => state.collections.visited);
  const interested = useSelector(state => state.collections.interested);

  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      history.push('/');
      return;
    }

    const loadCollections = async () => {
      setLoading(true);
      if (activeTab === 'all') {
        await dispatch(getAllCollections());
      } else if (activeTab === 'visited') {
        await dispatch(getVisitedCollections());
      } else if (activeTab === 'interested') {
        await dispatch(getInterestedCollections());
      }
      setLoading(false);
    };

    loadCollections();
  }, [dispatch, user, history, activeTab]);

  if (!user) {
    return null;
  }

  const handleTrailClick = (trailId) => {
    history.push(`/trails/${trailId}`);
  };

  const getDisplayCollections = () => {
    if (activeTab === 'all') {
      return Object.values(allCollections);
    } else if (activeTab === 'visited') {
      return Object.values(visited);
    } else if (activeTab === 'interested') {
      return Object.values(interested);
    }
    return [];
  };

  const displayCollections = getDisplayCollections();

  return (
    <div className="my-trails-container">
      <div className="my-trails-header">
        <h1>My Trails</h1>
        <p>Manage your hiking adventures</p>
      </div>

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Collections ({Object.keys(allCollections).length})
        </button>
        <button
          className={`tab-button ${activeTab === 'visited' ? 'active' : ''}`}
          onClick={() => setActiveTab('visited')}
        >
          Visited ({Object.keys(visited).length})
        </button>
        <button
          className={`tab-button ${activeTab === 'interested' ? 'active' : ''}`}
          onClick={() => setActiveTab('interested')}
        >
          Want to Visit ({Object.keys(interested).length})
        </button>
      </div>

      <div className="collections-content">
        {loading ? (
          <div className="loading">Loading your trails...</div>
        ) : displayCollections.length === 0 ? (
          <div className="no-collections">
            <h3>No trails found</h3>
            <p>Start exploring trails and add them to your collections!</p>
            <button 
              className="browse-button"
              onClick={() => history.push('/trails')}
            >
              Browse Trails
            </button>
          </div>
        ) : (
          <div className="collections-grid">
            {displayCollections.map((collection) => {
              const trail = collection.trail;
              return (
                <div
                  key={collection.id}
                  className="collection-card"
                  onClick={() => handleTrailClick(trail.id)}
                >
                  <img 
                    src={trail.image_url || `/assets/images/trail${trail.id}.jpg`}
                    alt={trail.trail_name}
                    className="collection-card-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x600/86C232/ffffff?text=Trail+Image';
                    }}
                  />
                  
                  <div className="collection-card-content">
                    <div className="collection-card-header">
                      <h3>{trail.trail_name}</h3>
                      <div className="collection-badges">
                        {collection.visited && (
                          <span className="badge visited-badge">✓ Visited</span>
                        )}
                        {collection.want_to_visit && (
                          <span className="badge interested-badge">★ Want to Visit</span>
                        )}
                      </div>
                    </div>

                    <div className="collection-card-body">
                      <div className="trail-info-row">
                        <div className="info-item">
                          <span className="info-label">State</span>
                          <span className="info-value">{trail.state?.name || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Length</span>
                          <span className="info-value">{trail.length} mi</span>
                        </div>
                      </div>

                      <div className="trail-info-row">
                        <div className="info-item">
                          <span className="info-label">Difficulty</span>
                          <span className="info-value">
                            {trail.difficulty}/10
                          </span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Elevation Gain</span>
                          <span className="info-value">{trail.elevation_gain} ft</span>
                        </div>
                      </div>

                      {trail.cross_state && (
                        <div className="cross-state-indicator">
                          <span>🌄 Cross-State Trail</span>
                        </div>
                      )}
                    </div>

                    <div className="collection-card-footer">
                      <button 
                        className="view-details-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrailClick(trail.id);
                        }}
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrails;
