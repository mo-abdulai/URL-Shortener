import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard as solidClipboard } from '@fortawesome/free-solid-svg-icons'
import { faClipboard  as regularClipboard } from '@fortawesome/free-regular-svg-icons';


function Copy(props){

    const [isCopied, setIsCopied] = useState(false)
    
    async function copyToClipboard(text){
        if('clipboard' in navigator){
            return await navigator.clipboard.writeText(text);
        }else{
            return document.execCommand('copy', true, text)
        }
    }

    const handleCopyClick = () => {
       
        copyToClipboard(props.text).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false)
            }, 1500)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="App" style={{ display: "flex", alignItems: "center" }}>
            <p style={{marginTop: "10px" }}>{props.text}</p>
            <button style={{ marginBottom: "5px" }} className="btn" onClick={handleCopyClick}>
            <span>{isCopied ? <FontAwesomeIcon icon={solidClipboard} /> : <FontAwesomeIcon icon={regularClipboard} />}</span>
            </button>
        </div>
    )
}

export default Copy;