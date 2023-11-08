import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

function SearchBar(props) {
    //Import 'token' from App
    const token = props.token;

    //States
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(searchQuery){
            const data = await axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: searchQuery,
                    type: 'track'
                }
            });
            const musicList = data.data.tracks.items;
            props.addSearchResult(musicList);
        } else {props.resetSearch()
        }
        
    };

    function handleChange(e) {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            {!token ? 
            '' 
            : 
            <form className='searchWrap' onSubmit={handleSubmit}>
                <input className='searchBox' placeholder='Search by song, artist or album' type='text' value={searchQuery} onChange={handleChange}></input>
                <button className="btn" type="submit">SEARCH</button>
            </form>
            }
        </>
    );
};

export default SearchBar;