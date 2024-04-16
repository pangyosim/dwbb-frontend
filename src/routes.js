// @mui material components
import Icon from "@mui/material/Icon";

// @mui icons
import GitHubIcon from "@mui/icons-material/GitHub";

// Pages
import Notice from "layouts/pages/landing-pages/notice";
import QnA from "pages/LandingPages/QnA";

const routes = [
  {
    name: "은행",
    icon: <Icon>monetization_on</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "주변은행",
        collapse: [
          {
            name: "지도",
            route: "/pages/landing-pages/notice",
            component: <Notice />,
          },
         
        ],
      },
   
    ],
  },
  {
    name: "주차장",
    icon: <Icon>directions_car_filled</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
        {
          name: "주변주차장",
          collapse: [
            {
              name: "지도",
              route: "/pages/landing-pages/notice",
              component: <Notice />,
            },
          ]
        }
    ],
  },
  {
    name: "HELP",
    icon: <Icon>question_answer</Icon>,
    columns: 1,
    rowsPerColumn: 1,
    collapse: [
      {
        name: "HELP",
        collapse: [
          {
            name: "공지사항",
            route: "/pages/landing-pages/notice",
            component: <Notice />,
          },
          {
            name: "Q&A",
            route: "/pages/lading-pages/qna",
            component: <QnA/>,
          },
        ]
      }
    ],
  },
  {
    name: "github",
    icon: <GitHubIcon />,
    href: "https://github.com/pangyosim/dwbb",
  },
];

export default routes;
