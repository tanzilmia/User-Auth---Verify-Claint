import React, { useContext } from 'react';
import { myContext } from '../../contextApi/Authcontext';

const Home = () => {
    const {user} = useContext(myContext)
    return (
        <div>
            <h2>Home Page {user?.name} </h2>
        </div>
    );
};

export default Home;