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

// Images
import bgImage1 from "../../assets/images/background3dimg1.png";
import bgImage2 from "../../assets/images/background3dimg2.png";
import bgImage3 from "../../assets/images/background3dimg3.png";

// Carousel
import {Carousel} from "react-responsive-carousel";

function Presentation() {
  let isLogin = localStorage.getItem("token");

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
          showArrows={true}
          centerMode={true}
          centerSlidePercentage={30}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          infiniteLoop={true}
        >
          <img src={bgImage1} alt="image1" style={{position:"relative",zIndex:"-1"}}/>
          <img src={bgImage2} alt="image2"/>
          <img src={bgImage3} alt="image3"/>
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
