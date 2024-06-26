// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
// import bgFront from "assets/images/rotating-card-bg-front.jpeg";
// import bgBack from "assets/images/rotating-card-bg-back.jpeg";
import bgimg from "assets/images/bgimg.png";

function Information() {
  let isLogin = localStorage.getItem("token");
  return (
    <MKBox component="section" mt={5} mb={5}>
      <Container>
        <Grid container item xs={11} spacing={0} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }} mb={10}>
            <RotatingCard >
              <RotatingCardFront
                image={bgimg}
                icon="touch_app"
                title={
                  <>
                    은행 & 주차장
                    <br />
                    정보안내서비스                
                  </>
                }
                description=""
              />
              <RotatingCardBack
                image={bgimg}
                title={<>은행 대기인원 현황<br></br> & 주차장정보</>}
                description={<>내 근처 5km 이내<br></br>지점을 확인할 수 있습니다.</>}
                action={{
                  type: "internal",
                  route: isLogin != null ? "/pages/landing-pages/map" : "/pages/authentication/sign-in",
                  label: "지도 보러가기 >",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="account_balance"
                  title="은행"
                  description="공공데이터 중소기업대기현황 API를 통해 실시간 은행 대기현황 데이터를 제공받아 서비스 중입니다."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="directions_car_filled"
                  title="주차장"
                  description="열린광장 주차장 API를 통해 실시간 주차장 정보 데이터를 제공받아 서비스 중입니다."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="schedule"
                  title="시간효율성 UP"
                  description="대기인원이 적은 은행에서 업무보고, 시간을 절약할 수 있습니다."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="browser_updated"
                  title="서비스 상시 업데이트"
                  description="좋은 서비스를 제공하기 위해, 끈임없이 노력하고 업데이트하고있습니다."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
