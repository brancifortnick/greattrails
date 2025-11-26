import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './StateTrailsPage.css';

const StateTrailsPage = () => {
  const { stateCode } = useParams();
  const history = useHistory();
  const [trails, setTrails] = useState([]);
  const [stateName, setStateName] = useState('');
  const [loading, setLoading] = useState(true);

  const stateNames = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
    'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
    'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
    'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
    'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
    'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
    'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
    'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
    'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
    'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
    'WI': 'Wisconsin', 'WY': 'Wyoming'
  };

  useEffect(() => {
    const fetchTrailsByState = async () => {
      try {
        // First, get all trails
        const response = await fetch('/api/trails/');
        const data = await response.json();
        
        // Get all states to map state_id to state_code
        const statesResponse = await fetch('/api/states/');
        const statesData = await statesResponse.json();
        
        // Find the state ID for this state code
        const state = statesData.states.find(s => s.state_code === stateCode.toUpperCase());
        
        if (state) {
          setStateName(state.state_name);
          // Filter trails by state_id
          const stateTrails = data.trails.filter(trail => trail.state_id === state.id);
          setTrails(stateTrails);
        } else {
          setStateName(stateNames[stateCode.toUpperCase()] || 'Unknown State');
          setTrails([]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trails:', error);
        setLoading(false);
      }
    };

    fetchTrailsByState();
  }, [stateCode]);

  const handleTrailClick = (trailId) => {
    history.push(`/trails/${trailId}`);
  };

  const handleBackClick = () => {
    history.push('/states');
  };

  if (loading) {
    return (
      <div className="state-trails-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="state-trails-container">
      <button className="back-button" onClick={handleBackClick}>
        ← Back to States
      </button>
      
      <div className="state-header">
        <h1>Trails in {stateName}</h1>
        <div className="state-code-badge">{stateCode.toUpperCase()}</div>
      </div>

      {trails.length === 0 ? (
        <div className="no-trails">
          <p>No trails found for this state yet.</p>
          <p>Check back later for updates!</p>
        </div>
      ) : (
        <div className="trails-list">
          {trails.map(trail => (
            <div 
              key={trail.id} 
              className="trail-item"
              onClick={() => handleTrailClick(trail.id)}
            >
              <div className="trail-image-container">
                              <img 
                src={trail.image_url || `/assets/images/trail${trail.id}.jpg`}
                alt={trail.name}
                className="state-trail-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x600/86C232/ffffff?text=Trail+Image';
                }}
              />
                {trail.cross_state && (
                  <span className="cross-state-badge">Cross-State Trail</span>
                )}
              </div>
              
              <div className="trail-content">
                <h2 className="trail-name">{trail.name}</h2>
                <p className="trail-description">{trail.description}</p>
                
                <div className="trail-stats">
                  <div className="stat">
                    <span className="stat-label">Distance:</span>
                    <span className="stat-value">{trail.length} miles</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Difficulty:</span>
                    <span className="stat-value">{trail.difficulty}/10</span>
                  </div>
                  {trail.elevation_gain && (
                    <div className="stat">
                      <span className="stat-label">Elevation:</span>
                      <span className="stat-value">{trail.elevation_gain} ft</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StateTrailsPage;
