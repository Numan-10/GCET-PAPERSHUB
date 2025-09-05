import Message from "./Msg.jsx";
import Cards from "./Cards.jsx";
// import { FaUser } from 'react-icons/fa';
import { FaUserGraduate } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";

function Social() {
  return (
    <div className="container mt-4 ">
      <Message />

      <div className="d-flex justify-content-around">
        <Cards
          icon={<FaUserGraduate color="#fff" size={28} />}
          text={"Author"}
          bgColor={
            "linear-gradient(135deg, #626bff 40%, #8a96ff 95%, #c0c6ff 100%)"
          }
          route={"/contributors"}
        />
        <Cards
          icon={<FaGithub color="#fff" size={28} />}
          text={"Github"}
          bgColor={
            "linear-gradient(135deg, #2e2f44 40%, #484a6b 95%, #6b6e8e 100%)"
          }
          route={"https://github.com/GCET-CSE2022"}
        />
        <Cards
          icon={<MdMenuBook color="#fff" size={28} />}
          text={"Notes"}
          bgColor={
            "linear-gradient(135deg, #fe866a 40%, #feba6d 95%, #ffe6b8 100%) "
          }
          route={"/content"}
        />
      </div>
    </div>
  );
}

export default Social;
