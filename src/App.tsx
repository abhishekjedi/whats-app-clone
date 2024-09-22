import "./App.scss";
import AuthManager from "./Context/auth";
import AppRouter from "./router/appRouter";

function App() {
  return (
    <AuthManager>
      <AppRouter />
    </AuthManager>
  );
}

export default App;
