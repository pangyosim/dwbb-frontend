// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BuiltByDevelopers() {
  const [noticeData, setNoticeData] = useState([]);
  const navigator = useNavigate();
  // const bgImage =  
  //   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/desktop.jpg";
  useEffect(()=>{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/notice-all`)
    .then((res)=>{
      const arr = res.data;
      arr.sort(function compare (a,b){
        if( a.noticecreateday > b.noticecreateday ) return -1;
        if( a.noticecreateday < b.noticecreateday ) return 1;
        return 0;
      });
      setNoticeData(arr.slice(0,10));
    })
    .catch((error)=>{
      alert('Inform Error : ' + error);
    })
  },[])
  const handlerNoticeClick = (v,e) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/notice-views`, v)
    .catch((error) => alert('notice views error : ' + error));
    e.preventDefault();
    navigator('/pages/landing-pages/noticedetail', {
      state : {
        seq : v.noticeseq,
        title : v.noticetitle,
        contents : v.noticecontents,
        file : v.noticefile,
        id : v.noticeid,
        views : v.noticeviews+1,
        createday : v.noticecreateday
      },
    });
  }
    
  return (
    <MKBox
      display="flex"
      alignItems="center"
      borderRadius="xl"
      my={2}
      width="100%"
      height={window.innerWidth > 768 ? "500px" : "350px"}
      py={5}
      mt={25}
      mr={3}
      // sx={{
      //   backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
      //     `${linearGradient(
      //       rgba(gradients.dark.main, 0.8),
      //       rgba(gradients.dark.state, 0.8)
      //     )}, url(${bgImage})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <Container>
        <MKTypography style={{fontSize: window.innerWidth > 768 ? "45px" : "30px",fontWeight:"bold"}}  color="dark" mb={5} px={window.innerWidth > 768 ? 5 : 1}>
          공지사항
        </MKTypography>
        {noticeData.map((v,i)=>{
          return(
            <Grid style={{padding:"8px",borderRadius:"10px",backgroundColor:"#f2f2f2",marginBottom:"10px",transition:"all 0.1s linear", cursor:"pointer"}} container key={i} spacing={0} pl={0} fontSize={window.innerWidth > 768 ? "medium": 11} sx={{
              ml: { xs: 0, lg: window.innerWidth > 768 ? 3.5 : 0},
              "&:hover": {
                transform: "scale(1.02)"
              },
            }}
            onClick={(e) => handlerNoticeClick(v,e)}
            >
                <Grid item md={11} xs={window.innerWidth > 768 ? 3 : 11} py={0} style={{color: "#888888"}}>
                  &nbsp;&nbsp;&nbsp;<span style={{color:"red",fontWeight:"bold"}}>공지</span>&nbsp;&nbsp;<span>|</span>
                  &nbsp;&nbsp;&nbsp;<span style={{fontWeight:"bold"}}>{window.innerWidth > 768 || v.noticetitle.length <= 13 ? v.noticetitle : v.noticetitle.substring(0,13)+"..."}</span>
                </Grid>
                <Grid  item md={1} xs={window.innerWidth > 768 ? 4 : 1} py={0} style={{color: "#888888",fontWeight:"bold"}}>
                   {/* {v.noticecreateday.substring(0,v.noticecreateday.indexOf('T'))} */}
                   &gt;
                </Grid>
            </Grid>
          );
        })}
        <MKBox style={{textAlign:"right"}} mb={30}>
          <MKTypography
            component="a"
            href={localStorage.getItem("token") ? "/pages/landing-pages/notice" : "/pages/authentication/sign-in"}
            color="dark"
            fontWeight="bold"
            fontSize={window.innerWidth > 768 ? "15px" : "12px"}
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
            verticalAlign="middle"
            mx={window.innerWidth > 768 ? -2 : 0}
          >
            바로가기 <Icon >arrow_forward</Icon>
          </MKTypography>
        </MKBox>
      </Container>
    </MKBox>
  );
}

export default BuiltByDevelopers;
