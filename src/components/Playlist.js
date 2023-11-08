import React, { useState } from 'react';
import '../App.css';
import Tracklist from './Tracklist';

function Playlist(props) {
    const myPlaylist = props.myPlaylist;
    const removeSong = props.removeSong;
    const savePlaylist = props.savePlaylist;

    const [playlistName, setPlaylistName] = useState('My Playlist (click to rename)');

    function handleChange(e) {
        setPlaylistName(e.target.value);
    };

    function handleClick(e) {
        savePlaylist(playlistName);
    };

    return (
        <>
            <div className='listWrapper'>
                <input value={playlistName} onChange={handleChange} className='playlistName'></input>
                <Tracklist musicList={myPlaylist} removeSong={removeSong} type='playlist'/>
                <div className='alignCenter'>
                <button className="btn alternate" type="submit" onClick={handleClick} >SAVE TO SPOTIFY</button>
                </div>
            </div>    
        
        </>
    );

};

export default Playlist;