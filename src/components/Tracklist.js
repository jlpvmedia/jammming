import React, { useState } from 'react';
import Track from './Track';

function Tracklist(props) {
    const musicList = props.musicList;
    const type = props.type;
    const addSong = props.addSong;
    const removeSong = props.removeSong;
    const myPlaylist = props.myPlaylist;

    return (
        <>
            {musicList.map((music)=> <Track music={music} musicList={musicList} myPlaylist={myPlaylist} type={type} addSong={addSong} removeSong={removeSong} key={music.id} /> )}
        </>
    );


};

export default Tracklist;