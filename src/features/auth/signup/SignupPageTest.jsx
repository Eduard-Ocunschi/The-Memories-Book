import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { loginUser } from "../userSlice";
import styles from "./SignupPageTest.module.css";
import Logo from "../../../ui/logo/Logo";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string(),
});

function SignupPageTest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const handleSignup = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: data.username });

      await signInWithEmailAndPassword(auth, data.email, data.password);
      dispatch(
        loginUser({
          uid: user.uid,
          username: data.username,
          email: data.email,
        })
      );

      navigate("/home");
    } catch (err) {
      console.error("Signup Error:", err);
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignup)} className={styles.signup}>
      <Logo className="logo_landing_nav" />

      <input
        {...register("email")}
        type="text"
        aria-placeholder="Email"
        placeholder="Email"
      />
      {errors.email && <div>{errors.email.message}</div>}

      <input
        {...register("username")}
        type="text"
        aria-placeholder="Username"
        placeholder="Username"
      />

      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <div>{errors.password.message}</div>}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Singing Up..." : "Sign Up"}
      </button>
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  );
}

export default SignupPageTest;
