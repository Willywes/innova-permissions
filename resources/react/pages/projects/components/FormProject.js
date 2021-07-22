import React, {useState} from 'react';
import * as Services from "../../../Services";
import toastr from "toastr";
import ROUTES from "../../../routes/routes";
import {setCleanInputError} from "../../../helpers/GlobalUtils";
import {Link} from "react-router-dom";

const FormProject = ({data, setData, endpoint}) => {

    const [sending, setSending] = useState(false);

    const handleData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const store = () => {
        setSending(true);
        Services.DoPost(endpoint, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    toastr.success(response.message)
                    return window.location.href = ROUTES.PROJECTS.path;
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
        <div className="row">

            <div className="col-md-5 mb-4">
                <div className="card">
                    <div className="card-header">
                        Proyecto
                    </div>
                    <div className="card-body">
                        <div className="row">

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="name">Nombre del proyecto</label>
                                    <input type="name"
                                           className="form-control form-control-custom"
                                           id="name"
                                           name="name"
                                           value={data.name}
                                           onChange={handleData}
                                           onFocus={setCleanInputError}
                                    />
                                    <div className="invalid-feedback"/>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="description">Descripción del proyecto</label>
                                    <textarea
                                        className="form-control form-control-custom"
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={handleData}
                                        onFocus={setCleanInputError}
                                        style={{height: '352px'}}
                                    />
                                    <div className="invalid-feedback"/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-7 mb-4">
                <div className="card">
                    <div className="card-header">
                        Base de Datos
                    </div>
                    <div className="card-body ">

                        <div className="form-group row">
                            <label htmlFor="driver" className="col-sm-2 col-form-label">
                                Driver
                            </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control form-control-custom"
                                    id="driver"
                                    name="driver"
                                    value={data.driver}
                                    onChange={handleData}
                                    onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="host" className="col-sm-2 col-form-label">
                                Host
                            </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control form-control-custom"
                                    id="host"
                                    name="host"
                                    value={data.host}
                                    onChange={handleData}
                                    onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="port" className="col-sm-2 col-form-label">
                                Port
                            </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control form-control-custom"
                                    id="port"
                                    name="port"
                                    value={data.port}
                                    onChange={handleData}
                                    onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="database" className="col-sm-2 col-form-label">
                                Database
                            </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control form-control-custom"
                                    id="database"
                                    name="database"
                                    value={data.database}
                                    onChange={handleData}
                                    onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label">
                                Username
                            </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control form-control-custom"
                                    id="username"
                                    name="username"
                                    value={data.username}
                                    onChange={handleData}
                                    onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">
                                Password
                            </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control form-control-custom"
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleData}
                                    onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="charset" className="col-sm-2 col-form-label">
                                Charset
                            </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control form-control-custom"
                                    id="charset"
                                    name="charset"
                                    value={data.charset}
                                    onChange={handleData}
                                    onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="collation" className="col-sm-2 col-form-label">
                                Collation
                            </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control form-control-custom"
                                    id="collation"
                                    name="collation"
                                    value={data.collation}
                                    onChange={handleData}
                                    onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="prefix" className="col-sm-2 col-form-label">
                                Prefix
                            </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control form-control-custom"
                                    id="prefix"
                                    name="prefix"
                                    value={data.prefix}
                                    onChange={handleData}
                                    onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback"/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="col">
                <div className="row">
                    <div className="col">
                        <Link to={ROUTES.PROJECTS.path} className="btn btn-outline-secondary">
                            <i className="fas fa-arrow-left"/> Cancelar
                        </Link>
                    </div>
                    <div className="col text-right">
                        <button className="btn btn-primary" onClick={store} disabled={sending}>
                            <i className="fa fa-save"/> Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormProject
