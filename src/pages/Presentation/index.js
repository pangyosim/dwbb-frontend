// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Presentation page sections
import Information from "pages/Presentation/sections/Information";
import Testimonials from "pages/Presentation/sections/Testimonials";

// Presentation page components
import BuiltByDevelopers from "pages/Presentation/components/BuiltByDevelopers";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import exceptionroutes from "exceptionroutes";

// Carousel
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bgImage1 from "../../assets/images/background3dimg1.png";
import bgImage2 from "../../assets/images/background3dimg2.png";
import bgImage3 from "../../assets/images/background3dimg3.png";
import { useState } from "react";

const slide_items = [
  {
    alt : "Slide image 1",
    url : bgImage1,
  },
  {
    alt : "Slide image 2",
    url : bgImage2,
  },
  {
    alt : "Slide image 3",
    url : bgImage3,
  }
]

function Presentation() {
  let isLogin = localStorage.getItem("token");
  const [currentIndex, setCurrentIndex] = useState();
  const [slideIndex, setSlideIndex] = useState(1);
  return (
    <>
      <DefaultNavbar
        routes={isLogin !== null ? routes : exceptionroutes}
        action={isLogin !== null ? 
          {
            type: "internal",
            route: "/pages/authentication/sign-out",
            label: "로그아웃", 
            color:"info",
          } :
          {
            type: "internal",
            route: "/pages/authentication/sign-in",
            label: "로그인", 
            color:"info",
        }}
      />
      <Carousel
          showArrows={false}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          stopOnHover={false}
          showIndicators={false}
          showStatus={false}
          onChange={(idx)=> setCurrentIndex(idx)}
          selectedItem={slide_items[currentIndex]}
        >
        {slide_items.map((va,idx)=>{
          console.log('idx : ' + idx)
          console.log(slide_items)
          if(idx === slide_items.length-1) {
            slide_items.push({
              alt: `Slide image ${slideIndex}`,
              url: require(`../../assets/images/background3dimg${slideIndex}.png`)
            })
            setSlideIndex(()=>1);
          } else if (idx > 3){
            slide_items.shift()
          }
          return(
            <div key={va.alt}>
              <img src={va.url}  alt={va.alt}/>
            </div>
          )
        })}
      </Carousel>
      <MKBox
        minHeight="105vh"
        width="100%"
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
          //borderImage: "fill top linear-gradient(#fff,#fff1)",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              mt={-30}
              mb={0}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
              textAlign="center"
            >
              은행 대기인원 <br></br> DWBB에서 간편하게
            </MKTypography>
            <MKTypography
              variant="body1"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={-10}
            >
              IBK기업은행 대기인원 현황,<br></br> 주차장 정보 확인 웹사이트
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -1,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Information/>
        <Container style={window.innerWidth > 1200 ? {display:"inline-flex"} : null}>
          <BuiltByDevelopers />
          <Testimonials/>
        </Container>
      </Card>
      <MKBox pt={6} px={0} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Presentation;
