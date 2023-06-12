import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return(
        <div className="p-2">
            <Header />
            <Outlet />
        </div>
    );
}