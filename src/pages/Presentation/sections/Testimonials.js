// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultReviewCard from "examples/Cards/ReviewCards/DefaultReviewCard";

// // Images

function Information() {
  return (
    <MKBox component="section" py={1}>
      <Container>
        <Grid
          container
          item
          mt={10}
          xs={12}
          lg={6}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <Grid item xs={12} md={6} lg={12}>
            <MKTypography variant="h2" mb={3}>Q&A게시판</MKTypography> 
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <MKTypography variant="h3" color="info" textGradient mb={2}>
              최근 고객들이 남겨주신 글현황입니다.
            </MKTypography>
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <MKTypography variant="body2" color="text" mb={2}>
              Q&A게시판을 통해 상시 고객들의 불편한 점들을 개선시키고자 노력하고있습니다.
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={0} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="Nick Willever"
              date="1 day ago"
              review="This is an excellent product, the documentation is excellent and helped me get things done more efficiently."
              rating={5}
            />
          </Grid>
          <Grid item xs={12} md={3} lg={4}>
            <DefaultReviewCard
              color="info"
              name="Shailesh Kushwaha"
              date="1 week ago"
              review="I found solution to all my design needs from Creative Tim. I use them as a freelancer in my hobby projects for fun! And its really affordable, very humble guys !!!"
              rating={5}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="Samuel Kamuli"
              date="3 weeks ago"
              review="Great product. Helped me cut the time to set up a site. I used the components within instead of starting from scratch. I highly recommend for developers who want to spend more time on the backend!."
              rating={5}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
