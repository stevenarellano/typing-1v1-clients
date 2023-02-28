import React from 'react';
import axios from 'axios';
import Game from './game';

const BASEURL = 'https://typing-actuated.herokuapp.com';

const typingString = "Sure! Here's an example React TypeScript component that implements a typing speed test interface";

export default function Main() {
  var config = {
    headers: { 'Access-Control-Allow-Origin': '*' }
  };

  async function sendTest() {
    const res = await axios.get(`${BASEURL}/api`, config);
    console.log(res.data);
  }

  return (<Game text={typingString} />);
}
