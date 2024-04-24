import NoticeDetail from "pages/LandingPages/NoticeDetail";
import { useLocation } from "react-router-dom";

export default function NoticeDetailPage() {
  const loc = useLocation();
  const noticeData = {...loc.state};
  return <NoticeDetail notice={noticeData}/>;
}
