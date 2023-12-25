import Navbar from "../navbar/Navbar";
import QRCode from "../qrcode/QRCode";
import "./Main.css";

function Main(){
  return (
    <div id="main-container">
      <Navbar></Navbar>
      <QRCode></QRCode>
    </div>
  )
}

export default Main