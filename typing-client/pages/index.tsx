import React from 'react';
import axios from 'axios';

const BASEURL = 'https://typing-actuated.herokuapp.com';

export default function Main() {
  var config = {
    headers: { 'Access-Control-Allow-Origin': '*' }
  };

  async function sendTest() {
    const res = await axios.get(`${BASEURL}/api`, config);
    console.log(res.data);
  }

  return (
    <div>
      asdf
      <button onClick={sendTest}>send</button>
    </div>
  );
}
