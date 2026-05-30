import "/src/web/css/btn.css";
import { useState } from "react";

type TopBtnProps = {
        btnName: string
        btnImg: string
        altName: string
        bgColor?: string
        hoverColor?: string
    }

function TopBtn (props:TopBtnProps) {
    const [ isHover, setIsHover ] = useState(false)

    return (
        <a 
        className="tBtn" 
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)} 
        style={{ backgroundColor: isHover ? props.hoverColor ?? "#f0f0f0" : props.bgColor ?? "white", padding: "8px", borderRadius: "6px", fontSize: "15px", fontWeight: "500", color: "black", display: "flex", alignItems: "center" }}>
            <img src={props.btnImg} style={{ marginRight: "15px" }} alt={props.altName}/>
            {props.btnName}
        </a>
    )
}

export default TopBtn
