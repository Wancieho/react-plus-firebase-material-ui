import { AuthProvider } from "../contexts/AuthContext";
import Register from "./Register/Register";

function App() {
  return (
    <AuthProvider>
      <Register />
    </AuthProvider>
  );
}

export default App;
