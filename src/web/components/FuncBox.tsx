type FuncBoxProps = {
    boxName: string
    boxInfo: string
    boxImg: string
    boxAlt: string
}

function FuncBox (props: FuncBoxProps) {
    return (
        <div style={{ border: "1px solid #e1e1e1", display: "flex", justifyContent: "center", alignItems: "start" }}>
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "48px", height: "48px", backgroundColor: "#bedbff", borderRadius: "9999px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }}>
                    <img src={props.boxImg} alt={props.boxAlt}/>
                </div>
                <h4 style={{ margin: "0" }}>
                    {props.boxName}
                </h4>
                <p style={{ width: "185px" }}>
                    {props.boxInfo}
                </p>
            </div>
        </div>
    )
}

export default FuncBox
