import React, {Fragment, useState} from 'react';
import {setCleanInputError, setInputError, slug} from "../../../../helpers/GlobalUtils";
import FooterActions from "./FooterButtons";
import {processPublicDescription, processPublicName} from "./Helper";
import * as Services from "../../../../Services";
import toastr from "toastr";

const Custom = ({projectId, section, setSection, handleClose, permissions, permissionsGroups, getPermissions}) => {

    const [sending, setSending] = useState(false);

    const [localData, setLocalData] = useState({
        base_name: 'intranet',
        group: '',
        guard: 'intranet',
        verb : '',
        public_name : '',
        public_description : '',
    });


    const handleLocalData = (e) => {

        if (e.target.name == 'group') {
            setLocalData({
                base_name: 'intranet.' + slug(e.target.value),
                group: e.target.value,
                guard: 'intranet',
                verb : '',
                public_name : '',
                public_description : '',
            })
        } else if (e.target.name == 'verb') {
            setLocalData({
                ...localData,
                [e.target.name]: e.target.value,
                ['base_name']: 'intranet.' + slug(localData.group) + '.' + e.target.value,
                ['public_name'] : '(' +  (e.target.value).toUpperCase()  + ') ' + (localData.group).toLowerCase(),
                ['public_description'] : 'Permite (' +  (e.target.value).toUpperCase()  + ') ' + (localData.group).toLowerCase(),
            });
        }else {
            setLocalData({
                ...localData,
                [e.target.name]: e.target.value
            });
        }

    }

    const store = () => {
        if (validate()) {
            setSending(true);

            let data = [];
            data.push({
                name: `${localData.base_name}`,
                guard_name: localData.guard,
                public_name: localData.public_name,
                public_group: localData.group,
                public_description: localData.public_description,
            })

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

        if (!localData.group) {
            setInputError('group', 'Ingrese un grupo.')
            errors = true;
        }

        const filtered = permissions.filter(p => p.public_group == localData.group);
        filtered.map(f => {
            if (f.name.includes(localData.verb)) {
                setInputError('verb', 'Este permiso ya existe en el registro.')
                errors = true;
            }
        })

        if (!localData.verb) {
            setInputError('verb', 'Ingrese un nombre para el permiso.')
            errors = true;
        }


        if (!localData.base_name) {
            setInputError('base_name', 'Ingrese un nombre base.')
            errors = true;
        }

        if (!localData.public_name) {
            setInputError('public_name', 'Ingrese un nombre público.')
            errors = true;
        }

        if (!localData.public_description) {
            setInputError('public_description', 'Ingrese una descripción pública.')
            errors = true;
        }

        if (!localData.guard) {
            setInputError('guard', 'Ingrese un guard.')
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
                            <select
                                className="form-control form-control-custom"
                                id="group"
                                name="group"
                                value={localData.group}
                                onChange={handleLocalData}
                                onFocus={setCleanInputError}
                            >
                                <option value="" selected disabled>Seleccione un grupo</option>
                                {
                                    permissionsGroups.map((p, i) => (<option key={i} value={p}>{p}</option>))
                                }
                            </select>
                            <div className="invalid-feedback"/>
                            <div className="text-muted font-12">Ej: Usuarios, Roles, Clientes (Plural)</div>
                        </div>
                    </div>

                    {
                        localData.group != '' ?
                            <div className="form-group row">
                                <label htmlFor="verb" className="col-sm-4 col-form-label">
                                    Nombre del Permiso
                                </label>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        className="form-control form-control-custom"
                                        id="verb"
                                        name="verb"
                                        value={localData.verb}
                                        onChange={handleLocalData}
                                        onFocus={setCleanInputError}
                                    />
                                    <div className="invalid-feedback"/>
                                    <div className="text-muted font-12">Ej: exportData, permissionsEdit (Nombre del permiso o función del controlador)
                                    </div>
                                </div>
                            </div>: null
                    }

                    {
                        localData.group != '' && localData.verb ?
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
                            </div>: null
                    }

                    {
                        localData.group != '' && localData.verb ?
                            <div className="form-group row">
                                <label htmlFor="public_name" className="col-sm-4 col-form-label">
                                    Nombre público del permiso
                                </label>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        className="form-control form-control-custom"
                                        id="public_name"
                                        name="public_name"
                                        value={localData.public_name}
                                        onChange={handleLocalData}
                                        onFocus={setCleanInputError}
                                    />
                                    <div className="invalid-feedback"/>
                                    <div className="text-muted font-12">Identifica el nombre del permiso en el sistema de roles.</div>
                                </div>
                            </div>: null
                    }

                    {
                        localData.group != '' && localData.verb ?
                            <div className="form-group row">
                                <label htmlFor="public_description" className="col-sm-4 col-form-label">
                                    Descripción público del permiso
                                </label>
                                <div className="col-md-8">
                                    <textarea
                                        className="form-control form-control-custom"
                                        id="public_description"
                                        name="public_description"
                                        value={localData.public_description}
                                        onChange={handleLocalData}
                                        onFocus={setCleanInputError}
                                    />
                                    <div className="invalid-feedback"/>
                                    <div className="text-muted font-12">Identifica la descripción del permiso en el sistema de roles.</div>
                                </div>
                            </div>: null
                    }
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

export default Custom
