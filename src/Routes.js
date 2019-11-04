import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import registerPage from "./pages/RegisterPage";
import adminDashboard from "./components/admin/dashboard/dashboard";
import adminAgents from "./components/admin/agent/agentLists";
import templateBuilder from "./pages/TemplateBuilderPage";

class Routes extends React.Component{
    render() {
        return (
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/about-us" component={AboutPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={registerPage} />
                <Route exact path="/admin/dashboard" component={adminDashboard} />
                <Route exact path="/admin/agents" component={adminAgents} />
                <Route exact path="/form-builder" component={templateBuilder} />
                
                <Route
                    render={function () {
                        return <h1>Not Found</h1>;
                    }}
                />
            </Switch>
        )
    };
}

export default Routes;