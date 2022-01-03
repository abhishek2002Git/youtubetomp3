import "./App.css";
import { useState } from "react";

function App() {
  const [videoid, setVideoid] = useState({ id: "" });
  const onChange = (e) => {
    setVideoid({ ...videoid, [e.target.name]: e.target.value });
  };
  const [message, setMessage] = useState("")
  const getlink = async () => {
    if (videoid.id==="") {
      setMessage("Please enter a valid youtube video link")
    }
    else if (videoid.id.substring(0,17)!=="https://youtu.be/") {
      setMessage("Please enter a valid youtube video link")
    }
    else{
      const response = await fetch(
        `https://youtube-mp36.p.rapidapi.com/dl?id=${videoid.id.substr(17)}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          },
        }
      );
      const json = await response.json();
      window.open(json.link, "_self");
    }
  };
  return (
    <div className="container">
      <h1>YouTube to MP3</h1>
      <input
        className="input"
        type="text"
        id="id"
        name="id"
        onChange={onChange}
        placeholder=" Enter youtube video link"
        value={videoid.id}
      />
      
      <div><button className="btn" onClick={getlink}>Download</button></div>
      <div className="message">{message}</div>
    </div>
  );
}

export default App;
