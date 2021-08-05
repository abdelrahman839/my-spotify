import React, { useEffect, useState } from 'react'
import UseAuth from '../UseAuth/UseAuth'
import SpotifyApi from 'spotify-web-api-node'
import TrackResults from '../TrackResults/TrackResults';
import Player from '../player/Player';
import axios from 'axios';
import Particles from 'react-particles-js';
import particlesConfig from '../ParticlesPrams'
import DashbordStyle from './Dashbord.module.css'
import { FaSearch } from 'react-icons/fa'
const spotifyApi = new SpotifyApi({
    clientId: "e39eac5b47f9486f9d52a565f426f9ae",

})
function Dashbord({ code }) {
    const accessToken = UseAuth(code);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [playingTrack, setPlayingtrack] = useState();
    const [lyrics, setLyrics] = useState("")

    function chooseTrack(track) {
        setPlayingtrack(track);
        setSearch('');
        setLyrics("");
    }
    const searchBtn = () => {
        const search = document.getElementById('search');
        search.style.display="none";
        const allPage = document.getElementById(`${DashbordStyle.allPage}`);
        allPage.style.display="flex";
    }
    useEffect(() => {
        if (!playingTrack) return

        axios
            .get("http://localhost:3001/lyrics", {
                params: {
                    track: playingTrack.title,
                    artist: playingTrack.artist,
                },
            })
            .then(res => {
                setLyrics(res.data.lyrics)
            })
    }, [playingTrack])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResult([])
        if (!accessToken) return
        let cancel = false;
        spotifyApi.searchTracks(search).then(res => {

            if (cancel) return
            setSearchResult(

                res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url
                    }

                })

            )

        })
        return () => cancel = true
    }, [search, accessToken])

    return (

        <>
            <div id="search" className="row justify-content-center align-items-center vh-100 w-100">
                <button  className={`${DashbordStyle.static_search} btn`} onClick={searchBtn}><FaSearch className={`${DashbordStyle.search}`} /></button>

            </div>

            <Particles className={`${DashbordStyle.particals}`} params={particlesConfig} />
            <div id={`${DashbordStyle.allPage}`} className="container  flex-column  p-2 vh-100   justify-content-between mx-auto">
                <div className="position-relative mx-auto w-75 mx-auto">
                    <input className=" w-100 mx-auto" type="search" placeholder="Search Songs/Artistis" onChange={e => setSearch(e.target.value)} />
                    <div className={`${DashbordStyle.search_container}`}><FaSearch className={`${DashbordStyle.search_icon}`}></FaSearch></div>

                </div>
                <div className="my-2 overflow-auto w-75 mx-auto ">
                    {searchResult.map(track => (
                        <TrackResults track={track} key={track.uri} chooseTrack={chooseTrack} />
                    ))}

                    {searchResult.length === 0 && (
                        <div className="text-center w-75 mx-auto text-white" style={{ whiteSpace: "pre" }}>
                            {lyrics}
                        </div>
                    )}
                </div>
                <div>
                    <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
                </div>
            </div>

        </>
    )
}

export default Dashbord
