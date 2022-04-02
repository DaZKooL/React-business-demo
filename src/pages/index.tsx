import React from 'react';
import Home from './home/home';
import User from './user';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Page404 from './Page404';


const Webpages = () => {
    return(
        <Router>
            <Routes>
                <Route index element= {<Home/>} />
                <Route path = "/user/:id" element = {<User/>} />
                <Route path="*" element= {<Page404/>} />

            </Routes>
        </Router>
    );
};
export default Webpages;