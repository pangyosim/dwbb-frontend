// @mui material components
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
// import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import exceptionroutes from "exceptionroutes";
import { useNavigate } from "react-router-dom";

function NoticeDetail ({notice}) {
    let isLogin = localStorage.getItem("token");
    const navigator = useNavigate();
    return(
        <>
            <MKBox position="fixed" top="0rem" width="100%">
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
            </MKBox>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
                <Grid
                item
                xs={12}
                sm={10}
                md={7}
                lg={6}
                xl={4}
                ml={{ xs: "auto", lg: 6 }}
                mr={{ xs: "auto", lg: 6 }}
                >
                    <MKBox
                        bgColor="white"
                        borderRadius="xl"
                        shadow="lg"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        mt={{ xs: 20, sm: 18, md: 20 }}
                        mb={{ xs: 20, sm: 18, md: 20 }}
                        mx={0}
                    >
                        <MKBox
                        variant="gradient"
                        bgColor="secondary"
                        coloredShadow="secondary"
                        borderRadius="lg"
                        p={2}
                        width="94%"
                        mx={3}
                        mt={-3}
                        >
                            <MKTypography variant="h3" color="white">
                                공지사항 상세페이지
                            </MKTypography>
                        </MKBox>
                        <MKBox p={3}>
                            <MKBox width="100%" autoComplete="off">
                                <Grid container spacing={3} pl={3} py={3} flexDirection="row">
                                    {/* line 1 */}
                                    <Grid item md={25} xs={12} py={1} borderRadius="lg" >
                                        <MKTypography  fontWeight="bold" fontSize="25px">
                                            {notice.title}
                                        </MKTypography>
                                    </Grid>
                                    {/* line 2 */}
                                    <Grid item md={1.4} xs={2} borderRadius="lg" >
                                        <MKTypography fontWeight="light" fontSize="13px">
                                            작성자
                                        </MKTypography>
                                    </Grid>
                                    <Grid item md={8.2} xs={7} borderRadius="lg" >
                                        <MKTypography fontWeight="light" fontSize="13px">
                                            {notice.id}
                                        </MKTypography>
                                    </Grid>
                                    <Grid item md={1.4} xs={2} borderRadius="lg" >
                                        <MKTypography fontWeight="light"  fontSize="13px">
                                            조회수
                                        </MKTypography>
                                    </Grid>
                                    <Grid item md={1} xs={1} borderRadius="lg" >
                                        <MKTypography fontWeight="light"  fontSize="13px">
                                            {notice.views}
                                        </MKTypography>
                                    </Grid>
                                    {/* line 3 */}
                                    <Grid item md={1.6} xs={2} borderRadius="lg" >
                                        <MKTypography fontWeight="light"  fontSize="13px">
                                            작성일자
                                        </MKTypography>
                                    </Grid>
                                    <Grid item md={10.4} xs={1} borderRadius="lg" >
                                        <MKTypography fontWeight="light"  fontSize="13px">
                                            {notice.createday.substring(0,notice.createday.indexOf('T'))} {notice.createday.substring(notice.createday.indexOf('T')+1,notice.createday.indexOf('.'))}
                                        </MKTypography>
                                    </Grid>
                                    {/* line F*/}
                                    <Grid item mb={3} md={12} xs={12} borderRadius="lg" >
                                        <MKTypography  fontWeight="light" fontSize="13px">
                                            {notice.contents}
                                        </MKTypography>
                                    </Grid>
                                </Grid>
                            </MKBox>
                            <MKBox mt={2} mb={1}>
                            <MKTypography pl={3} color="secondary" style={{fontSize:"15px",cursor:"pointer"}} fontWeight="light" onClick={()=>(navigator(-1))}>
                                <ArrowBackIcon /> 뒤로가기
                            </MKTypography>
                        </MKBox>
                        </MKBox>
                    </MKBox>
                </Grid>
            </Grid>
            <MKBox pt={6} px={1} mt={6}>
                <DefaultFooter content={footerRoutes} />
            </MKBox>
        </>
    );
}

export default NoticeDetail;