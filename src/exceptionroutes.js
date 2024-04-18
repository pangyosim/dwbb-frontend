// @mui material components
import Icon from "@mui/material/Icon";

// @mui icons
import GitHubIcon from "@mui/icons-material/GitHub";

// Pages
import SignIn from "layouts/pages/authentication/sign-in";
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
            route: "/pages/authentication/sign-in",
            component: <SignIn />,
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
              route: "/pages/authentication/sign-in",
              component: <SignIn />,
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
            route: "/pages/authentication/sign-in",
            component: <SignIn />,
          },
          {
            name: "Q&A",
            route: "/pages/authentication/sign-in",
            component: <SignIn />,
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
