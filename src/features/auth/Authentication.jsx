import { useState } from "react";
import "./Authentication.css";
import LoginFormTest from "./login/LoginFormTest";
import SignupPageTest from "./signup/SignupPageTest";

function Authentication() {
  const [active, setActive] = useState("login");

  const handleChange = () => {
    setActive(active === "login" ? "signup" : "login");
  };

  return (
    <div className="authentication">
      <div className="auth__left">
        <img src="https://images.pexels.com/photos/30507158/pexels-photo-30507158/free-photo-of-cozy-workspace-with-leather-notebook-and-laptop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
      </div>
      <div className="auth__right">
        {active === "login" ? <LoginFormTest /> : <SignupPageTest />}

        <div className="auth__more">
          <span>
            {active === "login" ? (
              <>
                Dont have an account?{" "}
                <button onClick={handleChange}>Sign up</button>
              </>
            ) : (
              <>
                Have an account? <button onClick={handleChange}>Log in</button>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
