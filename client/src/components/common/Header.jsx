import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
    return (
        <nav>
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        {" | "}
        <Link to="/about" activeClassName="active">About</Link>
        {" | "}
        <Link to="/signup" activeClassName="active">Signup</Link>
        {" | "}
        <Link to="/checkin" activeClassName="active">Check-in</Link>
        </nav>
    );
};

export default Header;