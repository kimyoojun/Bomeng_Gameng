import "/src/web/css/btn.css";

type TopBtnProps = {
        btnName: string
        btnImg: string
        altName: string
    }



function TopBtn (props:TopBtnProps) {

    
    
    return (
        <a className="tBtn" style={{ padding: "8px", borderRadius: "6px", fontSize: "15px", fontWeight: "500", color: "black", display: "flex", alignItems: "center" }}>
            <img src={props.btnImg} style={{ marginRight: "15px" }} alt={props.altName}/>
            {props.btnName}
        </a>
    )
}

export default TopBtn
