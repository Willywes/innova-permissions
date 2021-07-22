import React, {Fragment, useEffect} from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import NoRecords from "./NoRecords";
import Spinner from "./Spinner";

const DefaultTable = ({columns, objects, tableLoaded, pagination = true, order = false, cellEdit = null, onTableChange = null}) => {

    useEffect(() => {
        if (order) {
            objects.sort((a, b) => (a.name > b.name) ? 1 : -1)
        }
    }, [objects])

    return (
        tableLoaded ?
            <Fragment>
                {
                    objects.length === 0 ?
                        <NoRecords/>
                        :
                        <div className="table-responsive">
                            <BootstrapTable
                                remote={ { cellEdit: true } }
                                bootstrap4
                                keyField="id"
                                data={objects}
                                columns={columns}
                                pagination={pagination ? paginationFactory() : null}
                                filter={filterFactory()}
                                cellEdit={ cellEdit ? cellEdit : () =>{} }
                                onTableChange={onTableChange ? onTableChange: () =>{}}
                                bordered={true}
                                // striped
                                hover={true}
                                classes="table-striped align-middle table-nowrap table-check"
                                headerClasses="table-header-45"
                                // headerWrapperClasses="table-light"
                            />
                        </div>

                }
            </Fragment>
            :
            <Spinner/>
    )

};

export default DefaultTable;
