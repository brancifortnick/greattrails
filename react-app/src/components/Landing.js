import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './Landing.css';

import trailVideo from '../assets/find-trails.mp4';
const Landing = () => {
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    
    const handleExplore = () => {
        history.push('/trails');
    };

    const handleBrowseStates = () => {
        history.push('/states');
    };
    
    return (
        <div className="landing-container">
            {trailVideo ? (
                <video className="landing-video" src={trailVideo} type="video/mp4" autoPlay loop muted playsInline/>
            ) : (
                <p>Your browser does not support the video tag</p>
            )}
       
            
            <div className="landing-overlay">
                <div className="landing-content">
                    <h1 className="landing-title">Discover Your Next Adventure</h1>
                    <p className="landing-subtitle">
                        Explore hiking trails across all 50 states
                    </p>
                    
                    <div className="landing-buttons">
                        <button className="btn-primary" onClick={handleExplore}>
                            Explore All Trails
                        </button>
                        <button className="btn-secondary" onClick={handleBrowseStates}>
                            Browse by State
                        </button>
                    </div>
                    
                    {user && (
                        <div className="landing-welcome">
                            <p>Welcome back, {user.username}!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Landing;