import React, { useState } from "react";

function Track(props) {
    const music = props.music;
    const type = props.type;
    const addSong = props.addSong;
    const removeSong = props.removeSong;
    const myPlaylist = props.myPlaylist;

    const [showButton, setShowButton] = useState(true);

    function handleClick(e) {
        if (e.target.name === 'Add') {
            addSong(music);
            setShowButton(!showButton);
        } else if (e.target.name === 'Remove') {
            removeSong(music);
        };
    }

    return (
        <>
            <div className="trackWrapper">
                <div>
                    <h3>{music.name}</h3>
                    <p>{music.artists[0].name} | {music.album.name}</p>
                </div>
                {type==='playlist' ? 
                <button name='Remove' className="trackBtn" onClick={handleClick}>-</button>
                :
                showButton && <button name='Add' className="trackBtn" onClick={handleClick}>+</button>
                }
            </div>
        </>
    );
};

export default Track;