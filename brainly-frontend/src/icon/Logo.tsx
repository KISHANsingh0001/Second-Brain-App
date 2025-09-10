import { motion } from "framer-motion";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-brain w-9 h-9 text-indigo-600 shrink-0"
            {...props}
        >
            <motion.path 
                d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"
                animate={{ stroke: ["#4f46e5", "#818cf8", "#4f46e5"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
            ></motion.path>
            <motion.path 
                d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"
                animate={{ stroke: ["#4f46e5", "#818cf8", "#4f46e5"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            ></motion.path>
            <motion.path 
                d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"
                animate={{ stroke: ["#4f46e5", "#818cf8", "#4f46e5"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            ></motion.path>
            <motion.path 
                d="M17.599 6.5a3 3 0 0 0 .399-1.375"
                animate={{ stroke: ["#4f46e5", "#818cf8", "#4f46e5"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            ></motion.path>
            <motion.path 
                d="M6.003 5.125A3 3 0 0 0 6.401 6.5"
                animate={{ stroke: ["#4f46e5", "#818cf8", "#4f46e5"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            ></motion.path>
            <motion.path 
                d="M3.477 10.896a4 4 0 0 1 .585-.396"
                animate={{ stroke: ["#4f46e5", "#818cf8", "#4f46e5"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
            ></motion.path>
            <motion.path 
                d="M19.938 10.5a4 4 0 0 1 .585.396"
                animate={{ stroke: ["#4f46e5", "#818cf8", "#4f46e5"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 3 }}
            ></motion.path>
            <motion.path 
                d="M6 18a4 4 0 0 1-1.967-.516"
                animate={{ stroke: ["#4f46e5", "#818cf8", "#4f46e5"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 3.5 }}
            ></motion.path>
            <motion.path 
                d="M19.967 17.484A4 4 0 0 1 18 18"
                animate={{ stroke: ["#4f46e5", "#818cf8", "#4f46e5"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 4 }}
            ></motion.path>
        </svg>
    );
}