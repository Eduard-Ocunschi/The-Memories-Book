import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { auth } from "../firebase";
import { loginUser } from "../userSlice";
import { useDispatch } from "react-redux";
import styles from "./LoginFormTest.module.css";
import Logo from "../../../ui/logo/Logo";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function LoginFormTest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "test@test.com",
      password: "123456",
    },
    resolver: zodResolver(schema),
  });

  const handleLogin = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (userCredential.user) {
        dispatch(loginUser(userCredential.user));
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error.message);

      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.code === "auth/invalid-credential") {
        errorMessage =
          "The credentials you provided are invalid. Please check your email and password.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      }

      setError("root", { message: errorMessage });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className={styles.login}>
      <Logo className="logo_landing_nav" />

      <input {...register("email")} type="text" placeholder="Email" />
      {errors.email && <div>{errors.email.message}</div>}

      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <div>{errors.password.message}</div>}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submiting..." : "Submit"}
      </button>
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  );
}

export default LoginFormTest;
