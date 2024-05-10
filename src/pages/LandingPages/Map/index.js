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

// Marker Image
import ibk from "../../../assets/images/ibk.png";
import parking from "../../../assets/images/parking.png";
import loadingimg from "../../../assets/images/Loading.gif";
import myloc from "../../../assets/images/myloc.png";
import "./Map.css";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Call from "../../../assets/images/Call.png";
import Fax from "../../../assets/images/Fax.png";
import Addr from "../../../assets/images/Addr.png";
import Clock from "../../../assets/images/Clock.png";
import Cash from "../../../assets/images/dollar.png";
import Car from "../../../assets/images/Car.png";

function MapPageBasic () {
    const isLogin = localStorage.getItem("token");
    const navermaps = useNavermaps();
    const [ map, setMap ] = useState(null)

    const [ loc, setLoc ] = useState({
        lat: 0,
        lng: 0
    })
    const [ isClicked, setIsClicked ] = useState("");
    const [ parkisClicked, setParkIsClicked ] = useState("");
    const [ btIsAcitived, setBtIsActived ] = useState({
        bkbutton : true,
        pkbutton : false
    })
    const [ isWindow, setIsWindow ] = useState("");
    const [ isParkWindow, setParkIsWindow ] = useState();
    const [ nearbank, setNearbank ] = useState([]);
    const [ nearpark, setNearpark ] = useState([]);
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
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/bank-data`,{
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
            .catch((error) => console.log('bank-data-error : ' + error))
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/park-data`,{
                lat: loc.lat,
                lng: loc.lng
            })
            .then((response)=>{
                if(response.data === "") {
                    console.log('영업시간이 아닙니다.');
                } else {
                    setNearpark(response.data);
                }
            })
            .catch((error)=> console.log('park-data-error : ' + error))
        }
    },[loc.lat,loc.lng])

    const handlerBankClick = (e,v,idx) => {
        setParkIsClicked("");
        setIsClicked(idx)
        const loc = new navermaps.LatLng(v.geoy,v.geox);
        const infowindow = new navermaps.InfoWindow({
            content :   `<div style="padding: 0; width: 25vh; margin: 0; border: 2px solid #0675f4; border-radius: 10px; background-color: white;">
                            <div style="padding: 13px;">
                                <div style="font-size: 13px; color: gray; margin-bottom: 5px;"><span style="font-size: 17px; color: black; font-weight: bold;">&nbsp;${v.krnbrm}</span> 지점</div>
                                <div style="font-size: 12px;"><img src=${Addr} alt="Addr" style="width: 12px; height: 12px;">&nbsp; ${v.brncnwbscadr}</div>
                                <div style="font-size: 12px;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 내 위치에서부터 ${v.distance}km</div>
                                <div style="font-size: 12px;"><img src=${Call} alt="call" style="width: 12px; height: 12px;"> &nbsp;${v.brncTel}</div>
                                <div style="font-size: 12px;"><img src=${Fax} alt="Fax" style="width: 12px; height: 12px;"> &nbsp;${v.rprsFax}</div>
                                <div style="font-size: 12px; margin-bottom: 10px;"><img src=${Clock} alt="call" style="width: 12px; height: 12px;"> &nbsp;영업시간:<span style="">09:00~16:00</span></div>
                                <div style="font-size: 12px; display: flex; justify-content: center;">
                                    ${v.tlwnList ? v.tlwnList.map((val)=>
                                            `<div style="text-align: center; padding: 3px; ">
                                                <div style="border-bottom: 1px solid lightgray;">
                                                    ${val.trwnTgn}
                                                </div>
                                                ${val.waitCusCnt}
                                            </div>
                                            `
                                    ).join(''): `<div style="font-weight: bold; color: red;">영업시간이 아닙니다.</div>`}
                                </div>
                                ${v.tlwnList ? `<button class="reservbutton" onclick="window.open('https://map.naver.com/p/search/IBK기업은행 ${v.krnbrm}')">예약</button><p style="font-size:9px; color: red;">* 당일,공휴일예약은 불가합니다.</p>` :""}
                            </div>
                        </div>`,
            anchorSize : 0,
            backgroundColor: null,
            borderWidth: 0,
            disableAutoPan: true,
            pixelOffset: new navermaps.Point(187,100),
        });
        setIsWindow(infowindow);
        infowindow.open(map,loc);
    }

    const handlerParkClick = (e,v,idx) => {
        setIsClicked("");
        setParkIsClicked(idx)
        const loc = new navermaps.LatLng(v.lat,v.lng);
        const parkinfowindow = new navermaps.InfoWindow({
            content :   `<div style="padding: 0; width: 27vh; margin: 0; border: 2px solid #4caf50; border-radius: 10px; background-color: white;">
                            <div style="padding: 13px;">
                                <div style="font-size: 13px; color: gray;"><span style="font-size: 17px; color: black; font-weight: bold;">&nbsp;${v.pkname}</span></div>
                                <div style="font-size: 12px; color: gray;"> &nbsp;&nbsp;${v.type}</div>
                                <div style="font-size: 12px; margin-bottom: 5px;">&nbsp;  <span style="color: gray;">${v.pkrule}</span> <span style="font-weight: bold; color: #4caf50;">${v.paytype}</span></div>
                                <div style="font-size: 12px;"><img src=${Addr} alt="Addr" style="width: 12px; height: 12px;">&nbsp; ${v.pkaddr}</div>
                                <div style="font-size: 12px;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 내 위치에서부터 ${v.distance}km</div>
                                <div style="font-size: 12px;"><img src=${Call} alt="call" style="width: 12px; height: 12px;"> &nbsp;${v.tel}</div>
                                <div style="font-size: 12px; margin-bottom: 10px;">
                                    <img src=${Car} alt="Star" style="width: 12px; height: 12px;"> &nbsp;최대 ${v.capacity}대 주차가능 <br>
                                    <img src=${Cash} alt="Cash" style="width: 12px; height: 12px;"/><span style="font-weight: bold;"> &nbsp;${v.timerates.substring(0,v.timerates.indexOf("."))}분당 ${v.rates.substring(0,v.rates.indexOf("."))}원</span><br>
                                    ${v.fullmonthly !== 0 ? `<p style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한 달 ${v.fullmonthly.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</p>`: ""}
                                    <img src=${Clock} alt="Clock" style="width: 12px; height: 12px;"/><span> &nbsp;평일 : ${v.weekdaytime}</span>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;주말 : ${v.weekendtime}</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;공휴일 : ${v.holidaytime}</p>
                                    <p style="color: red;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${v.nightyn}</p>
                                </div>
                                <div style="font-size: 12px; display: flex; justify-content: center;">
                                </div>
                            </div>
                        </div>`,
            anchorSize : 0,
            backgroundColor: null,
            borderWidth: 0,
            disableAutoPan: true,
            pixelOffset: new navermaps.Point(187,100),
        });
        setParkIsWindow(parkinfowindow);
        parkinfowindow.open(map,loc);
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
            <MKBox px={1} width="100%" height="100vh" style={{margin:"0", padding:"0"}} mx="auto" position="relative" zIndex={1}>
                {loc.lat !== 0 && nearbank.length !== 0  ?
                    <MapDiv
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    >   
                        <MKBox style={{textAlign: "center"}}>
                            <MKButton color={btIsAcitived.bkbutton ? "info" : "secondary"} style={{borderRadius:"30px",height:"25px",marginTop:"95px",paddingLeft:"15px",paddingRight:"20px"}} size="medium" onClick={()=>{setBtIsActived({bkbutton: !btIsAcitived.bkbutton,pkbutton:btIsAcitived.pkbutton});setIsClicked(""); isWindow !== "" && btIsAcitived.bkbutton  ? isWindow.close() : setIsWindow("");}}>
                                <img src={ibk} alt="ibk" width={15} height={15}/>&nbsp;&nbsp;<MKTypography color="white" fontWeight="bold" style={{fontSize:"15px"}}>IBK기업은행</MKTypography>
                            </MKButton>
                            <MKButton color={btIsAcitived.pkbutton ? "success" : "secondary"} style={{borderRadius:"30px",height:"25px", marginLeft: "10px",marginTop:"95px",paddingLeft:"15px",paddingRight:"15px"}} size="medium" onClick={()=>{setBtIsActived({bkbutton: btIsAcitived.bkbutton,pkbutton: !btIsAcitived.pkbutton}); setParkIsClicked(""); isParkWindow !== "" && btIsAcitived.pkbutton  ? isParkWindow.close() : setParkIsWindow("");}}>
                                <DirectionsCarIcon/>&nbsp;&nbsp;<MKTypography color="white" fontWeight="bold" style={{fontSize:"15px"}}>주차장</MKTypography>
                            </MKButton>
                        </MKBox>
                        <NaverMap
                        defaultCenter={new navermaps.LatLng(loc.lat, loc.lng)}
                        defaultZoom={17}
                        minZoom={14}
                        maxZoom={18}
                        ref={setMap}
                        >
                            <Marker position={new navermaps.LatLng(loc.lat, loc.lng)} 
                                icon={{
                                    content: 
                                    `   
                                        <div style="position: relative;">
                                            <div class="wrap_myloc">
                                            </div>
                                            <div style="position: absolute;">
                                                <img src=${myloc}/ style="width: 2vh; height: 2vh;">
                                            </div>
                                        </div>
                                    `,
                                    anchor: new navermaps.Point(15,15),
                                }}
                                zIndex="-1"
                            />
                            {/* Bank */}
                            {btIsAcitived.bkbutton ? (<>
                            {nearbank.length !== 0 ? nearbank.map((v,idx)=>{
                                return(
                                    <Marker key={idx} position={new navermaps.LatLng(v.geoy,v.geox)}
                                        icon={{
                                            content: 
                                                `<div class=${isClicked !== idx ? "arr" : "arr"+idx}>
                                                    <img src=${ibk} style="margin-left: 0.75vh; width: 2.5vh; height: 2.5vh;"/><p style="margin-top: 0.5vh; margin-left: 0.5vh; font-size: 10px; font-weight: bold;"> IBK기업은행 <br>${v.krnbrm.length > 7 ? v.krnbrm.substring(0,5)+"..." : v.krnbrm}</p>
                                                </div>`,
                                            anchor: new navermaps.Point(30,40),
                                        }}
                                        zIndex="11"
                                        onClick={(e)=>(handlerBankClick(e,v,idx))}
                                    >
                                    </Marker>
                                )
                            }) : ""}
                            </>): ""}
                            {/* Park */}
                            {btIsAcitived.pkbutton ? (<>
                            {nearpark.length !== 0 ? nearpark.map((v,idx)=>{
                                return(
                                    <Marker key={idx} position={new navermaps.LatLng(v.lat,v.lng)}
                                        icon={{
                                            content: 
                                                `<div class=${parkisClicked !== idx ? "parkarr" : "parkarr"+idx}>
                                                    <img src=${parking} style="margin-left: 0.75vh; width: 2.5vh; height: 2.5vh;"/><p style="margin-top: 0.5vh; margin-left: 0.5vh; font-size: 10px; font-weight: bold; margin-right: 0.5vh;">${v.pkname} </p>
                                                </div>`,
                                            anchor: new navermaps.Point(30,40),
                                        }}
                                        zIndex="11"
                                        onClick={(e)=>(handlerParkClick(e,v,idx))}
                                    >
                                    </Marker>
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