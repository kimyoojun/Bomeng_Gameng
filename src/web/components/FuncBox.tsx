function FuncBox () {
    return (
        <div style={{ border: "1px solid #e1e1e1", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "48px", height: "48px", backgroundColor: "#bedbff", borderRadius: "9999px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src="/src/assets/sparkles-2.svg" alt="스파클 아이콘"/>
                </div>
                <h4>
                    AI 맞춤 추천
                </h4>
                <p>
                    당신의 취향에 맞는 여행지를 AI가 추천해드립니다.
                </p>
            </div>
        </div>
    )
}

export default FuncBox
