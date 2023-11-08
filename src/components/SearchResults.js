import React from 'react';
import Tracklist from './Tracklist';

function SearchResults(props) {
    const searchList = props.searchList;
    const addSong = props.addSong;
    const myPlaylist = props.myPlaylist;

    return (
        <>
            <div className='listWrapper'>
                <h2 className='marginBottom'>Results</h2>
                <Tracklist musicList={searchList} myPlaylist={myPlaylist} addSong={addSong}  type='searchResult'/>
            </div>    
        </>
    );

};

export default SearchResults;