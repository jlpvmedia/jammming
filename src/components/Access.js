import React, { useEffect} from 'react';
import '../App.css';

function Access(props) {
    const CLIENT_ID = '08da5d9c4c2d480aaaddaa94fa0115cf';
    const REDIRECT_URI = 'https://musical-paprenjak-9e308f.netlify.app/'; //Staging URL
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';
    const SCOPE = 'playlist-modify-public playlist-modify-private'; // Add other scopes here as needed, separated by spaces
    const access_link = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${encodeURIComponent(SCOPE)}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
    
    /*const access_link = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`*/

    let token = props.token;

    useEffect( () => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash){
            //Gets token from URL
            token = hash.substring(1).split("&").find(element => element.startsWith('access_token')).split("=")[1]
            //Store token in local storage
            window.localStorage.setItem('token', token);
            //Cleans the URL
            window.location.hash = "";
        }
        //Adds token to the state
        props.saveToken(token);
    }, );

    function logout() {
      props.saveToken('');
      window.localStorage.removeItem('token');  
    };

    return (
            <>
            {!token ? 
                <div className='searchWrap'>
                    <h1>Log in to use the app{token}</h1>
                    <a href={access_link}><button className='btn green'>LOG IN MY SPOTIFY ACCOUNT</button></a>   
                </div>                
                    : 
                <button className='btn logout' onClick={logout}>Logout</button>
            }

            </>
        
    );

};

export default Access;