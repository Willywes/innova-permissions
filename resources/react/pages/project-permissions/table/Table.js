import React, {Fragment, useEffect, useState} from 'react';
import DefaultTable from "../../../components/DefaultTable";
import * as Services from "../../../Services";
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import {Link} from "react-router-dom";
import toastr from "toastr";
import moment from "moment";
import SimpleCard from "../../../components/SimpleCard";
import ModalCreate from "../components/modal-create/ModalCreate";
import SweetAlert from "sweetalert2";

const Table = ({project, permissions, permissionsGroups, getPermissions}) => {

    const [tableLoaded, setTableLoaded] = useState(true);
    const [localPermissions, setLocalPermissions] = useState([]);
    const [groupSelected, setGroupSelected] = useState('all')

    const [showCreate, setShowCreate] = useState(false);

    const handleClose = () => setShowCreate(false);
    const handleShow = () => setShowCreate(true);

    useEffect(() => {
        filterPermissions();
    }, [permissions, groupSelected])

    const filterPermissions = () => {
        if (groupSelected === 'all') {
            setLocalPermissions(permissions)
        } else {
            const list = permissions.filter(f => f.public_group === groupSelected);
            setLocalPermissions(list);
        }
    }

    const columns = [
        {
            text: 'Id',
            dataField: 'id',
            sort: true,
            classes: 'nowrap-cell',
            headerClasses: 'nowrap-cell',
        },
        {
            text: 'Nombre (Route, Name Permission)',
            dataField: 'name',
            sort: true,
            classes: 'nowrap-cell',
            headerClasses: 'nowrap-cell',
            editable: true,
            formatter: (cell, row) => {
                return <span className="">{cell}</span>;
            },
            editor: {
                type: Type.TEXT,
            }
        },
        {
            text: 'Grupo',
            dataField: 'public_group',
            sort: true,
            classes: 'nowrap-cell',
            headerClasses: 'nowrap-cell',
            editable: true,
            formatter: (cell, row) => {
                return <span className="">{cell}</span>;
            },
            editor: {
                type: Type.TEXT,
            }
        },
        {
            text: 'Nombre Público',
            dataField: 'public_name',
            sort: true,
            classes: 'nowrap-cell',
            headerClasses: 'nowrap-cell',
            editable: true,
            formatter: (cell, row) => {
                return <span className="">{cell}</span>;
            },
            editor: {
                type: Type.TEXT,
            }
        },
        {
            text: 'Descripción Pública',
            dataField: 'public_description',
            sort: true,
            classes: 'nowrap-cell',
            headerClasses: 'nowrap-cell',
            editable: true,
            formatter: (cell, row) => {
                return <span className="">{cell}</span>;
            },
            editor: {
                type: Type.TEXT,
            }
        },
        {
            text: 'Guard',
            dataField: 'guard_name',
            sort: true,
            classes: 'nowrap-cell',
            headerClasses: 'nowrap-cell',
            editable: true,
            formatter: (cell, row) => {
                return <span className="">{cell}</span>;
            },
            editor: {
                type: Type.TEXT,
            }
        },
        {
            text: '',
            dataField: 'edit',
            sort: false,
            classes: 'nowrap-cell nowrap-cell-no-min',
            headerClasses: 'nowrap-cell nowrap-cell-no-min',
            formatter: (cell, row) => {
                return  <div onClick={() => destroy(row.id, row.name)}
                             className="text-danger pointer mx-1" title="Eliminar">
                    <i className="fa fa-trash"/>
                </div>
            }
        },
    ];

    const handleTableChange = (type, {data, cellEdit: {rowId, dataField, newValue}}) => {
        Services.DoPost(Services.ENDPOINT.PERMISSIONS.CELL_EDIT, {
            project_id: project.id,
            id: rowId,
            [dataField]: newValue
        }).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    toastr.success(response.message)
                    getPermissions(project.id)
                },
                warning: () => {
                    toastr.warning(response.message)
                },
                error: () => {
                    toastr.error(response.message)
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error);
        });
    }

    const destroy = (id, name = 'este registro') => {

        SweetAlert.fire({
            title: '¿Estas seguro?',
            html: 'Si eliminas <b>' + name + '</b>, la información será irrecuperable. considera que puedes perder la relación de los roles de los usuarios activos.',
            icon: 'warning',
            imageSize: '120x120',
            showCancelButton: true,
            confirmButtonColor: '#92c755',
            cancelButtonColor: '#f22314 ',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: false,

        }).then((result) => {
            if (result.value) {
                Services.DoPost(Services.ENDPOINT.PERMISSIONS.DESTROY, {
                    project_id: project.id,
                    id: id,
                }).then(response => {
                    Services.Response({
                        response: response,
                        success: () => {
                            toastr.success(response.message)
                            getPermissions(project.id)
                        },
                        warning: () => {
                            toastr.warning(response.message)
                        },
                        error: () => {
                            toastr.error(response.message)
                        },
                    });
                }).catch(error => {
                    Services.ErrorCatch(error);
                });
            }
        })
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12">
                    <SimpleCard>
                        <div className="row">

                            <div className="col-12 mb-3">
                                <div className="row g-2">
                                    <div className="col-auto">
                                        <button className="btn btn-success btn-sm" onClick={handleShow}>
                                            <i className="fas fa-plus"/> Nuevo
                                        </button>
                                    </div>
                                    <div className="col-auto">
                                        <select
                                            className="form-control form-control-sm"
                                            onChange={e => setGroupSelected(e.target.value)}
                                        >
                                            <option value="all">Todos</option>
                                            {
                                                permissionsGroups.map((p, i) => (
                                                    <option key={i} value={p}>{p}</option>))
                                            }
                                        </select>
                                    </div>
                                    <div className="col-auto ml-auto">
                                        <button className="btn btn-primary btn-sm">
                                            <i className="fas fa-download"/> JSON
                                        </button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-primary btn-sm">
                                            <i className="fas fa-download"/> Seeder
                                        </button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-primary btn-sm">
                                            <i className="fas fa-download"/> SQL Script
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">

                                <DefaultTable columns={columns}
                                              objects={localPermissions}
                                              tableLoaded={tableLoaded}
                                              pagination={false}
                                              order={true}
                                              cellEdit={cellEditFactory({
                                                  mode: 'dbclick',
                                                  blurToSave: true,
                                                  // beforeSaveCell: saveCell
                                              })}
                                              onTableChange={handleTableChange}
                                />
                            </div>
                        </div>
                    </SimpleCard>
                </div>
            </div>
            <ModalCreate
                projectId={project.id}
                show={showCreate}
                handleClose={handleClose}
                permissions={permissions}
                permissionsGroups={permissionsGroups}
                getPermissions={() => getPermissions(project.id)}
            />
        </Fragment>
    );
};

export default Table
