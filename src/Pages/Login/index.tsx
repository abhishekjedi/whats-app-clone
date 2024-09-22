import { useContext } from "react";
import "./style.scss";
import { AuthContext } from "../../Context/auth";
const Login = () => {
  const { login } = useContext(AuthContext);
  return (
    <div className="login">
      <div
        className="login-container"
        style={{ background: " rgb(39, 46, 52)" }}
      >
        <div className="login-logo" style={{}} />
        <p className="login-name">ChitChat</p>
        <button className="login-btn" onClick={login}>
          <img
            src="https://w7.pngwing.com/pngs/8/502/png-transparent-google-logo-google-logo-google-now-google-search-google-plus-search-engine-optimization-trademark-logo.png"
            alt="login with google"
            className="login-image"
          />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
