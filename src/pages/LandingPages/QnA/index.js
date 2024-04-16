// @mui material components
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import exceptionroutes from "exceptionroutes";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import MKPagination from "components/MKPagination";
// import { useNavigate } from "react-router-dom";

function QnABasic () {
    let isLogin = localStorage.getItem("token");

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
                        justifyContent="center"
                        mt={{ xs: 20, sm: 18, md: 20 }}
                        mb={{ xs: 20, sm: 18, md: 20 }}
                        mx={0}
                    >
                        <MKBox
                        variant="gradient"
                        bgColor="warning"
                        coloredShadow="warning"
                        borderRadius="lg"
                        p={2}
                        mx={2}
                        mt={-3}
                        >
                            <MKTypography variant="h3" color="white">
                                Q&A
                            </MKTypography>
                        </MKBox>

                        <MKBox p={3}>
                            <MKBox>
                                <Grid container mb={5} border="1px solid black" textAlign="center">
                                    <Grid item xs={1.5} md={1.5} borderRadius="lg" border="1px solid black" >
                                        <MKTypography style={{fontSize:"12px",fontWeight:"bold"}}> 글번호 </MKTypography>
                                    </Grid>
                                    <Grid item xs={6} md={6} borderRadius="lg" border="1px solid black" >
                                        <MKTypography style={{fontSize:"12px",fontWeight:"bold"}}> 글제목 </MKTypography>
                                    </Grid>
                                    <Grid item xs={3} md={3.5} borderRadius="lg" border="1px solid black" >
                                        <MKTypography style={{fontSize:"12px",fontWeight:"bold"}}> 작성자 </MKTypography>
                                    </Grid>
                                    <Grid item xs={1.5} md={1} borderRadius="lg" border="1px solid black" >
                                        <MKTypography style={{fontSize:"12px",fontWeight:"bold"}}> 조회수 </MKTypography>
                                    </Grid>
                                    {}
                                </Grid>
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

export default QnABasic;