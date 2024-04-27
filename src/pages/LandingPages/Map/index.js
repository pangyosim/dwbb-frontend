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
                    console.log(response.data);
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
                {loc.lat !== 0 ?
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
                        </NaverMap>
                    </MapDiv>
                : <Loading image={loadingimg}/>}
            </MKBox>
        </>
    );
}
export default MapPageBasic;