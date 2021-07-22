import React, {useState} from 'react';
import DefaultTable from "../../../components/DefaultTable";
import * as Services from "../../../Services";
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import {Link} from "react-router-dom";
import toastr from "toastr";
import moment from "moment";

const Table = ({project, permissions, getPermissions}) => {

    const [tableLoaded, setTableLoaded] = useState(true);

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
            editor : {
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
            editor : {
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
            editor : {
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
            editor : {
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
            editor : {
                type: Type.TEXT,
            }
        },
    ];

    const handleTableChange = (type, {data, cellEdit: {rowId, dataField, newValue}}) => {
        Services.DoPost(Services.ENDPOINT.PERMISSIONS.CELL_EDIT,{project_id : project.id, id: rowId, [dataField]: newValue}).then(response => {
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
                <DefaultTable columns={columns}
                              objects={permissions}
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
    );
};

export default Table
