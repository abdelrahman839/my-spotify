import React, { useEffect } from 'react'
import LoginStyle from './Login.module.css'
import { FaSpotify } from 'react-icons/fa'
import IMG from '../../images/music.jpg'
import $ from 'jquery'
function Login() {
    useEffect(() => {
        // $('img').animate({width:"100%"},5000);
    }, [])


    const AUTH_URL =
        "https://accounts.spotify.com/authorize?client_id=e39eac5b47f9486f9d52a565f426f9ae&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


    return (
        <>
            <div className={`${LoginStyle.header}  d-flex justify-content-center align-items-center mb-5`}>
                <FaSpotify className={`${LoginStyle.spotify_logo}`} />
                <h1 className="ml-2">My Spotify</h1>
            </div>
            <div className={`${LoginStyle.loginBtn} position-relative w-50 d-flex flex-column justify-content-center align-items-center  `}>
                <a className="btn mt-5 p-3" href={AUTH_URL}>Login With Spotify</a>
            </div>
            <div  className={`${LoginStyle.header_img_container} p-3 d-flex align-items-center justify-content-center `}>
                <img className={`${LoginStyle.header_img}`} src={IMG}  alt="music pic" />

            </div>
        </>
    )
}

export default Login
