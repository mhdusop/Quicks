import { Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
   sender: string;
   timestamp: string;
   text: string;
   status: string;
};

export default function ChatBubble({
   msg,
   formatTime,
   onDelete,
   onEdit
}: {
   msg: Message;
   formatTime: (t: any) => string;
   onDelete?: (msg: Message) => void;
   onEdit?: (msg: Message) => void;
}) {
   const [showMenu, setShowMenu] = useState(false);
   const menuRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowMenu(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const bubbleClass =
      msg.sender === "You"
         ? "bg-chats-purpleLight"
         : msg.sender === "Obaidullah Amarkhil"
            ? "bg-chats-greenLight"
            : "bg-chats-orangeLight";

   const senderClass =
      msg.sender === "You"
         ? "text-chats-purple text-right"
         : msg.sender === "Obaidullah Amarkhil"
            ? "text-chats-green text-left"
            : "text-chats-orange text-left";

   const handleDelete = () => {
      if (onDelete) onDelete(msg);
      setShowMenu(false);
   };

   return (
      <div className="mt-2 relative">
         <p className={`text-sm ${senderClass}`}>{msg.sender}</p>
         <div className="flex items-start relative">
            {msg.sender === "You" && (
               <div className="ms-auto mr-2 relative">
                  <Ellipsis
                     size={14}
                     className="cursor-pointer"
                     onClick={() => setShowMenu(prev => !prev)}
                  />
                  {showMenu && (
                     <div
                        ref={menuRef}
                        className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 shadow-md rounded-md z-10"
                     >
                        <div
                           className="px-3 py-2 hover:bg-gray-100 text-primary-blue cursor-pointer text-sm border-b"
                           onClick={() => {
                              if (onEdit) onEdit(msg);
                              setShowMenu(false);
                           }}
                        >
                           Edit
                        </div>
                        <div
                           className="px-3 py-2 hover:bg-gray-100 text-indicator-red cursor-pointer text-sm"
                           onClick={handleDelete}
                        >
                           Delete
                        </div>
                     </div>
                  )}
               </div>
            )}
            <div className={`p-2 rounded-md max-w-[80%] ${bubbleClass}`}>
               <div className="text-sm">{msg.text}</div>
               <div className={`text-xs text-primary-gray mt-2 ${msg.sender === "You" ? "text-start" : ""}`}>
                  {formatTime(msg.timestamp)}
               </div>
            </div>
            {msg.sender !== "You" && <Ellipsis size={14} className="ms-2 cursor-pointer" />}
         </div>
      </div>
   );
}