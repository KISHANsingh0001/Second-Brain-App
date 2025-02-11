import { DeleteIcon } from "../icon/DeleteIcon";
import { DocumentIcon } from "../icon/Document";
import { ShareIcon } from "../icon/Shareicon";
import "../App.css"
import { RedirectIcon } from "../icon/Redirecticon";
import { useEffect } from "react";

declare global {
  interface Window {
    twttr: any;
  }
}
interface CardProps {
  _id:string
  title: string;
  link: string;
  type: "twitter" | "youtube"|"Link";
  onDelete: () => void;
}
export const Card = (props: CardProps) => {
  useEffect(() => {
    if (props.type === "twitter" && window.twttr) {
      window.twttr.widgets.load();
    }
  }, [props.type]);

  return (
    <div className="">
      <div className="bg-white rounded-md  border outline-gray-200 max-w-72 p-1 min-h-48 min-w-72 max-h-10 overflow-y-scroll no-scrollbar ">
        <div className="flex justify-between ">
          <div className="flex items-center text-md">
            <div className="pr-2 text-gray-500">
              <DocumentIcon />
            </div>
            {props.title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={props.link} target="_black">
                <RedirectIcon />
              </a>
            </div>
            <div className="pr-2 text-gray-500">
             <div onClick={props.onDelete}><DeleteIcon /></div>
            </div>
          </div>
        </div>
        <div className="p-3">
          
          {props.type == "youtube" && <iframe className="w-full" src={props.link.replace("watch" , "embed").replace("?v=" , "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

          {props.type == "twitter" && <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com" , "twitter.com")}></a>
          </blockquote>}
          <div className="overflow-x-hidden overflow-y-hidden flex justify-center border">
          {props.type == "Link" && <img src="https://cdn.textstudio.com/output/sample/normal/9/2/4/5/link-logo-73-5429.png" />}
          </div>
        </div>
      </div>
    </div>
  );
};
