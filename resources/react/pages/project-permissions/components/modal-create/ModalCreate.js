import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import Groups from "./Groups";
import Custom from "./Custom";

const ModalCreate = ({projectId, show, handleClose, permissionsGroups, getPermissions}) => {

    const [section, setSection] = useState('init');

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Nuevos Permisos</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {
                    section == 'init' ?
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-info">
                                    <p>Seleccione si desea crear un grupo de permiso o añadir uno a un grupo
                                        existente.</p>
                                </div>
                            </div>
                            <div className="col-6 text-right">
                                <button className="btn btn-outline-success" onClick={() => setSection('groups')}>
                                    <span className="font-14">Nuevo Grupo</span>
                                </button>
                            </div>
                            <div className="col-6">
                                <button className="btn btn-outline-success" onClick={() => setSection('custom')}>
                                    <span className="font-14">Añadir a Grupo</span>
                                </button>
                            </div>
                        </div> : null
                }

                {
                    section == 'groups' ? <Groups
                        projectId={projectId}
                        section={section}
                        setSection={setSection}
                        permissionsGroups={permissionsGroups}
                        getPermissions={getPermissions}
                        handleClose={handleClose}

                    /> : null
                }

                {
                    section == 'custom' ? <Custom /> : null
                }

            </Modal.Body>
        </Modal>
    );
};

export default ModalCreate
