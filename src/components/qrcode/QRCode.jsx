import {useState} from "react";
import ResponseModel from "../../interfaces/response.jsx";
import "./QRCode.css";

function QRCode({setResponse}){
    function generateQRCode(event){
        event.preventDefault();
        const text = values.text;
        const width = parseInt(values.width);
        const height = parseInt(values.height);
        const fgColor = values.fgColor;
        const bgColor = values.bgColor;
        let message = "";
        let check = true;
        if(text === undefined || text === null || text === ""){
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


            console.log(text,width,height,fgColor,bgColor);
            const response = new ResponseModel();
            response.message = "Function isn't available.";
            response.check = true;
            setResponse(response);


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
        text:"",
        width:128,
        height:128,
        fgColor:"#000000",
        bgColor:"#ffffff"
    });
    return (
        <div id="data-container">
            <form onSubmit={generateQRCode}>
                <label htmlFor="text">Text</label>
                <textarea name="text" id="text" cols="30" rows="10" value={values.text} onChange={changeValues}></textarea>
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
        </div>
    );
}

export default QRCode