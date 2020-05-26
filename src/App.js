import React from 'react';
import axios from 'axios';
import TwitchClient from 'twitch';

function App() {

  let accessToken, getUserId;
  const clientId = "i9hswbac2b2s2n5qzxdq0gtmsepdwu"
  // const clientSecret = "uog8134agr1kbxq3nfge0d9o896ac1"
  const fetchData = () => {

    axios.post('https://id.twitch.tv/oauth2/token?client_id='+clientId+'&client_secret='+clientSecret+'&grant_type=client_credentials').then(results =>{
      accessToken = results.data.access_token
      console.log(accessToken)
    })
  }

  const checkStreamer = async() => {
    const client = TwitchClient.withCredentials(clientId, accessToken);
    const user = await client.helix.users.getUserByName('chrisivey01');
    getUserId = user._data.id
    console.log(getUserId)
    
  }

  const loadStreamers = async() => {
    const client = TwitchClient.withCredentials(clientId, accessToken);
    const stream = await client.kraken.streams.getStreamByChannel(getUserId);
    console.log(stream)

  }


  return (
    <div className="App">
      <button onClick={fetchData}>Fetch me!</button>

      <button onClick={checkStreamer}> Check Streamer </button>

      <button onClick={loadStreamers}> Load streamers </button>
    </div>
  );
}

export default App;
