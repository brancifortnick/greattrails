import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';  





const FunPage = () => {


    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const trails = useSelector(state => Object.values(state.trails));
    const collections = useSelector(state => Object.values(state.collections));
    

    return (

        <div className='container-outter'>
            <div className='container-inner'>
                <h1>Fun Page</h1>
            </div>
        
        
        </div>
    )

}

export default FunPage;