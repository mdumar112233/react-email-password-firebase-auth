import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <ul>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/createAccount'>Create Account</Link></li>
                <li><Link to='/login'>login</Link></li>
                <li><Link to='/inventory'>Inventory</Link></li>
            </ul>
        </div>
    );
};

export default Header;