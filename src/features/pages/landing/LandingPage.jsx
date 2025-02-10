import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.data.user.user);

  const handleGetStarted = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/authenticate");
    }
  };

  return (
    <div>
      <h1>Welcome to Our App</h1>
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default LandingPage;
