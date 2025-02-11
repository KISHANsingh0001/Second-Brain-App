import { ReactElement } from "react";

interface SideBarContent{
    text:string;
    icon:ReactElement;
}
export function SideBarItems({text , icon ,}:SideBarContent){
    return <div className="flex p-1 gap-4 m-4 text-gray-700 hover:bg-gray-200 rounded transition-all ">
          {icon} {text}
    </div>
}