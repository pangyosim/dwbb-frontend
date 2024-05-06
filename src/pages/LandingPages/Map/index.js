import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

import routes from "routes";
import exceptionroutes from "../../../exceptionroutes";
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Loading from "pages/Presentation/components/Loading";
// import Sidebar from "pages/Presentation/components/Sidebar";

// Marker Image
import ibk from "../../../assets/images/ibk.png";
import loadingimg from "../../../assets/images/Loading.gif";
import myloc from "../../../assets/images/myloc.png";
import "./Map.css";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
// import Contact from "pages/Presentation/components/Contact";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

function MapPageBasic () {
    const isLogin = localStorage.getItem("token");
    const navermaps = useNavermaps();
    
    const [loc, setLoc] = useState({
        lat: 0,
        lng: 0
    })
    const [isClicked, setIsClicked ] = useState("");
    const [ btIsAcitived, setBtIsActived ] = useState({
        bkbutton : true,
        pkbutton : false
    })
    // const [isOpened, setIsOpened] = useState(false);
    const [nearbank,setNearbank] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem("token") === null){
            navigate("/pages/authentication/sign-in");
        }
    })

    useEffect(()=>{
        let tmp = { geox : 0, geoy: 0};
        if (navigator.geolocation !== null) {
            navigator.geolocation.getCurrentPosition((position)=>{
                tmp.geox=position.coords.latitude
                tmp.geoy=position.coords.longitude
                setLoc({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            });
        }
        if(loc.lat!==0){
            axios.post("https://129.213.127.53:8080/map-data",{
                geox: loc.lat,
                geoy: loc.lng
            })
            .then((response)=>{
                if(response.data === "") {
                    console.log('영업시간이 아닙니다.');
                } else {
                    setNearbank(response.data);
                }
            })
            .catch((error) => console.log('map-data-error : ' + error))
        }
    },[loc.lat,loc.lng])

    const handlerBankClick = (e,v,idx) => {
        console.log(v);
        setIsClicked(idx)
        // setIsOpened(true);
    }
    return (
        <>
            <MKBox position="fixed" top="0rem" width="100%" zIndex="99">
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
            <MKBox id="map" px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={1}>
                {loc.lat !== 0 && nearbank.length !== 0  ?
                    <MapDiv
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    >   
                        <MKBox>
                            <MKButton color={btIsAcitived.bkbutton ? "info" : "secondary"} style={{borderRadius:"30px",height:"25px", marginLeft: `${window.innerWidth > 1024 ? "14.5%" : "5%"}`,marginTop:"95px",paddingLeft:"15px",paddingRight:"20px"}} size="medium" onClick={()=>{setBtIsActived({bkbutton: !btIsAcitived.bkbutton,pkbutton:btIsAcitived.pkbutton})}}>
                                <img src={ibk} alt="ibk" width={15} height={15}/>&nbsp;&nbsp;<MKTypography color="white" fontWeight="bold" style={{fontSize:"15px"}}>IBK기업은행</MKTypography>
                            </MKButton>
                            <MKButton color={btIsAcitived.pkbutton ? "success" : "secondary"} style={{borderRadius:"30px",height:"25px", marginLeft: "10px",marginTop:"95px",paddingLeft:"15px",paddingRight:"15px"}} size="medium" onClick={()=>{setBtIsActived({bkbutton: btIsAcitived.bkbutton,pkbutton: !btIsAcitived.pkbutton})}}>
                                <DirectionsCarIcon/>&nbsp;&nbsp;<MKTypography color="white" fontWeight="bold" style={{fontSize:"15px"}}>주차장</MKTypography>
                            </MKButton>
                        </MKBox>
                        <NaverMap
                        defaultCenter={new navermaps.LatLng(loc.lat, loc.lng)}
                        defaultZoom={17}
                        minZoom={15}
                        maxZoom={18}
                        >
                            <Marker position={new navermaps.LatLng(loc.lat,loc.lng)}
                                icon={{
                                    content:
                                    `
                                        <div class="wrap_myloc">
                                        </div>
                                    `,
                                    anchor: new navermaps.Point(135,135),
                                }}
                                zIndex="-1"
                            />
                            {/* my location */}
                            <Marker position={new navermaps.LatLng(loc.lat, loc.lng)} 
                                icon={{
                                    content: 
                                    `
                                        <div>
                                            <img src=${myloc}/ style="width: 2vh; height: 2vh;">
                                        </div>
                                    `,
                                    anchor: new navermaps.Point(15,15),
                                }}
                                zIndex="99"
                            />
                            {/* Bank */}
                            {btIsAcitived.bkbutton ? (<>
                            {nearbank.length !== 0 ? nearbank.map((v,idx)=>{
                                return(
                                    <Marker key={idx} position={new navermaps.LatLng(v.geoy,v.geox)}
                                        icon={{
                                            content: 
                                                `<div class=${isClicked !== idx ? "arr" : "arr"+idx}>
                                                    <img src=${ibk} style="margin-left: 0.75vh; width: 2.5vh; height: 2.5vh;"/><p style="margin-top: 0.5vh; margin-left: 1vh; font-size: 10px; font-weight: bold;"> IBK기업은행 <br>${v.krnbrm}</p>
                                                </div>`,
                                            anchor: new navermaps.Point(30,40),
                                        }}
                                        zIndex="11"
                                        onClick={(e)=>(handlerBankClick(e,v,idx))}
                                    />
                                )
                            }) : ""}
                            </>): ""}

                        </NaverMap>
                    </MapDiv>
                : <Loading image={loadingimg}/>}
            </MKBox>
        </>
    );
}
export default MapPageBasic;