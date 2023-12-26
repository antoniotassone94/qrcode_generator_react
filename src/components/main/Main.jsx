import {useState} from "react";
import Navbar from "../navbar/Navbar";
import QRCode from "../qrcode/QRCode";
import ResponseModel from "../../interfaces/response";
import "./Main.css";

function Main(){
  const [response,setResponse] = useState(new ResponseModel());

  return (
    <div id="main-container">
      <Navbar></Navbar>
      <QRCode setResponse={setResponse}></QRCode>
      <div id="message">
        {(response.check !== undefined) ? ( (response.check === true) ? <div className="success">{response.message}</div> : <div className="error">{response.message}</div> ) : "" }
      </div>
    </div>
  )
}

export default Main