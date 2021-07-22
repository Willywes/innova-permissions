import React, {Fragment, useState} from 'react';
import {setCleanInputError, setInputError, slug} from "../../../../helpers/GlobalUtils";
import {Form} from "react-bootstrap";
import * as Services from "../../../../Services";
import toastr from "toastr";
import FooterActions from "./FooterButtons";
import {processPublicDescription, processPublicName} from "./Helper";

const Groups = ({projectId, section, setSection, handleClose, permissionsGroups, getPermissions}) => {
    const [sending, setSending] = useState(false);
    const [localData, setLocalData] = useState({
        base_name: 'intranet',
        group: '',
        guard: 'intranet',
        verbs: {
            index: true,
            create: true,
            edit: true,
            show: true,
            destroy: true,
            active: true,
            changeStatus: true,
        }
    });


    const handleLocalData = (e) => {

        if (e.target.name == 'group') {
            setLocalData({
                ...localData,
                [e.target.name]: e.target.value,
                ['base_name']: 'intranet.' + slug(e.target.value)
            });
        } else {
            setLocalData({
                ...localData,
                [e.target.name]: e.target.value
            });
        }

    }

    const handleVerbs = (e, key) => {
        const verbs = {...localData.verbs, [e.target.name]: !localData.verbs[key]};
        setLocalData({
            ...localData,
            verbs: verbs
        });
    }

    const store = () => {
        if (validate()) {
            setSending(true);

            let data = [];
            Object.keys(localData.verbs).map((verb, i) => {
                data.push({
                    name: `${localData.base_name}.${verb}`,
                    guard_name: localData.guard,
                    public_name: processPublicName(verb, localData.group),
                    public_group: localData.group,
                    public_description: processPublicDescription(verb, localData.group),
                })
            });

            Services.DoPost(Services.ENDPOINT.PERMISSIONS.STORE, {project_id: projectId, data: data}).then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        toastr.success(response.message)
                        getPermissions()
                        handleClose()
                    },
                    error: () => {
                        toastr.error(response.message)
                        setSending(false);
                    },
                });

            }).catch(error => {
                setSending(false);
                Services.ErrorCatch(error);
            });
        }
    }

    const validate = () => {

        let errors = false;

        if (!localData.base_name) {
            setInputError('base_name', 'Ingrese un nombre base.')
            errors = true;
        }

        if (permissionsGroups.includes(localData.group)) {
            setInputError('group', 'Este grupo ya existe.')
            errors = true;
        }

        if (!localData.group) {
            setInputError('group', 'Ingrese un grupo.')
            errors = true;
        }

        if (!localData.guard) {
            setInputError('guard', 'Ingrese un guard.')
            errors = true;
        }

        let keys = 0;
        Object.keys(localData.verbs).map((verb, i) => {
            if (localData.verbs[verb]) {
                keys = keys + 1
            }
        });

        if (keys == 0) {
            setInputError('verbs', 'Seleccione al menos un verbo.')
            errors = true;
        }

        return !errors;
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col">

                    <div className="form-group row">
                        <label htmlFor="group" className="col-sm-4 col-form-label">
                            Nombre Grupo
                        </label>
                        <div className="col-md-8">
                            <input
                                type="text"
                                className="form-control form-control-custom"
                                id="group"
                                name="group"
                                value={localData.group}
                                onChange={handleLocalData}
                                onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback"/>
                            <div className="text-muted font-12">Ej: Usuarios, Roles, Clientes (Plural)</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="base_name" className="col-sm-4 col-form-label">
                            Base Permisos
                        </label>
                        <div className="col-md-8">
                            <input
                                type="text"
                                className="form-control form-control-custom"
                                id="base_name"
                                name="base_name"
                                value={localData.base_name}
                                onChange={handleLocalData}
                                onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback"/>
                            <div className="text-muted font-12">Ej: intranet.users, intranet.roles,
                                intranet.config.product-types (sin punto final)
                            </div>
                        </div>
                    </div>


                    <div className="form-group row">
                        <label htmlFor="guard" className="col-sm-4 col-form-label">
                            Guard Laravel
                        </label>
                        <div className="col-md-8">
                            <select
                                className="form-control form-control-custom"
                                id="guard"
                                name="guard"
                                value={localData.guard}
                                onChange={handleLocalData}
                                onFocus={setCleanInputError}
                            >
                                <option value="intranet">intranet</option>
                                <option value="customer">customer</option>
                            </select>
                            <div className="invalid-feedback"/>
                            <div className="text-muted font-12">Corresponde a los guard del auth de laravel</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="guard" className="col-sm-4 col-form-label">
                            Laravel Verbs
                        </label>
                        <div className="col-md-8">
                            <div className="row">
                                {
                                    Object.keys(localData.verbs).map((verb, i) => {
                                        return <div key={i} className="col-12">
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox"
                                                       className="custom-control-input"
                                                       id={verb}
                                                       name={verb}
                                                       checked={localData.verbs[verb]}
                                                       onChange={(e) => handleVerbs(e, verb)}/>
                                                <label className="custom-control-label font-12 lh-23 light"
                                                       htmlFor={verb}>
                                                    {verb}
                                                </label>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div>
                                <input type="hidden" id="verbs"/>
                                <div className="invalid-feedback"/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <FooterActions
                store={store}
                section={section}
                setSection={setSection}
                sending={sending}
                handleClose={handleClose}
            />
        </Fragment>
    );

};

export default Groups
