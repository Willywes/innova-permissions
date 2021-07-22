import React, {Fragment, useEffect, useState} from 'react';
import * as Services from "../../Services";
import toastr from "toastr";
import Resume from "./components/Resume";
import AlertError from "./components/AlertError";
import ROUTES from "../../routes/routes";
import Spinner from "../../components/Spinner";

const ProjectPermissions = ({match}) => {

    const [hasError, setHasError] = useState(false);
    const [hasErrorMessage, setHasErrorMessage] = useState('');
    const [project, setProject] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [permissionsCount, setPermissionsCount] = useState(0);
    const [permissionsGroups, setPermissionsGroups] = useState([]);

    const [url, setUrl] = useState({
        edit: '',
        index: ''
    });


    useEffect(() => {
        if ('id' in match.params) {
            getPermission(match.params.id);
            setUrl({
                index: ROUTES.PROJECTS.path,
                edit: ROUTES.PROJECT_EDIT.path.replace(':id', match.params.id)
            });
        }
    }, [match])

    const getPermission = (id) => {
        Services.DoPost(Services.ENDPOINT.PERMISSIONS.INDEX, {
            project_id: id
        }).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProject(response.data.project)
                    setPermissions(response.data.permissions)
                    setPermissionsCount(response.data.permissions_count)
                    setPermissionsGroups(response.data.permissions_groups)
                },
                warning: () => {
                    toastr.warning(response.message)
                },
                error: () => {
                    setHasError(true)
                    setHasErrorMessage(response.message)
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error);
        });
    }

    return (
        <Fragment>

            {
                hasError ?
                    <AlertError message={hasErrorMessage} url={url}/>
                    :

                    project ?
                        <Fragment>

                            <Resume
                                project={project}
                                permissionsCount={permissionsCount}
                                permissionsGroups={permissionsGroups}
                            />

                        </Fragment>
                        :
                        <Spinner/>

            }

        </Fragment>
    );
};

export default ProjectPermissions
