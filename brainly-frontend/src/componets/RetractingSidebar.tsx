import React, { useState } from "react";
import { FiChevronsRight, FiHome, FiLink, FiLogOut, FiVideo } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Logo } from "../icon/Logo";
import { useNavigate } from "react-router-dom";
import useGetUsername from "../hooks/useGetUsername";
interface isShare {
    share: boolean
}
export const SidebarModified = ({ share }: isShare) => {
    const ShareLink = localStorage.getItem("ShareLink");
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(true);
    const [selected, setSelected] = useState<string>("Home");
   
    return <motion.div

        className="sticky top-0 h-screen  shrink-0 border-r border-slate-300 bg-white p-2"
        style={{
            width: open ? "250px" : "fit-content",
        }}
    >
        <TitleSection open={open} />
        <div className="space-y-1">
            {share == false ? 
            <div onClick={() => navigate("/dashboard")} > <Option Icon={FiHome} title="Home" selected={selected} setSelected={setSelected} open={open} /></div> 
            : 
            <div onClick={() => navigate(`/share/${ShareLink}`)}><Option Icon={FiHome} title="Home" selected={selected} setSelected={setSelected} open={open} /></div>}

            {share == false ?
             <div onClick={() => navigate("/Youtubedashboard")}><Option Icon={FiVideo} title="YouTube" selected={selected} setSelected={setSelected} open={open} /></div> 
            :
             <div onClick={()=> navigate("/ShareYoutubeDashboard")}><Option Icon={FiVideo} title="YouTube" selected={selected} setSelected={setSelected} open={open} /></div>}

            {share == false ? 
            <div onClick={() => navigate("/Twitterdashboard")}><Option Icon={FaXTwitter} title="Twitter" selected={selected} setSelected={setSelected} open={open} /></div> : 
            <div onClick={()=> navigate("/ShareTwitterDashboard")}><Option Icon={FaXTwitter} title="Twitter" selected={selected} setSelected={setSelected} open={open} /></div> }

            {share == false ? <div onClick={() => navigate("/Linksdashboard")} ><Option Icon={FiLink} title="Links" selected={selected} setSelected={setSelected} open={open} /></div> : <div onClick={()=> navigate("/ShareLinkDashboard")}><Option Icon={FiLink} title="Links" selected={selected} setSelected={setSelected} open={open} /></div> }
        </div>
        {/* @ts-ignore */}
        <ToggleClose open={open} setOpen={setOpen} share={share} />
    </motion.div>
};
const ToggleClose = ({ open, setOpen , share }: ToggleCloseProps) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/signin";
    };

    return (
        <motion.div
            layout
            className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100 flex items-center justify-between p-2"
        >
            {/* Hide Button */}
            <motion.button
                layout
               
                /* @ts-ignore */
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center"
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
           { share == false ? <motion.button
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
                        LogOut
                    </motion.span>
                )}
            </motion.button> : <div></div>}
        </motion.div>
    );
};

type ToggleCloseProps = {
    open: boolean;
    setOpen:boolean;
    share: boolean;
};

const TitleSection = ({ open }: TitleSectionProps) => {
    const {username} = useGetUsername();
    return (
        <div className="mb-3 border-b border-slate-300 pb-3">
            <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
                <div className="flex items-center gap-2">
                    <Logo />
                    {open && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.125 }}
                        >
                            <span className="block text-xl font-semibold">Second Brain</span>
                            <span className="block text-xs text-slate-500">{username}</span>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

type TitleSectionProps = {
    open: boolean;
};

const Option = ({ Icon, title, selected, setSelected, open }: OptionProps) => {
    return (
        <motion.button
            layout
            onClick={() => setSelected(title)}
            className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"
                }`}
        >
            <motion.div layout className="grid h-full w-10 place-content-center text-lg">
                <Icon />
            </motion.div>
            {open && (
                <motion.span
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="text-md font-medium"
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