import { AuthProvider } from "../contexts/AuthContext";
import { Register } from "./Register/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.scss";
import { Dashboard } from "./Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/register" component={Register} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
