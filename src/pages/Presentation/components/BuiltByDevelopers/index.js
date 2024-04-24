// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { useEffect, useState } from "react";
import axios from "axios";

function BuiltByDevelopers() {
  const [noticeData, setNoticeData] = useState([]);

  const bgImage =
    "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/desktop.jpg";
    useEffect(()=>{
      axios.post('https://129.213.127.53:8080/notice-all')
      .then((res)=>{
        const arr = res.data;
        arr.sort(function compare (a,b){
          if( a.noticecreateday > b.noticecreateday ) return -1;
          if( a.noticecreateday < b.noticecreateday ) return 1;
          return 0;
        });
        setNoticeData(arr.slice(0,5));
      })
      .catch((error)=>{
        alert('Inform Error : ' + error);
      })
    },[])
  return (
    <MKBox
      display="flex"
      alignItems="center"
      borderRadius="xl"
      my={2}
      width="100%"
      height="350px"
      py={5}
      mt={15}
      mr={3}
      sx={{
        backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.dark.main, 0.8),
            rgba(gradients.dark.state, 0.8)
          )}, url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <MKTypography variant="h2" color="white" mb={3.5} px={window.innerWidth > 768 ? 3.5 : 1}>
          공지사항
        </MKTypography>
        {noticeData.map((v,i)=>{
          let mb_val = 0;
          if( i === noticeData.length-1 ) {
            mb_val = 3;
          } else {
            mb_val = 0;
          }
          return(
            <Grid container sx={{ ml: { xs: 1, lg: window.innerWidth > 768 ? 3.5 : 0} }} key={i} spacing={0} pl={0} mb={mb_val}  fontSize={window.innerWidth > 768 ? "medium": 11}>
                <Grid item md={8} xs={window.innerWidth > 768 ? 3 : 9} py={0} style={{color: "white"}}>
                  <span style={{color:"red"}}>[공지]</span>
                  {window.innerWidth > 768 || v.noticetitle.length <= 13 ? v.noticetitle : v.noticetitle.substring(0,13)+"..."}
                </Grid>
                <Grid  item md={4} xs={window.innerWidth > 768 ? 4 : 3} py={0} style={{color: "white"}}>
                  {v.noticecreateday.substring(0,v.noticecreateday.indexOf('T'))}
                </Grid>
            </Grid>
          );
        })}
          <MKTypography
            component="a"
            href={localStorage.getItem("token") ? "/pages/landing-pages/notice" : "/pages/authentication/sign-in"}
            variant="body2"
            color="white"
            fontWeight="bold"
            sx={{
              "& .material-icons-round": {
                fontSize: "1.125rem",
                transform: `translateX(3px)`,
                transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
              },
              "&:hover .material-icons-round, &:focus .material-icons-round": {
                transform: `translateX(6px)`,
              },
            }}
            mx={window.innerWidth > 768 ? 4 : 1}
          >
            더보기<Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
          </MKTypography>
      </Container>
    </MKBox>
  );
}

export default BuiltByDevelopers;
