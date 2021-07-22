import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import ROUTES from "./routes/routes";

const renderRoute = (route, index) => {

    const Middleware = route.middleware;

    return <Middleware
        key={index}
        layout={route.layout}
        path={route.path}
        component={route.component}
        title={route.title}
        exact={route.exact}
    />
}

const RunApp = () =>{
    return (
        <Router>
            <Switch>
                {

                    Object.keys(ROUTES).map((key, index) => (renderRoute(ROUTES[key], index)))

                }
                {/*<Route component={Page404}/>*/}
            </Switch>
        </Router>
    );
};

export default RunApp

if (document.getElementById('app')) {
    ReactDOM.render(<RunApp/>, document.getElementById('app'));
}
