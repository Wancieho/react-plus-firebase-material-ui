import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.scss";
import { Dashboard } from "./Dashboard/Dashboard";
import { Register } from "./Register/Register";
import { Login } from "./Login/Login";
import { ProtectedRoute } from "../ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <ProtectedRoute exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
