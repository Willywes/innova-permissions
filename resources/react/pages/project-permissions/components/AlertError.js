import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import ROUTES from "../../../routes/routes";
import {Link} from "react-router-dom";

const AlertError = ({message, url}) => {

    return (
        <div className="row">
            <div className="col">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Error!</h4>
                    <p>Ha ocurrido un error al intentar conectar el proyecto.</p>
                    <p><em>{message}</em></p>
                    <hr/>
                    <p className="mb-0">Cambie la <Link to={url.edit}><b>configuración</b></Link> o vuelva <Link to={url.index}><b>atrás</b>.</Link></p>
                </div>
            </div>
        </div>
    );
};

export default AlertError

if (document.getElementById('AlertError')) {
    ReactDOM.render(<AlertError/>, document.getElementById('AlertError'));
}
