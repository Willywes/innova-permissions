import React from 'react';
import ReactDOM from 'react-dom';

const SimpleCard = (props) =>{
    return (
        <div className="card">
            {
                props.children.header ?
                    <div className="card-header">
                        {props.children.header}
                    </div>: null
            }
            <div className="card-body">
                {props.children}
            </div>
            {
                props.children.footer ?
                    <div className="card-footer">
                        {props.children.footer}
                    </div>: null
            }
        </div>
    );
};

export default SimpleCard

if (document.getElementById('SimpleCard')) {
    ReactDOM.render(<SimpleCard/>, document.getElementById('SimpleCard'));
}
