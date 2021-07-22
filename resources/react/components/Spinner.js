import React from 'react';
import ReactDOM from 'react-dom';

const Spinner = () =>{
    return (
        <div className="row">
            <div className="col d-flex" style={{height : '120px'}}>
                <div className="m-auto">
                    <div className="spinner-border text-primary" role="status">
                        {/*<span className="visually-hidden">Loading...</span>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Spinner
