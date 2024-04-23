// @mui icons
import GitHubIcon from "@mui/icons-material/GitHub";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/favicon.png";

const date = new Date().getFullYear();
const output = {
  brand: {
    name: "DWBB",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <GitHubIcon />,
      link: "https://github.com/pangyosim/dwbb",
    },
  ],
  menus: [
    {
      name: "resources",
      items: [
        { name: "frontend teamplates", href: "https://www.creative-tim.com/" },
        { name: "React", href: "https://react.dev/learn" },
        { name: "Springboot", href: "https://www.baeldung.com/spring-boot" },
        { name: "Bank Data", href: "https://www.data.go.kr/data/15125567/openapi.do"}
      ],
    },
    {
      name: "help & support",
      items: [
        { name: "Notice", href: "https://dwbb.vercel.app/pages/landing-pages/notice"},
        { name: "Q&A", href: "http://dwbb.vercel.app/pages/lading-pages/qna" },
      ],
    },
    {
      name: "Github",
      items: [
        { name: "URL", href: "https://github.com/pangyosim/dwbb" },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} DWBB by{" "}
      <MKTypography
        component="a"
        href="https://github.com/pangyosim/dwbb"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Don't Worry Be Banking
      </MKTypography>
      .
    </MKTypography>
  ),
};

export default output;
