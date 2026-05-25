import TopBtn from "./btn/TopBtn"

function TopBar () {
    return(
        <div style={{ width: "100%", height: "64px", borderBottom: "solid 1px #e6e6e6", display: "flex" }}>
            <div style={{  width: "100%", height: "100%", padding: "0 16px", display: "flex", justifyContent: "space-between" }}>
                <a style={{ display: "flex" }}>
                    <img src="/src/assets/map-pin.svg" alt="지도 마커 아이콘" style={{ width: "26px", filter: "invert(26%) sepia(98%) saturate(3810%) hue-rotate(223deg) brightness(100%) contrast(99%)", marginRight: "10px" }}/>
                    <h1 style={{ height: "100%", margin: "0px",display: "flex", textAlign: "center", alignItems: "center", fontSize: "25px", fontWeight: "600" }}>보멍가멍</h1>
                </a>
                <div style={{ height: "100%", display: "flex", alignItems: "center", gap: "8px" }}>
                    <TopBtn btnImg="/src/assets/smart-home.svg" btnName="홈" altName="집 아이콘"/>
                    <TopBtn btnImg="/src/assets/message-dots.svg" btnName="AI 챗봇" altName="메시지 아이콘"/>
                    <TopBtn btnImg="/src/assets/calendar-clock.svg" btnName="일정 추천" altName="달력 아이콘"/>
                </div>
            </div>
        </div>
    )
}

export default TopBar
