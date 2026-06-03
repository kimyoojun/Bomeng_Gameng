import { useState } from "react";
import OpenAI from "openai";
import { useCookies } from "react-cookie"

const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,

    // 현재 api서버 없이 클라이언트에서 api key를 가져와서 위험한상태 
    // // 아래 코드는 위험을 인지하고 있으니 실행하겠다는 뜻 
    // // 테스트용 코드이기 때문에 추후 API 서버를 통해 api key를 가져와야 함 
    dangerouslyAllowBrowser: true,
})

import ChatBox from "./components/ChatBox";

export default function Chat() {

    const [ messageValue, setMessage ] = useState("")

    let messageAnswer: string = ""

    const saveMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const [ cookies, setCookie, removeCookie ] = useCookies(["chattingRecord"])

    async function messageSend() {
        const response = await client.responses.create({
            model: "gpt-5.4",
            input: messageValue
        })

        setCookie("chattingRecord", JSON.stringify(messageValue))
        messageAnswer = response.output_text

        setCookie("chattingRecord", JSON.stringify(response.output_text))

        console.log(cookies.chattingRecord)
    }

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
                        {
                            messageValue
                            ? <ChatBox chatText="안녕하세요! 👋 여행 계획을 도와드리는 AI 어시스턴트입니다. 어떤 여행을 계획하고 계신가요?"/>
                            : null
                        }
                        {
                           messageAnswer
                           ? <ChatBox chatText="안녕하세요! 👋 여행 계획을 도와드리는 AI 어시스턴트입니다. 어떤 여행을 계획하고 계신가요?"/>
                           : null 
                        }
                    </div>
                    <div style={{ borderTop: "1px solid #e6e6e6" }}>
                        <div style={{ padding: "16px", display: "flex", gap: "8px" }}>
                            <input onChange={saveMessage} value={messageValue} placeholder="여행에 대해 물어보세요..." style={{ width: "100%", backgroundColor: "#f3f3f5", border: "none", borderRadius: "6px", padding: "4px 12px" }}/>
                            <button onClick={messageSend} style={{ borderRadius: "6px", textAlign: "center", border: "none", backgroundColor: "#8d8d8d", padding: "5px 12px" }}>
                                <img src="/src/assets/send.svg" alt="전송 아이콘" style={{ width: "16px", height: "16px", marginTop: "5px", filter: "brightness(0) invert(1)" }}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
