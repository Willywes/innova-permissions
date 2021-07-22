import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ROUTES from "../../../routes/routes";

const CardProject = ({project, destroy}) => {

    const [url, setUrl] = useState({
        edit: '',
        permissions: ''
    });

    useEffect(() => {
        setUrl({
            edit: ROUTES.PROJECT_EDIT.path.replace(':id', project.id),
            permissions: ROUTES.PROJECT_PERMISSIONS.path.replace(':id', project.id)
        });
    }, [project])

    return (
        <div className="card card-project mb-4">
            <div className="card-body d-flex">
                <div className="m-auto card-project-name text-primary">
                    <div className="row">
                        <div className="col-md-12">
                            {project.name}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer bg-white">
                <div className="row">
                    <div className="col">
                        <Link to={url.permissions} className="btn btn-outline-primary btn-sm">
                            Gestionar Permisos
                        </Link>
                    </div>
                    <div className="col-auto px-1 text-right">
                        <Link to={url.edit} className="btn btn-outline-warning btn-sm">
                            <i className="fa fa-edit"/>
                        </Link>
                    </div>
                    <div className="col-auto pl-1 text-right">
                        <button onClick={() => destroy(project.id, project.name)}
                                className="btn btn-outline-danger btn-sm">
                            <i className="fa fa-trash"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProject
