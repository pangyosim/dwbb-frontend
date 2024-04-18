// Material Kit 2 React pages
import Presentation from "pages/Presentation";
import { useLocation } from "react-router-dom";

export default function PresentationPage() {
  const loc = useLocation();
  const userData = {...loc.state};
  return <Presentation userdata={userData}/>;
}
