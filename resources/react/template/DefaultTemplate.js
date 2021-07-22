import React from 'react';
import {withRouter} from "react-router-dom";
import Navbar from "./Navbar";

const DefaultTemplate = (props) => {

    return (
        <div>
            <div className="header">

            </div>
            <div className="container mb-5" style={{ marginTop : '-70px'}}>
                {
                    props.children
                }
            </div>
        </div>
    );
};

export default withRouter(DefaultTemplate);
