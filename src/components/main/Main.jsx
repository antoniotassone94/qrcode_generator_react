import {useState} from "react";
import Navbar from "../navbar/Navbar";
import QRCode1 from "../qrcode1/QRCode1";
import ResponseModel from "../../interfaces/response";
import "./Main.css";

function Main(){
  const [response,setResponse] = useState(new ResponseModel());

  return (
    <div id="main-container">
      <Navbar></Navbar>
      <QRCode1 setResponse={setResponse}></QRCode1>
      <div id="message">
        {(response.check !== undefined) ? ( (response.check === true) ? <div className="success">{response.message}</div> : <div className="error">{response.message}</div> ) : "" }
      </div>
    </div>
  )
}

export default Main