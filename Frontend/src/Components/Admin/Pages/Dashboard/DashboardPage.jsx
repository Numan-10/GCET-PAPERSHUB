import Growth from "./Growth";
import RecentActivity from "./RecentActivity";
import Details from "./Details";
const DashboardPage = () => {
  return (
    // ---------------------Total users + Signups---------------------
    <div className="d-flex flex-column container gap-5">
      <Details />

      <Growth />

      <RecentActivity />
    </div>
  );
};

export default DashboardPage;
