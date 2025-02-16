import { useState } from "react";
import "./Authentication.css";
import LoginFormTest from "./login/LoginFormTest";
import SignupPageTest from "./signup/SignupPageTest";
import Lootie from "lottie-react";
import animationData from "../../../public/img/GirlInTheRain.json";

function Authentication() {
  const [active, setActive] = useState("login");

  const handleChange = () => {
    setActive(active === "login" ? "signup" : "login");
  };

  return (
    <div className="authentication">
      <div className="auth__left">
        <Lootie animationData={animationData} loop={true} />
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
