import React, {Fragment, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import SimpleCard from "../../../components/SimpleCard";
import {Link} from "react-router-dom";
import ROUTES from "../../../routes/routes";

const Resume = ({project, permissionsCount, permissionsGroups, getPermissions}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    if (!project) return null;

    return (
        <Fragment>
            <div className="row mb-3">
                <div className="col-12">
                    <SimpleCard>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Proyecto</th>
                                <th>Database</th>
                                <th>Cant. Permisos</th>
                                <th>Cant. Grupos</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{project.name}</td>
                                <td>{project.database_connection.database}</td>
                                <td className="text-right">{permissionsCount}</td>
                                <td className="text-right"><div className="btn-link pointer" onClick={handleShow}>{permissionsGroups.length}</div></td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col text-right">
                                <Link to={ROUTES.PROJECTS.path} className="btn btn-outline-secondary btn-sm">
                                    <i className="fas fa-arrow-left"/> Volver a proyectos
                                </Link>
                            </div>
                        </div>
                    </SimpleCard>
                </div>

            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Grupos Registrados</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                   <div style={{
                       height : '400px',
                       overflowY : 'scroll'
                   }}>
                       <ul className="list-group">
                           {
                               permissionsGroups.map((p,i) => (<li className="list-group-item">{p}</li>))
                           }
                       </ul>
                   </div>

                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                    <button onClick={handleClose} className="btn btn-outline-secondary btn-sm">
                        <i className="fas fa-times"/> Cerrar
                    </button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default Resume
