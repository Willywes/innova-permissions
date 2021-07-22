import React from 'react';

const Navbar = () =>{
    return (
        <nav className="navbar fixed-top navbar-light bg-transparent">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Projectos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex="-1"
                                   aria-disabled="true">Roles</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar
