import TopBtn from "./btn/TopBtn"
import FuncBox from "./FuncBox"

function MainBody () {
    return (
        <div style={{ width: "100%", height: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", padding: "80px 16px", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "max-content", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 16px", backgroundColor: "#dbeafe", borderRadius: "9999px", gap: "8px", marginBottom: "24px" }}>
                    <img src="/src/assets/trending-up.svg" alt="상승 화살표 아이콘" style={{ width: "18px", height: "18px", fontSize: "14px", fontWeight: "500", filter: "brightness(0) saturate(100%) invert(22%) sepia(85%) saturate(1475%) hue-rotate(213deg) brightness(97%) contrast(97%)" }}/>
                    <span style={{ color: "#1447e6" }}>
                        AI 기반 스마트 여행 플래너
                    </span>
                </div>
                <h1 style={{ margin: "0 0 24px 0", height: "auto", lineHeight: "1.2", fontSize: "48px", fontWeight: "700" }}>
                    당신만을 위한 완벽한 여행
                </h1>
                <p style={{ fontSize: "20px", marginBottom: "32px" }}>
                    AI와 대화하며 맞춤형 여행지를 추천받고, 자동으로 최적의 일정을 만들어 보세요
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                    <TopBtn btnImg="/src/assets/message-dots.svg" btnName="AI 챗봇 시작하기" altName="메시지 아이콘" isInvert="invert()" fontSize="18px"/>
                    <TopBtn btnImg="/src/assets/calendar-clock.svg" btnName="일정 추천받기" altName="달력 아이콘" fontSize="18px" isBorder="solid 1px #e1e1e1"/>
                </div>
            </div>
            <div>
                <FuncBox/>
            </div>
        </div>
    )
}

export default MainBody
