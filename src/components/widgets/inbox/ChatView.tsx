import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Group } from "@/interface/group";
import { ArrowLeft, X } from "lucide-react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

interface ChatViewProps {
   group: Group;
   onBack: () => void;
   onClose: () => void;
}

export default function ChatView({ group, onBack, onClose }: ChatViewProps) {
   const [messages, setMessages] = useState(group.messages);
   const [hasUnread, setHasUnread] = useState(false);
   const [showUnread, setShowUnread] = useState(false);
   const bottomRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const unreadExists = messages.some(msg => msg.status === "unread");
      setHasUnread(unreadExists);
   }, [messages]);

   const scrollToBottom = () => {
      setShowUnread(true);
      setHasUnread(false);
      setTimeout(() => {
         bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
   };

   const formatTime = (timestamp: string | number | Date): string => {
      return new Date(timestamp).toLocaleTimeString([], {
         hour: "2-digit",
         minute: "2-digit",
      });
   };

   const handleDelete = (targetMsg: any) => {
      const stored = localStorage.getItem("message");
      if (!stored) return;

      try {
         const parsed = JSON.parse(stored);
         const updated = parsed.filter(
            (m: any) =>
               !(
                  m.sender === targetMsg.sender &&
                  m.timestamp === targetMsg.timestamp &&
                  m.text === targetMsg.text
               )
         );
         localStorage.setItem("message", JSON.stringify(updated));
         setMessages(updated); // Update state agar UI langsung berubah
      } catch (e) {
         console.error("Gagal menghapus pesan:", e);
      }
   };

   const readMessages = messages.filter(msg => msg.status !== "unread");
   const unreadMessages = messages.filter(msg => msg.status === "unread");

   return (
      <div className="relative h-full max-h-[737px]">
         <div className="w-full max-w-[734px] bg-[#ffffff] flex justify-between items-center py-3 border-b border-primary-lightGray rounded-t-lg fixed z-20">
            <div className="flex items-center gap-3">
               <Button className="bg-transparent shadow-none hover:bg-transparent" onClick={onBack}>
                  <ArrowLeft color="#333333" size={16} />
               </Button>
               <div className="flex flex-col">
                  <h2 className="font-bold text-md text-primary-blue">{group.groupName}</h2>
                  <small className="text-primary-gray">{group.members.length} Participant</small>
               </div>
            </div>
            <Button className="bg-transparent shadow-none hover:bg-transparent" onClick={onClose}>
               <X color="#333333" size={16} />
            </Button>
         </div>

         <div className="h-[80vh] max-h-[737px] w-full overflow-y-auto py-16 relative px-4">
            {readMessages.map((msg, idx) => (
               <ChatBubble key={`read-${idx}`} msg={msg} formatTime={formatTime} onDelete={handleDelete} />
            ))}

            {showUnread &&
               unreadMessages.map((msg, idx) => (
                  <div key={`unread-${idx}`}>
                     <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-0.5 my-8 bg-indicator-red border-0 rounded-sm" />
                        <div className="absolute px-4 text-indicator-red -translate-x-1/2 bg-[#ffffff] left-1/2">
                           New Message
                        </div>
                     </div>
                     <ChatBubble msg={msg} formatTime={formatTime} onDelete={handleDelete} />
                  </div>
               ))}

            <div ref={bottomRef} />

            {hasUnread && !showUnread && (
               <div className="absolute bottom-40 w-full flex justify-center z-10">
                  <Button onClick={scrollToBottom} className="bg-[#E9F3FF] cursor-pointer hover:bg-[#E9F3FF]/80 text-primary-blue rounded px-3">
                     New Message
                  </Button>
               </div>
            )}
         </div>

         <div className="w-full max-w-[734px] bottom-[8.5rem] px-4 fixed">
            <ChatInput />
         </div>
      </div>
   );
}