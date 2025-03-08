function Google() {
  const google = () => {
    console.log("Clicked!");
  };
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
        onClick={google}
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
