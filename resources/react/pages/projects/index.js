import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import * as Services from "../../Services";
import CardProject from "./components/CardProject";
import ROUTES from "../../routes/routes";
import {Link} from "react-router-dom";

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
                projects.map(project => <div key={project.id} className="col-md-4"><CardProject project={project}/></div>)
            }
        </div>
    );
};

export default Projects
