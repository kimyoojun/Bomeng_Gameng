import "/src/web/css/btn.css";
import { useState } from "react";

type TopBtnProps = {
        btnName: string
        btnImg: string
        altName: string
        bgColor?: string
        hoverColor?: string
        isInvert?: string
        fontSize?: string
        isBorder?: string
    }

function TopBtn (props:TopBtnProps) {
    const [ isHover, setIsHover ] = useState(false)

    return (
        <button 
        className="tBtn" 
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)} 
        style={{ backgroundColor: isHover ? props.hoverColor ?? "#f0f0f0" : props.bgColor ?? "white", padding: "8px", borderRadius: "6px", fontSize: props.fontSize ?? "15px", fontWeight: "500", color: "black", display: "flex", alignItems: "center", filter: props.isInvert, border: props.isBorder ?? "none" }}>
            <img src={props.btnImg} style={{ marginRight: "15px" }} alt={props.altName}/>
            {props.btnName}
        </button>
    )
}

export default TopBtn
