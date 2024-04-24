import QnADetail from "pages/LandingPages/QnADetail";
import { useLocation } from "react-router-dom";

export default function QnADetailPage() {
  const loc = useLocation();
  const qnaData = {...loc.state};
  return <QnADetail qna={qnaData}/>;
}
