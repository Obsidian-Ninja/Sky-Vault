
import { useContext, useEffect, useState } from "react";
import { Menu, Share2, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import SideMenu from "./SideMenu.jsx";
import CreditsDisplay from "./CreditsDisplay.jsx";
import { UserCreditsContext } from "../context/UserCreditsContext.jsx";

const Navbar = () => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    const { credits, fetchUserCredits } = useContext(UserCreditsContext);
    const location = useLocation();

    useEffect(() => {
        fetchUserCredits();
    }, [fetchUserCredits]);

    // Close mobile sidebar whenever the page changes
    useEffect(() => {
        setOpenSideMenu(false);
    }, [location.pathname]);

    return (
        <>
            {/* Navbar */}
            <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">

                {/* Left side */}
                <div className="flex items-center gap-5">

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setOpenSideMenu(!openSideMenu)}
                        className="block lg:hidden text-black hover:bg-gray-100 rounded transition-colors"
                    >
                        {openSideMenu ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Share2 className="text-orange-600" />

                        <span className="text-lg font-medium text-black truncate">
                            SkyVault
                        </span>
                    </div>
                </div>

                {/* Right side */}
                <SignedIn>
                    <div className="flex items-center gap-4">

                        <Link to="/subscriptions">
                            <CreditsDisplay credits={credits} />
                        </Link>

                        <UserButton />

                    </div>
                </SignedIn>
            </div>

            {/* Mobile collapsible sidebar */}
            {openSideMenu && (
                <div className="fixed inset-0 z-50 lg:hidden">

                    {/* Background overlay */}
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={() => setOpenSideMenu(false)}
                    />

                    {/* Sidebar drawer */}
                    <div className="absolute top-0 left-0 h-full w-64 bg-white shadow-xl">

                        <button
                            onClick={() => setOpenSideMenu(false)}
                            className="absolute top-4 right-4 z-50 p-2 rounded-full hover:bg-gray-100"
                        >
                            <X size={20} />
                        </button>

                        <SideMenu
                            onMenuClick={() => setOpenSideMenu(false)}
                            isMobile={true}
                        />

                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
