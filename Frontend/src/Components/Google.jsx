import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import API_BASE_URL from "../ApiUrl";
import { useNavigate } from "react-router-dom";

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
      console.log("Response Google", response);
      if (response.data.message == "Success") {
        const Token = response.data.token;
        const { email, image, username } = response.data.user;
        console.log("Google:", Token);
        console.log("Google:", email, image, username);
        // let obj = { Token, email, image, username };
        localStorage.setItem("token", Token);
        localStorage.setItem("email", email);
        localStorage.setItem("user", username);
        Navigate("/home");
      }
    } catch (err) {
      console.log(err);
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
        <div className="lines">
          <hr />
        </div>
        <p className="px-3 pt-3 break">or continue with</p>
        <div className="lines ">
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
    </>
  );
}

export default Google;
