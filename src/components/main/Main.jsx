import Navbar from "../navbar/Navbar";
import Weather from "../weather/Weather";
import "./Main.css";

function Main(){
  return (
    <div id="main-container">
      <Navbar></Navbar>
      <Weather></Weather>
    </div>
  )
}

export default Main