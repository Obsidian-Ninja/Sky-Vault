
import { useUser } from "@clerk/clerk-react";
import { User } from "lucide-react";
import { SIDE_MENU_DATA } from "../assets/data.js";
import { useNavigate, useLocation } from "react-router-dom";

const SideMenu = ({ onMenuClick, isMobile = false }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div
            className={`w-64 bg-white border-r border-gray-200/50 p-5 overflow-y-auto
                ${isMobile
                    ? "h-screen pt-16"
                    : "h-[calc(100vh-61px)] sticky top-[61px]"
                }
            `}
        >

            {/* User Profile */}
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">

                {user?.imageUrl ? (
                    <img
                        src={user.imageUrl}
                        alt="Profile image"
                        className="w-20 h-20 bg-slate-400 rounded-full"
                    />
                ) : (
                    <User className="w-20 h-20 text-gray-500" />
                )}

                <h5 className="text-gray-950 font-medium leading-6">
                    {user?.fullName || ""}
                </h5>

            </div>

            {/* Navigation Menu */}
            {SIDE_MENU_DATA.map((item, index) => {

                const isActive = location.pathname === item.path;

                return (
                    <button
                        key={`menu_${index}`}
                        className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all duration-200 cursor-pointer ${
                            isActive
                                ? "bg-orange-500 text-white font-medium shadow-md hover:bg-orange-600"
                                : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => {
                            navigate(item.path);
                            onMenuClick?.();
                        }}
                    >
                        <item.icon className="text-xl" />
                        {item.label}
                    </button>
                );
            })}

        </div>
    );
};

export default SideMenu;
