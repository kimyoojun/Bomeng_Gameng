import ChatBox from "./components/ChatBox";

export default function Chat() {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "32px 16px" }}>
                <div style={{ width: "860px", height: "480px", border: "1px solid #e6e6e6", borderRadius: "12px", display: "flex", flexDirection: "column" }}>
                    <div style={{ borderBottom: "1px solid #e6e6e6", padding: "24px" }}>
                        <h4 style={{ margin: 0, width: "100%", display: "flex", justifyContent: "start", gap: "8px", fontSize: "16px", fontWeight: "500", color: "black", textAlign: "center" }}>
                            <img src="/src/assets/chatbot.png" alt="챗봇 아이콘" style={{ width: "24px", height: "24px", filter: "brightness(0) saturate(100%) invert(44%) sepia(73%) saturate(7210%) hue-rotate(217deg) brightness(97%) contrast(103%)" }}/>
                            AI 여행 챗봇
                        </h4>
                    </div>
                    {/* 채팅 박스 영역 */}
                    <div style={{ flex: 1, padding: "24px" }}>
                        <ChatBox chatText="안녕하세요! 👋 여행 계획을 도와드리는 AI 어시스턴트입니다. 어떤 여행을 계획하고 계신가요?"/>
                    </div>
                    <div style={{ borderTop: "1px solid #e6e6e6" }}>
                        <div style={{ padding: "16px", display: "flex", gap: "8px" }}>
                            <input placeholder="여행에 대해 물어보세요..." style={{ width: "100%", backgroundColor: "#f3f3f5", border: "none", borderRadius: "6px", padding: "4px 12px" }}/>
                            <button style={{ borderRadius: "6px", textAlign: "center", border: "none", backgroundColor: "#8d8d8d", padding: "5px 12px" }}>
                                <img src="/src/assets/send.svg" alt="전송 아이콘" style={{ width: "16px", height: "16px", marginTop: "5px", filter: "brightness(0) invert(1)" }}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
