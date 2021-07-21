import React from 'react';
import ReactDOM from 'react-dom';

const RunApp = () =>{
    return (
        <>
            Hello RunApp!
        </>
    );
};

export default RunApp

if (document.getElementById('app')) {
    ReactDOM.render(<RunApp/>, document.getElementById('app'));
}
