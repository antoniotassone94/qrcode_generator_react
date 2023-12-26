import {useState} from "react";
import PropTypes from "prop-types";
import ResponseModel from "../../interfaces/response.jsx";
//import {Buffer} from "buffer";
import QRCode from "react-qr-code";
import "./QRCode1.css";

QRCode1.propTypes = {
    setResponse:PropTypes.func
}

function QRCode1({setResponse}){
    function generateQRCode(event){
        event.preventDefault();
        const content = values.content;
        const width = parseInt(values.width);
        const height = parseInt(values.height);
        const fgColor = values.fgColor;
        const bgColor = values.bgColor;
        let message = "";
        let check = true;
        if(content === undefined || content === null || content === ""){
            message += "The text inserted is invalid.\n";
            check = false;
        }
        if(width === undefined || width === null || width <= 0){
            message += "The width inserted is invalid.\n";
            check = false;
        }
        if(height === undefined || height === null || height <= 0){
            message += "The height inserted is invalid.\n";
            check = false;
        }
        if(fgColor === undefined || fgColor === null || fgColor === ""){
            message += "The foreground color selected is invalid.\n";
            check = false;
        }
        if(bgColor === undefined || bgColor === null || bgColor === ""){
            message += "The background color selected is invalid.\n";
            check = false;
        }
        if(check === true){
            fetch("https://" + import.meta.env.VITE_XRapidAPIHost + "/qr-code",{
                'method':'POST',
                'headers':{
                    'Content-type':'application/json',
                    'X-RapidAPI-Key':import.meta.env.VITE_XRapidAPIKey,
                    'X-RapidAPI-Host':import.meta.env.VITE_XRapidAPIHost
                },
                'body':JSON.stringify({
                    content:content,
                    width:width,
                    height:height,
                    "fg-color":fgColor,
                    "bg-color":bgColor
                })
            })
            .then(response => response.arrayBuffer())
            .then(data => {
                /*const binary = Buffer.from(data); //or Buffer.from(data, 'binary')
                const imageData = new Blob(binary.buffer,{type:"application/png"});
                const link = URL.createObjectURL(imageData);
                //const image = new Image(width,height);
                //image.onload = () => URL.revokeObjectURL(link);
                //image.src = link;
                setImageURL(link);*/

                console.log(data);

                const response = new ResponseModel();
                response.message = "The qr-code has generated correctly with the parameters inserted.";
                response.check = true;
                setResponse(response);
            })
            .catch(error => {
                const response = new ResponseModel();
                response.message = error;
                response.check = false;
                setResponse(response);
            });
        }else{
            const response = new ResponseModel();
            response.message = message;
            response.check = false;
            setResponse(response);
        }
    }

    function changeValues(event){
        const {name,value} = event.target;
        setValues({...values,[name]:value});
    }

    const [values,setValues] = useState({
        content:"",
        width:128,
        height:128,
        fgColor:"#000000",
        bgColor:"#ffffff"
    });
    const [imageURL,setImageURL] = useState("src/assets/images/react.svg");
    return (
        <div id="data-container">
            <form onSubmit={generateQRCode}>
                <label htmlFor="content">Text to convert</label>
                <textarea name="content" id="content" cols="30" rows="10" value={values.content} onChange={changeValues}></textarea>
                <label htmlFor="width">Width</label>
                <input type="number" name="width" id="width" value={values.width} onChange={changeValues}/>
                <label htmlFor="height">Height</label>
                <input type="number" name="height" id="height" value={values.height} onChange={changeValues}/>
                <label htmlFor="fgColor">Foreground color</label>
                <input type="color" name="fgColor" id="fgColor" value={values.fgColor} onChange={changeValues}/>
                <label htmlFor="bgColor">Background color</label>
                <input type="color" name="bgColor" id="bgColor" value={values.bgColor} onChange={changeValues}/>
                <input type="submit" value="Generate QRCode now"/>
            </form>


            {
                //non funziona questa immagine perchè non funziona il form nel trasformare il buffer ricevuto dall'api in immagine
            }
            <img src={imageURL} alt="Image generated from the external api"/>


            {
                //componente react di default presente nel framework per creare qrcode personalizzati
            }
            <QRCode
                bgColor={values.bgColor}
                fgColor={values.fgColor}
                level="L"
                size={parseInt(values.width)}
                title=""
                value={values.content}>
            </QRCode>


        </div>
    );
}

export default QRCode1