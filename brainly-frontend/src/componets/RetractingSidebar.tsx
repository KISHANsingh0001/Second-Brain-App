import React, { useEffect, useState } from "react";
import { FiChevronsRight, FiHome, FiLink, FiLogOut, FiVideo } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Logo } from "../icon/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import useGetUsername from "../hooks/useGetUsername";
import DarkModeToggle from "./darkMode";
import { BACKEND_URL } from "../config";

interface isShare {
    share: boolean
}

export const SidebarModified = ({ share }: isShare) => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [open, setOpen] = useState<boolean>(true);
    const [selected, setSelected] = useState<string>("Home");
     const [sharedUsername, setSharedUsername] = useState<string>("");
         const [isMobile, setIsMobile] = useState<boolean>(false);
     

    const pathname = window.location.pathname;
    const parts = pathname.split("/");
    const ShareLink = parts[parts.length - 1];

     useEffect(() => {
        if (share) {
            // Fetch username for shared dashboard
            const pathname = window.location.pathname;
            const parts = pathname.split("/");
            const ShareLink = parts[parts.length - 1];
            fetch(`${BACKEND_URL}/api/v1/${ShareLink}`)
                .then(res => res.json())
                .then(data => {
                    if (data.email) {
                        setSharedUsername(data.email.split("@")[0]);
                    }
                })
                .catch(() => setSharedUsername(""));
        }
    }, [share]);
      const { username } = useGetUsername();

    // Update selected based on current route
    // useEffect(() => {
    //     // Determine which section is active based on pathname
    //     if (location.pathname.includes("Youtube") || location.pathname.includes("youtube")) {
    //         setSelected("YouTube");
    //     } else if (location.pathname.includes("Twitter") || location.pathname.includes("twitter")) {
    //         setSelected("Twitter");
    //     } else if (location.pathname.includes("Links") || location.pathname.includes("link")) {
    //         setSelected("Links");
    //     } else if (location.pathname.includes("dashboard") || location.pathname.includes("share")) {
    //         setSelected("Home");
    //     }
    // }, [location.pathname]);
    useEffect(() => {
    // More specific checks first
    if (location.pathname.includes("ShareYoutubeDashboard") || location.pathname.includes("Youtubedashboard") || location.pathname.includes("youtube")) {
        setSelected("YouTube");
    } else if (location.pathname.includes("ShareTwitterDashboard") || location.pathname.includes("Twitterdashboard") || location.pathname.includes("twitter")) {
        setSelected("Twitter");
    } else if (location.pathname.includes("ShareLinkDashboard") || location.pathname.includes("Linksdashboard") || location.pathname.includes("link")) {
        setSelected("Links");
    } else if (
        // Home: only if it's exactly /share/:id or /dashboard
        /^\/share\/[^/]+$/.test(location.pathname) ||
        location.pathname.includes("dashboard")
    ) {
        setSelected("Home");
    }
}, [location.pathname]);

     useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 821;
            setIsMobile(mobile);
            if (mobile) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    // Close sidebar on navigation for mobile
    const handleNavigation = (path: string, title: string) => {
        setSelected(title);
        navigate(path);
        if (isMobile) {
            setOpen(false);
        }
    };

    return <>
    {isMobile && open && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
    <motion.div
        className="dark:bg-darkBackground dark:text-white sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2 md:relative"
        style={{
            width: open ? "250px" : "fit-content",
        }}
        >
        <TitleSection open={open} username={share ? (sharedUsername || "") : (username || "")} />
        <div className="space-y-1">
            {share === false ? (
                <div onClick={() => handleNavigation("/dashboard", "Home")}>
                    <Option Icon={FiHome} title="Home" selected={selected} setSelected={setSelected} open={open} />
                </div>
            ) : (
                <div onClick={() => handleNavigation(`/share/${ShareLink}`, "Home")}>
                    <Option Icon={FiHome} title="Home" selected={selected} setSelected={setSelected} open={open} />
                </div>
            )}

            {share === false ? (
                <div onClick={() => handleNavigation("/Youtubedashboard", "YouTube")}>
                    <Option Icon={FiVideo} title="YouTube" selected={selected} setSelected={setSelected} open={open} />
                </div>
            ) : (
                <div onClick={() => handleNavigation(`/ShareYoutubeDashboard/${ShareLink}`, "YouTube")}>
                    <Option Icon={FiVideo} title="YouTube" selected={selected} setSelected={setSelected} open={open} />
                </div>
            )}

            {share === false ? (
                <div onClick={() => handleNavigation("/Twitterdashboard", "Twitter")}>
                    <Option Icon={FaXTwitter} title="Twitter" selected={selected} setSelected={setSelected} open={open} />
                </div>
            ) : (
                <div onClick={() => handleNavigation(`/ShareTwitterDashboard/${ShareLink}`, "Twitter")}>
                    <Option Icon={FaXTwitter} title="Twitter" selected={selected} setSelected={setSelected} open={open} />
                </div>
            )}

            {share === false ? (
                <div onClick={() => handleNavigation("/Linksdashboard", "Links")}>
                    <Option Icon={FiLink} title="Links" selected={selected} setSelected={setSelected} open={open} />
                </div>
            ) : (
                <div onClick={() => handleNavigation(`/ShareLinkDashboard/${ShareLink}`, "Links")}>
                    <Option Icon={FiLink} title="Links" selected={selected} setSelected={setSelected} open={open} />
                </div>
            )}
        </div>
        {/* @ts-ignore */}
        <ToggleClose open={open} setOpen={setOpen} share={share} />
    </motion.div>
</>
};

