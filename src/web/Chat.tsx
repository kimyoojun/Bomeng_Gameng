import { useEffect, useState, useRef } from "react";
import axios from "axios";

// 임시 유저 uuid 발급
const user_uuid = "160d0ff2-ed08-4d29-83a4-eceb55c83836"

import ChatBox from "./components/ChatBox";

export default function Chat() {
    
    interface messageRecode {
        role: "user" | "assistant"
        content: string
    }

    // input 칸에 쓰이는 유저의 질문을 실시간으로 받아오기위해 useState 사용
    // messageValue: 유저의 질문을 저장할 변수
    const [ messageValue, setMessage ] = useState("")

    // chatting 배열에 변경 사항이 생기면 UI를 다시 랜더링하기 위해 state사용
    // 사용자의 채팅 내역을 담는 배열
    const [ chatting, setChatting ] = useState<messageRecode[]>([])

    const selectChat = async () => {
        try{
            const select_chat = await axios.get(
                `http://127.0.0.1:8000/users/${user_uuid}/chats`
            )

            setChatting(select_chat.data.chat ?? [])
        } catch (error) {
            console.error(error)
        }
    }

    // useRef가 어떤 요소에 적용되는지 <HTMLDivElement>를 사용해서 명시해줌
    const scrollRef = useRef<HTMLDivElement>(null)

    // 자동으로 스크롤 내리는 기능 
    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }

    // 처음 마운트될 때 API서버로 DB 채팅내역 요청을 보냄
    useEffect(() => {
        selectChat()
        scrollToBottom()
    }, []) // []를 빈칸으로 두면 처음 마운트될 때만 실행됨

    useEffect(() => {
        // console.log(chatting)
        scrollToBottom()
    }, [chatting])

    const saveMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }
    
    async function messageSend() {
        setChatting(prev => [...prev, {
            role: "user",
            content: messageValue
        }])

        await axios.post(
            `http://127.0.0.1:8000/users/${user_uuid}/chats`,
            {
                role: "user",
                content: messageValue
            }
        )
        
        selectChat()
    }

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "32px 16px" }}>
                <div style={{ width: "860px", height: "600px", border: "1px solid #e6e6e6", borderRadius: "12px", display: "flex", flexDirection: "column" }}>
                    <div style={{ borderBottom: "1px solid #e6e6e6", padding: "24px" }}>
                        <h4 style={{ margin: 0, width: "100%", display: "flex", justifyContent: "start", gap: "8px", fontSize: "16px", fontWeight: "500", color: "black", textAlign: "center" }}>
                            <img src="/src/assets/chatbot.png" alt="챗봇 아이콘" style={{ width: "24px", height: "24px", filter: "brightness(0) saturate(100%) invert(44%) sepia(73%) saturate(7210%) hue-rotate(217deg) brightness(97%) contrast(103%)" }}/>
                            AI 여행 챗봇
                        </h4>
                    </div>
                    {/* 채팅 박스 영역 */}
                    <div ref={scrollRef} style={{ flex: 1, padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column" }}>
                        <ChatBox isRole="assistant" chatText="안녕하세요! 👋 여행 계획을 도와드리는 AI 어시스턴트입니다. 어떤 여행을 계획하고 계신가요?"/>
                        {chatting?.map((message, index) => (
                            <ChatBox key={index} isRole={message.role} chatText={message.content}/>
                        ))}
                    </div>
                    {/* 채팅 박스 영역 끝 */}
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
