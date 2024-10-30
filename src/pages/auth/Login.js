import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  // Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/to-do-list");
    } catch (error) {
      //   console.log("in here");
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/to-do-list");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <div className="login-container">
      <h2 className="login-title">Join Today</h2>
      <div className="inner-container">
        <h3 className="login-subtitle">Sign in with one of the providers</h3>
        <button className="login-button" onClick={GoogleLogin}>
          <FcGoogle className="login-icon" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