const ToggleClose = ({ open, setOpen, share }: ToggleCloseProps) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/signin";
    };
    
    return (
        <motion.div
        layout
            className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors flex items-center justify-between p-2"
        >
            {/* Hide Button */}
            <motion.button
                layout

                /* @ts-ignore */
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center hover:text-blue-300 "
            >
                <motion.div layout className="grid size-10 place-content-center text-xl">
                    {/* @ts-ignore */}
                    <FiChevronsRight className={`transition-transform ${open && "rotate-180"}`} />
                </motion.div>
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="text-lg font-medium"
                    >
                        Hide
                    </motion.span>
                )}
            </motion.button>

            {/* Logout Button */}
            {share == false ? <motion.button
                layout
                onClick={handleLogout}
                className={`flex items-center text-red-600 hover:text-red-800 ${open ? "ml-2" : "justify-center"
                    }`}
            >
                {open && (
                    <motion.div layout
                        initial={{ opacity: 0, y: 11 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="grid size-9 place-content-center text-lg">
                        {/* @ts-ignore */}
                        <FiLogOut className="rotate-180" />
                    </motion.div>
                )}
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 11 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="text-lg font-medium"
                    >
                        Logout
                    </motion.span>
                )}
            </motion.button> : <div></div>}
        </motion.div>
    );
};

type ToggleCloseProps = {
    open: boolean;
    setOpen: boolean;
    share: boolean;
};

const TitleSection = ({ open, username }: TitleSectionProps) => {
   
    return (
        <div className="mb-3 border-b border-slate-300 pb-3 dark:text-white">
            <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors ">
                <div className="flex items-center gap-2">
                    <Logo />
                    {open && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.125 }}
                        >
                            <div className="flex items-center gap-6">
                            <span className="block text-xl font-semibold">Second Brain</span>
                            <div><DarkModeToggle/></div>
                            </div>
                            <span className="block text-xs text-slate-500 dark:text-white">{username}</span>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

type TitleSectionProps = {
    open: boolean;
    username: string;
};

const Option = ({ Icon, title, selected, setSelected, open }: OptionProps) => {
    return (
        <motion.button
            layout
            onClick={() => setSelected(title)}
            className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                selected === title 
                ? "bg-blue-500 text-white dark:bg-blue-600" 
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-blue-600"
            }`}
        >
            <motion.div layout className="grid h-full w-10 place-content-center text-lg">
                <Icon className={selected === title ? "text-white" : "dark:text-white"} />
            </motion.div>
            {open && (
                <motion.span
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className={`text-md font-medium ${selected === title ? "text-white" : "dark:text-white"}`}
                >
                    {title}
                </motion.span>
            )}
        </motion.button>
    );
};

type OptionProps = {
    Icon: React.ElementType;
    title: string;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    open: boolean;
};