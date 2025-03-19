import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import API_BASE_URL from "../ApiUrl";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Google() {
  const BackendUrl = API_BASE_URL;
  const Navigate = useNavigate();
  const responseGoogle = async (res) => {
    // console.log(res);
    try {
      console.log(res["code"]);
      let code = res["code"];
      console.log(BackendUrl);
      const response = await axios.get(
        `${BackendUrl}/auth/google?code=${code}`
      );
      // console.log("Response Google", response);
      const { message, success } = response.data;
      if (success) {
        const Token = response.data.token;
        const { email, image, username } = response.data.user;
        console.log("Google:", Token);
        console.log("Google:", email, image, username);
        // let obj = { Token, email, image, username };
        localStorage.setItem("token", Token);
        localStorage.setItem("email", email);
        localStorage.setItem("user", username);

        Navigate("/home");

        setTimeout(() => {
          toast.success(message, {
            position: "top-center",
            duration: 2100,
            icon: "🎉",
          });
        }, 800);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || err);
    }
  };
  const GoogleAuth = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="lines p-3">
          <hr />
        </div>
        <p className="px-3 pt-3 break">or continue with</p>
        <div className="lines p-3">
          <hr />
        </div>
      </div>
      <button
        onClick={GoogleAuth}
        className="text-center d-flex justify-content-around border rounded-2 google p-2"
      >
        <div>
          <img
            src="/Assets/google.svg"
            alt="Google Icon"
            className="google-icon"
          />
        </div>
        <div className="fw-medium">Sign in with Google</div>
      </button>
      <Toaster />
    </>
  );
}

export default Google;
