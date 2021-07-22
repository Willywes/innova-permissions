import React, {useEffect, useState} from 'react';
import DefaultTable from "../../../components/DefaultTable";
import * as Services from "../../../Services";
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import {Link} from "react-router-dom";
import toastr from "toastr";
import moment from "moment";
import SimpleCard from "../../../components/SimpleCard";

const Table = ({project, permissions, permissionsGroups, getPermissions}) => {

    const [tableLoaded, setTableLoaded] = useState(true);
    const [localPermissions, setLocalPermissions] = useState([]);

    useEffect(() => {
        filterPermissions();
    }, [permissions])

    const filterPermissions = (group = 'all') => {
        if (group === 'all') {
            setLocalPermissions(permissions)
        } else {
            const list = permissions.filter(f => f.public_group == group);
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
            text: 'Laravel Guard',
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
        })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    }

    return (
        <div className="row">
            <div className="col-12">
                <SimpleCard>
                    <div className="row">

                        <div className="col-12 mb-3">
                            <div className="row g-2">
                                <div className="col-auto">
                                    <button className="btn btn-success btn-sm">
                                        <i className="fas fa-plus"/> Nuevo
                                    </button>
                                </div>
                                <div className="col-auto">
                                    <select
                                        className="form-control form-control-sm"
                                        onChange={e => filterPermissions(e.target.value)}
                                    >
                                        <option value="all">Todos</option>
                                        {
                                            permissionsGroups.map((p, i) => (<option key={i} value={p}>{p}</option>))
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
    );
};

export default Table
