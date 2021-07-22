import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import Groups from "./Groups";
import * as Services from "../../../../Services";
import toastr from "toastr";
import Custom from "./Custom";

const ModalCreate = ({show, handleClose, permissionsGroups, getPermissions}) => {

    const [section, setSection] = useState('init');
    const [sending, setSending] = useState(false);
    const [data, setData] = useState([])

    const store = () => {
        setSending(true);
        Services.DoPost(Services.ENDPOINT.PERMISSIONS.STORE, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    toastr.success(response.message)
                    getPermissions()
                    setData([])
                    handleClose()
                },
                warning: () => {
                    toastr.warning(response.message)
                },
                error: () => {
                    toastr.error(response.message)
                },
            });
            setSending(false);
        }).catch(error => {
            Services.ErrorCatch(error);
            setSending(false);
        });
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Nuevo Permiso</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {
                    section == 'init' ?
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-info">
                                    <p>Seleccione si desea crear un grupo de permiso o añadir uno a un grupo existente.</p>
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
                        </div>: null
                }

                {
                    section == 'groups' ? <Groups data={data} setData={setData} permissionsGroups={permissionsGroups} /> : null
                }

                {
                    section == 'custom' ? <Custom data={data} setData={setData} permissionsGroups={permissionsGroups} /> : null
                }


            </Modal.Body>
            <Modal.Footer className="justify-content-start d-block">
                <div className="row">
                    <div className="col px-0">
                        {
                            section == 'init' ?
                                <button onClick={handleClose} className="btn btn-outline-secondary btn-sm">
                                    <i className="fas fa-times"/> Cancelar
                                </button>
                                :
                                <button onClick={() => setSection('init')} className="btn btn-outline-secondary btn-sm">
                                    <i className="fas fa-arrow-left"/> Atrás
                                </button>

                        }
                    </div>
                    <div className="col px-0 text-right">
                        {
                            section != 'init' ?
                                <button className="btn btn-primary btn-sm" onClick={store} disabled={sending}>
                                    <i className="fa fa-save"/> Guardar
                                </button>
                                :
                               null

                        }
                    </div>
                </div>

            </Modal.Footer>
        </Modal>
    );
};

export default ModalCreate
