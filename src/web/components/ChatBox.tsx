type ChatBoxProps = {
    chatText: string
    isRole: string
}

function ChatBox(props: ChatBoxProps) {
    return(
        <div style={{ width: "100%", display: "flex", alignItems: "start", justifyContent: props.isRole == "assistant" ? "start" : "end", gap: "12px", marginBottom: "16px" }}>
            {
                props.isRole == "assistant"
                ? <div style={{ width: "32px", height: "32px", borderRadius: "9999px", backgroundColor: "#dbeafe", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src="/src/assets/chatbot.png" alt="챗봇 아이콘" style={{ width: "24px", height: "24px", filter: "brightness(0) saturate(100%) invert(44%) sepia(73%) saturate(7210%) hue-rotate(217deg) brightness(97%) contrast(103%)" }}/>
                </div>
                : null
            }
            <div style={{ backgroundColor: props.isRole == "assistant" ? "#f6f3f4" : "#155dfc", borderRadius: "16px", padding: "12px 16px" }}>
                <p style={{ textAlign: "start", color: props.isRole == "assistant" ? "black" : "white", fontSize: "16px", whiteSpace: "pre-wrap" }}>
                    {props.chatText}
                </p>
            </div>
        </div>
    )
}

export default ChatBox
