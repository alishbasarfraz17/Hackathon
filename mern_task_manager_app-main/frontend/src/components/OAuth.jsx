

import Button from "./Button";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getAuth } from 'your-auth-library'; 
import { getAuth } from './utils/auth';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const OAuth = ({ title }) => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      //   console.log(resultsFromGoogle);
      const res = await fetch(`${baseUrl}/api/v1/user/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(setCredentials(data));
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      type="button"
      className="bg-blue-600 text-white  mx-auto block rounded-md p-2 m-4 justify-center"
      onClick={handleGoogleClick}
    >
      {title}
    </Button>
  );
};

export default OAuth;
