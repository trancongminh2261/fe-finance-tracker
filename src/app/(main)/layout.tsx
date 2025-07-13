import "../globals.css";
import Sidebar from "../../components/1_elements/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 bg-gray-100">{children}</div>
        </div>
    );
}
