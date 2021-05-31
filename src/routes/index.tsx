import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Pageindex from "../views/index";

const BaseRouter = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/">
        <Redirect to="/pageIndex" />
      </Route>
      <Route path="/pageIndex">
        <Pageindex />
      </Route>
    </Switch>
  </HashRouter>
);

export default BaseRouter;
