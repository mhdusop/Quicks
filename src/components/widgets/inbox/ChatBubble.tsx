import { Ellipsis } from "lucide-react";

export default function ChatBubble({ msg, formatTime }: { msg: any; formatTime: (t: any) => string }) {
   let bubbleClass = '';
   let senderClass = '';


   if (msg.sender === "You") {
      bubbleClass = "bg-chats-purpleLight";
      senderClass = "text-chats-purple text-right";
   } else if (msg.sender === "Obaidullah Amarkhil") {
      bubbleClass = "bg-chats-greenLight";
      senderClass = "text-chats-green text-left";
   } else {
      bubbleClass = "bg-chats-orangeLight";
      senderClass = "text-chats-orange text-left";
   }

   return (
      <div className="mt-2">
         <p className={`text-sm ${senderClass}`}>{msg.sender}</p>
         <div className="flex items-start">
            {msg.sender === "You" ? <Ellipsis size={14} className="ms-auto mr-2 cursor-pointer" /> : null}
            <div className={`p-2 rounded-md max-w-[80%] ${bubbleClass}`}>
               <div className="text-sm">{msg.text}</div>
               <div className={`text-xs text-primary-gray mt-2 ${msg.sender === "You" ? "text-start" : ""}`}>{formatTime(msg.timestamp)}</div>
            </div>
            {msg.sender === "You" ? null : <Ellipsis size={14} className="ms-2 cursor-pointer" />}
         </div>
      </div>
   );
}
