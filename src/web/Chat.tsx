import { useEffect, useState } from "react";
import OpenAI from "openai";
import supabase from "./lib/supabase";

// 임시 유저 uuid 발급
const user_uuid = "160d0ff2-ed08-4d29-83a4-eceb55c83836"

const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,

    // 현재 api서버 없이 클라이언트에서 api key를 가져와서 위험한상태 
    // // 아래 코드는 위험을 인지하고 있으니 실행하겠다는 뜻 
    // // 테스트용 코드이기 때문에 추후 API 서버를 통해 api key를 가져와야 함 
    dangerouslyAllowBrowser: true,
})

import ChatBox from "./components/ChatBox";

export default function Chat() {
    
    interface messageRecode {
        role: "user" | "assistant"
        content: string
    }

    // 사용자가 채팅시 messageRecode 타입으로 데이터가 담김
    let messages: messageRecode

    // input 칸에 쓰이는 유저의 질문을 실시간으로 받아오기위해 useState 사용
    // messageValue: 유저의 질문을 저장할 변수
    const [ messageValue, setMessage ] = useState("")

    // chatting 배열에 변경 사항이 생기면 UI를 다시 랜더링하기 위해 state사용
    // 사용자의 채팅 내역을 담는 배열
    const [ chatting, setChatting ] = useState<messageRecode[]>([])

    // 채팅 내역이 추가될 떄 실행하는 함수
    const chattingUpdate = (msgs: messageRecode) => {
        setChatting(prev => [...prev, msgs])
    }

    // AI 답변을 저장할 변수
    let messageAnswer: string = ""

    // 처음 마운트될 때 DB에서 채팅내역을 불러옴
    useEffect(() => {
        const selectChat = async () => {
            const { data: chatSelectData, error: chatSelectError } = await supabase
                .from("chatting")
                .select("chat")
                .eq("user_uuid", user_uuid)

            if (chatSelectError) {
                console.log(chatSelectError)
            }

            if (chatSelectData) {
                setChatting(chatSelectData?.[0].chat ?? [])
            }
        }
    selectChat()
    }, []) // []를 빈칸으로 두면 처음 마운트될 때만 실행됨

    const saveMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }
    
    // removeCookie("chattingRecord")
    async function messageSend() {

        // 사용자의 채팅과 role 타입을 담음
        messages = {
            role: "user",
            content: messageValue
        }

        // 사용자의 채팅과 role타입을 채팅 내역에 추가
        chattingUpdate(messages)

        // 변경된 채팅 내역을 DB에 update
        const { error: userChatError } = await supabase
            .from("chatting")
            .update({ chat: chatting })
            .eq("user_uuid", user_uuid)
            .select()

        if (userChatError) {
            console.error(userChatError)
        }

        const response = await client.responses.create({
            model: "gpt-5.4",
            input: messageValue
        })
        messageAnswer = response.output_text

        // AI에 답변과 role 타입을 담음
        messages = {
            role: "assistant",
            content: messageAnswer
        }

        // AI에 답변과 role 타입을 채팅 내역에 추가
        chattingUpdate(messages)

        // 추가된 채팅 내역을 DB에 update
        const { error: assistantChatError } = await supabase
            .from("chatting")
            .update({ chat: chatting })
            .eq("user_uuid", user_uuid)
            .select()

        if (assistantChatError) {
            console.error(assistantChatError)
        }
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
                    <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
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
