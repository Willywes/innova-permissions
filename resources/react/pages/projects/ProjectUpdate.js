import React, {useEffect, useState} from 'react';
import * as Services from "../../Services";
import FormProject from "./components/FormProject";
import toastr from "toastr";

const ProjectUpdate = ({match}) => {

    const [data, setData] = useState({
        id: '',
        name: '',
        description: '',
        driver: 'mysql',
        host: 'localhost',
        port: '3306',
        database: '',
        username: 'root',
        password: '',
        charset: 'utf8',
        collation: 'utf8_general_ci',
        prefix: ''
    });

    const [project, setProject] = useState();

    useEffect(() => {
        if ('id' in match.params) {
            getProject(match.params.id);
        }
    }, [match])

    useEffect(() => {
        if (project) {
            setData({
                id: project.id,
                name: project.name,
                description: project.description,
                driver: project.database_connection.driver,
                host: project.database_connection.host,
                port: project.database_connection.port,
                database: project.database_connection.database,
                username: project.database_connection.username,
                password: project.database_connection.password,
                charset: project.database_connection.charset,
                collation: project.database_connection.collation,
                prefix: project.database_connection.prefix
            });
        }

    }, [project])

    const getProject = (id) => {
        Services.DoPost(Services.ENDPOINT.PROJECTS.EDIT, {
            project_id: id
        }).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProject(response.data.project)
                },
                error: () => {
                    toastr.error(response.message)
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error);
        });
    }


    return (<FormProject data={data} setData={setData} endpoint={Services.ENDPOINT.PROJECTS.UPDATE}/>);
};

export default ProjectUpdate
