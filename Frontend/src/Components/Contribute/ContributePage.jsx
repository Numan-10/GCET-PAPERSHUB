import Contribute from "./Contribute";
import ContributeGuidelines from "./ContributeGuidelines";
import {Routes, Route } from "react-router-dom";
import PageNotFound from "../PageNotFound";
function ContributePage() {
  return (
    <Routes>
      <Route path="/" element={<Contribute />} />
      <Route path="/guidelines" element={<ContributeGuidelines />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
export default ContributePage;
