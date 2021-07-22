import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import * as Services from "../../Services";
import CardProject from "./components/CardProject";
import ROUTES from "../../routes/routes";
import {Link} from "react-router-dom";
import SweetAlert from "sweetalert2";
import toastr from "toastr";

const Projects = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = () => {
        Services.DoGet(Services.ENDPOINT.PROJECTS.INDEX, {}).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProjects(response.data.projects)
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error);
        });
    }

    const destroy = (id, name = 'este registro') => {

        SweetAlert.fire({
            title: '¿Estas seguro?',
            html: 'Si eliminas <b>' + name + '</b>, esto no afectará a los permisos del proyecto.',
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
                Services.DoPost(Services.ENDPOINT.PROJECTS.DESTROY, {
                    project_id: id,
                }).then(response => {
                    Services.Response({
                        response: response,
                        success: () => {
                            toastr.success(response.message)
                            getProjects()
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
        <div className="row">

            <div className="col-md-4">
                <Link to={ROUTES.PROJECT_CREATE.path}>
                    <div className="card card-project mb-4" style={{height: '147px'}}>
                        <div className="card-body d-flex">
                            <div className="m-auto text-success font-40">
                                <i className="fas fa-plus-circle"/>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {
                projects.map(project => <div key={project.id} className="col-md-4"><CardProject project={project} destroy={destroy}/></div>)
            }
        </div>
    );
};

export default Projects
