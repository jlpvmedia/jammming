import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import { useState } from 'react';
import Access from './components/Access';
import axios from 'axios';

function App() {
  const [searchList, setSearchList] = useState([]);
  const [myPlaylist, setMyPlaylist] = useState([]);
  const [token, setToken] = useState('');

  function addSearchResult(data) {
    setSearchList(data);
    console.log(data);
  };

  function addSong(song) {
    setMyPlaylist((prev) => [...prev, song]);
  };

  function removeSong(song) {
    setMyPlaylist((prev) => prev.filter((item)=> item.id !== song.id));
  };

  const savePlaylist = async (playlistName) => {
    //Get User ID
    const USER = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
          Authorization: `Bearer ${token}`
      }
    });
    
    const USER_ID = USER.data.id;

    //Create Playlist in Spotify
    // Playlist details
    const SAVEPLAYLIST_URL = `https://api.spotify.com/v1/users/${USER_ID}/playlists`;
    const playlistDescription = 'My new playlist description';
    const playlistPublic = false; // or false to create a private playlist

    //POST API Call
    fetch(SAVEPLAYLIST_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
        description: playlistDescription,
        public: playlistPublic
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Playlist created!', data);
      console.log('Data id: ',data.id);
      const playlistID = data.id;
      console.log('playlistID: ',playlistID);

          //Add songs to the playlist
              //API Details
              const ADDMUSIC_URL = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

              //Convert playlist into a comma separated list or URIs
              const URI_LIST = myPlaylist.map(item => item.uri);
              console.log(URI_LIST);

              //Post API Call
              fetch(ADDMUSIC_URL, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  uris: URI_LIST
                })
              })
              .then(response => response.json())
              .then(data => {
                console.log('Music added!');
              })
              .catch(error => {
                console.error('Error sending musics', error);
              });

              //Reset playlist once it's sent
              setMyPlaylist([]);
              setSearchList([]);
    })

    .catch(error => {
      console.error('Error creating playlist:', error);
    });
  };

    //Reset search
    const resetSearch = () => {
      setSearchList([]);
    };

  return (
    <>
      <div className='pageWrapper'>
        <Header />
        <SearchBar token={token} resetSearch={resetSearch} addSearchResult={addSearchResult} />
        <Access token={token} saveToken={setToken} />
        <div className='container'>
          <div className='resultWrapper'>
              <div>
                <SearchResults searchList={searchList} myPlaylist={myPlaylist} addSong={addSong} />
              </div>
              <div>
                <Playlist myPlaylist={myPlaylist} savePlaylist={savePlaylist} removeSong={removeSong} />
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
