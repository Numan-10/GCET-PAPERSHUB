import React from "react";
import Update from "./Update";

function UpdatePage() {
  return (
    <div className="container  mb-5">
      <Update
        msg={"📌 Don't forget to check out the latest semester notes uploaded!"}
      />
      <Update
        msg={"🛠️ If something breaks, just refresh… or pretend it’s a feature."}
      />
      <Update msg={"🎓 GCET KMR students, this one's for you!"} />

      <div className="">
        <h2 className="text-center mt-5 mb-5" style={{ fontWeight: "bolder" }}>
          ALL CAUGHT UP!
        </h2>
      </div>
    </div>
  );
}

export default UpdatePage;
