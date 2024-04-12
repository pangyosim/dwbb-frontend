/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import bgimg from "assets/images/favicon.png";

const output = [
  {
    title: "내 근처 은행",
    description: "IBK기업은행 대상으로 서비스하고 있으며, 점차 다른 은행들도 추가할 예정입니다.",
    items: [
      {
        image: `${bgimg}`,
        name: "IBK기업은행 역삼점",
        count: 10,
        route: "/sections/page-sections/page-headers",
      },
      {
        image: `${bgimg}`,
        name: "IBK기업은행 선릉점",
        count: 14,
        route: "/sections/page-sections/features",
      },
      {
        image: `${bgimg}`,
        name: "IBK기업은행 강남점",
        count: 10,
        route: "/sections/page-sections/page-headers",
      },
      {
        image: `${bgimg}`,
        name: "IBK기업은행 논현점",
        count: 14,
        route: "/sections/page-sections/features",
      },
      {
        image: `${bgimg}`,
        name: "IBK기업은행 강남대로점",
        count: 10,
        route: "/sections/page-sections/page-headers",
      },
      {
        image: `${bgimg}`,
        name: "IBK기업은행 강남시티점",
        count: 14,
        route: "/sections/page-sections/features",
      },
    ],
  },
  {
    title: "내 근처주차장",
    description: "서울시 대상으로 서비스하고 있으며, 점차 다른 지역도 추가할 예정입니다.",
    items: [
      {
        image: `${bgimg}`,
        name: "테헤란로26길노상공영주차장",
        count: 4,
        route: "/sections/navigation/navbars",
      },
      {
        image: `${bgimg}`,
        name: "역삼하이츠빌딩주차장",
        count: 2,
        route: "/sections/navigation/nav-tabs",
      },
      {
        image: `${bgimg}`,
        name: "코레이트타워주차장",
        count: 3,
        route: "/sections/navigation/pagination",
      },
      {
        image: `${bgimg}`,
        name: "현대주차장",
        count: 4,
        route: "/sections/navigation/navbars",
      },
      {
        image: `${bgimg}`,
        name: "장원민영주차장",
        count: 2,
        route: "/sections/navigation/nav-tabs",
      },
      {
        image: `${bgimg}`,
        name: "강남N타워 민영주차장",
        count: 3,
        route: "/sections/navigation/pagination",
      },
    ],
  },
];
export default output;
