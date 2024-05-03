import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

import routes from "routes";
import exceptionroutes from "../../../exceptionroutes";
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "pages/Presentation/components/Loading";
import loadingimg from "../../../assets/images/Loading.gif";
import ibk from "../../../assets/images/ibk.png";

function MapPageBasic () {
    const isLogin = localStorage.getItem("token");
    const navermaps = useNavermaps();
    const handlerMarkerClick = () => {
        console.log("Marker Click !");
    }
    const [loc, setLoc] = useState({
        lat: 0,
        lng: 0
    })
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
            axios.post("https://localhost:8080/map-data",{
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
            <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
                {loc.lat !== 0 && nearbank.length !== 0?
                    <MapDiv
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    >
                        <NaverMap
                        defaultCenter={new navermaps.LatLng(loc.lat, loc.lng)}
                        defaultZoom={17}
                        >
                            <Marker position={new navermaps.LatLng(loc.lat, loc.lng)} onClick={handlerMarkerClick} style={{cursor:"pointer"}} />
                            {nearbank.length !== 0 ? nearbank.map((v,idx)=>{
                                return(
                                    <Marker key={idx} position={new navermaps.LatLng(parseFloat(v.geoy),parseFloat(v.geox))} style={{cursor:"pointer"}} 
                                        icon={{
                                            content: 
                                            `<style> 
                                            .arr {
                                                width: 15vh; 
                                                height: 4.5vh;
                                                background: white; 
                                                border-radius: 10vh; 
                                                border: 2px solid #0675f4; 
                                                display: flex; 
                                                transition: 0.1s linear;
                                                align-items: center;
                                            } 
                                            .arr:after{ 
                                                border-top: 5px solid #0675f4;
                                                border-left: 4px solid transparent;
                                                border-right: 4px solid transparent;
                                                content: "";
                                                position: absolute;
                                                top: 41.5px;
                                                left: 30px;
                                            }
                                            .arr:hover{
                                                transform: scale(1.05);
                                            }
                                            </style>
                                                <div class="arr">
                                                    <img src=${ibk} style="margin-left: 0.75vh; width: 2.5vh; height: 2.5vh;"/><p style="margin-top: 0.5vh; margin-left: 1vh; font-size: 12px; font-weight: bold;"> IBK기업은행 <br>${v.krnbrm}</p>
                                                </div>`,
                                                scaledSize: new navermaps.Size(50, 50),
                                        }}
                                    />
                                )
                            }) : ""}
                        </NaverMap>
                    </MapDiv>
                : <Loading image={loadingimg}/>}
            </MKBox>
        </>
    );
}
export default MapPageBasic;