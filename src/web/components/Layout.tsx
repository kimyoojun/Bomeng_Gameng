import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function Layout() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <TopBar/>
            <div style={{ width: "100%", height: "100%" }}>
                <Outlet/>
            </div>
        </div>
    )
}
