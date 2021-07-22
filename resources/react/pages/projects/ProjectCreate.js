import React, {useState} from 'react';
import * as Services from "../../Services";
import FormProject from "./components/FormProject";

const ProjectCreate = () => {

    const [data, setData] = useState({
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
    })

    return (<FormProject data={data} setData={setData} endpoint={Services.ENDPOINT.PROJECTS.STORE} />);
};

export default ProjectCreate
