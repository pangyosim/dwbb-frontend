import QnAResgister from "pages/LandingPages/QnARegister";
import { useLocation } from "react-router-dom";

export default function QnADetailPage() {
  const loc = useLocation();
  const userData = {...loc.state};
  return <QnAResgister user={userData}/>;
}
