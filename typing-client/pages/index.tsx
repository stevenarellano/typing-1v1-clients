import axios from 'axios';

export default function Main() {

  async function sendTest() {
    const res = await axios.get('http://localhost:3000/api');
    console.log(res.data);
  }

  return (
    <div>
      asdf
      <button onClick={sendTest}>send</button>
    </div>
  );
}
