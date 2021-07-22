import React from 'react';
import {withRouter} from "react-router-dom";

const DefaultTemplate = (props) => {

    return (
        <div>
            <div className="container py-5">
                {
                    props.children
                }
            </div>
        </div>
    );
};

export default withRouter(DefaultTemplate);
