import PublicMiddleware from "./middleware/PublicMiddleware";
import DefaultTemplate from "../template/DefaultTemplate";
import Projects from "../pages/projects";
import ProjectCreate from "../pages/projects/ProjectCreate";
import ProjectUpdate from "../pages/projects/ProjectUpdate";
import ProjectPermissions from "../pages/project-permissions";

const ROUTES = {

    PROJECTS: {
        path: "/",
        title: "Proyectos",
        component: Projects,
        exact: true,
        layout: props => <DefaultTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },
    PROJECT_CREATE: {
        path: "/projects/create",
        title: "Crear Proyecto",
        component : ProjectCreate,
        exact: true,
        layout: props => <DefaultTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },
    PROJECT_EDIT: {
        path: "/projects/edit/:id",
        title: "Editar Proyecto",
        component : ProjectUpdate,
        exact: true,
        layout: props => <DefaultTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },
    PROJECT_PERMISSIONS: {
        path: "/projects/permissions/:id",
        title: "Editar Proyecto",
        component : ProjectPermissions,
        exact: true,
        layout: props => <DefaultTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },
}

export default ROUTES;
