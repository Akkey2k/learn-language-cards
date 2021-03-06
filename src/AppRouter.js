import React from 'react';

import {Switch, Route, Redirect} from "react-router-dom";

import Menu from "./View/Menu";
import Vocabulary from "./View/Vocabulary";
import Learn from "./View/Learn";

const AppRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Menu />
                </Route>
                <Route path="/vocabulary/:vocabularyCode">
                    <Vocabulary/>
                </Route>
                <Route path="/learn/:vocabularyCode">
                    <Learn/>
                </Route>
                <Redirect to={"/"}/>
            </Switch>
        </div>
    );
};

export default AppRouter;