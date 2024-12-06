interface ButtonProps {
    variant: "primary" | 'secondary';
    size: "sm" | "md" | "lg";
    text:string;
    startIcon?: any;
    endIcon?:any;
    onClick?: ()=> void;
}
const variantStyles = {
    "primary": "bg-blue-700 text-white text-lg hover:bg-blue-900 transition-all",
    "secondary" : "bg-indigo-200 text-purple-600 text-lg hover:bg-blue-400 transition-all" 
}
const defaultStyles = "rounded-lg p-2 w-38 font-light flex items-center justify-center gap-3 h-12 ";

const sizeStyles = {
    "sm" : "p-2",
     "md": "p-4",
     "lg" : "p-6"
}
export const Button = (props:ButtonProps)=>{
   return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${defaultStyles}  `}>
    {props.startIcon}
    {props.text}
    {props.endIcon}
   </button>
}

{/* <Button variant="primary" size="md" onClick={()=>{}} text={"asd"} /> */}