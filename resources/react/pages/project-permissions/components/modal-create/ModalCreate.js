import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import Groups from "./Groups";
import Custom from "./Custom";

const ModalCreate = ({projectId, show, handleClose, permissions, permissionsGroups, getPermissions}) => {

    const [section, setSection] = useState('init');

    const closeModal = () =>{
        setSection('init');
        handleClose()
    }

    return (
        <Modal show={show} onHide={closeModal} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Nuevos Permisos</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {
                    section == 'init' ?
                        <div className="row ">
                            <div className="col-12">
                                <div className="alert alert-info">
                                    <p>Seleccione si desea crear un grupo de permiso o añadir uno a un grupo
                                        existente.</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row py-4">
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
                                </div>
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
                        handleClose={closeModal}

                    /> : null
                }

                {
                    section == 'custom' ? <Custom
                        projectId={projectId}
                        section={section}
                        setSection={setSection}
                        permissions={permissions}
                        permissionsGroups={permissionsGroups}
                        getPermissions={getPermissions}
                        handleClose={closeModal}
                    /> : null
                }

            </Modal.Body>
        </Modal>
    );
};

export default ModalCreate
