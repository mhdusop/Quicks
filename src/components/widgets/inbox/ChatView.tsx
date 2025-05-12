import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Group } from "@/interface/group";
import { ArrowLeft, LoaderCircle, X } from "lucide-react";
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
   const [editingMsg, setEditingMsg] = useState<any | null>(null);
   const [isLoadingSupport, setIsLoadingSupport] = useState(false);
   const [replyingMsg, setReplyingMsg] = useState<any | null>(null);
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

   const handleSend = (text: string) => {
      if (!text.trim()) return;

      const readBeforeSend = messages.map(msg => {
         if (msg.sender === "FastVisa Support") {
            setIsLoadingSupport(true);
         }
         return msg.status === "unread" ? { ...msg, status: "read" } : msg;
      });

      let updatedMessages;

      if (editingMsg) {
         updatedMessages = readBeforeSend.map(msg =>
            msg.timestamp === editingMsg.timestamp && msg.sender === editingMsg.sender
               ? { ...msg, text }
               : msg
         );
         setEditingMsg(null);
      } else {
         const newMsg = {
            sender: "You",
            text,
            timestamp: new Date().toISOString(),
            status: "read",
            replyTo: replyingMsg ? {
               sender: replyingMsg.sender,
               text: replyingMsg.text,
               timestamp: replyingMsg.timestamp,
            } : null,
         };
         updatedMessages = [...readBeforeSend, newMsg];
      }

      setReplyingMsg(null);
      setMessages(updatedMessages);
      localStorage.setItem("message", JSON.stringify(updatedMessages));
      setHasUnread(false);
      setShowUnread(false);
      scrollToBottom();
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
         setMessages(updated);
      } catch (e) {
         console.error("Gagal menghapus pesan:", e);
      }
   };

   const handleEdit = (msg: any) => {
      setEditingMsg(msg);
   };

   const handleReply = (msg: any) => {
      setReplyingMsg(msg);
   };

   const readMessages = messages.filter(msg => msg.status !== "unread");
   const unreadMessages = messages.filter(msg => msg.status === "unread");

   return (
      <div className="relative w-full h-full max-w-[734px]">
         <div className="w-full bg-[#ffffff] flex justify-between items-center py-3 border-b border-primary-lightGray rounded-t-lg absolute top-0 left-0 z-20">
            <div className="flex items-center gap-3">
               <Button className="bg-transparent shadow-none hover:bg-transparent" onClick={onBack}>
                  <ArrowLeft color="#333333" size={16} />
               </Button>
               <div className="flex flex-col">
                  <h2 className="font-bold text-md text-primary-blue">{group.groupName}</h2>
                  {group.members.length > 1 ? (
                     <small className="text-primary-gray">{group.members.length} Participant</small>
                  ) : ""}
               </div>
            </div>
            <Button className="bg-transparent shadow-none hover:bg-transparent" onClick={onClose}>
               <X color="#333333" size={16} />
            </Button>
         </div>

         <div className="h-[80vh] max-h-[737px] w-full overflow-y-auto py-20 relative px-6">
            {readMessages.map((msg, idx) => {
               const isReply = !!msg.replyTo;

               return (
                  <div key={`read-${idx}`}>
                     {isReply && (
                        <div className="w-full flex justify-end">
                           <div className="flex flex-col border bg-primary-white border-primary-light p-2 rounded-lg">
                              <div className="text-xs text-primary-gray mb-0.5">Reply to {msg.replyTo.sender}</div>
                              <div className="text-sm text-primary-black truncate">{msg.replyTo.text}</div>
                           </div>
                        </div>
                     )}
                     <ChatBubble
                        msg={msg}
                        formatTime={formatTime}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onReply={handleReply}
                     />
                  </div>
               );
            })}

            {showUnread &&
               unreadMessages.map((msg, idx) => (
                  <div key={`unread-${idx}`}>
                     <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-0.5 my-8 bg-indicator-red border-0 rounded-sm" />
                        <div className="absolute px-4 text-indicator-red -translate-x-1/2 bg-[#ffffff] left-1/2">
                           New Message
                        </div>
                     </div>
                     <ChatBubble
                        msg={msg}
                        formatTime={formatTime}
                        onDelete={handleDelete}
                        onReply={handleReply}
                     />
                  </div>
               ))}

            <div ref={bottomRef} />

            {hasUnread && !showUnread && (
               <div className="absolute bottom-[5rem] w-full flex justify-center z-10">
                  <Button onClick={scrollToBottom} className="bg-[#E9F3FF] cursor-pointer hover:bg-[#E9F3FF]/80 text-primary-blue rounded px-3">
                     New Message
                  </Button>
               </div>
            )}
         </div>

         {isLoadingSupport && (
            <div className="px-6 w-full max-w-[734px] bottom-[12rem] fixed">
               <div className="flex items-center gap-2 bg-stickers-skySoft rounded p-3.5">
                  <LoaderCircle className="text-primary-blue animate-spin" />
                  <span className="text-primary-gray">Please wait while we connect you with one of our team ...</span>
               </div>
            </div>
         )}

         {replyingMsg && (
            <div className="w-full max-w-[40.9rem] bottom-[3.3rem] px-6 absolute z-20">
               <div className="bg-primary-white border border-primary-grayLight rounded-t-lg px-4 py-2 relative">
                  <div className="text-xs text-primary-gray mb-1">Replying to {replyingMsg.sender}</div>
                  <div className="text-sm text-primary-black truncate">{replyingMsg.text}</div>
                  <button
                     className="absolute top-2 right-2 text-primary-gray hover:text-primary-black"
                     onClick={() => setReplyingMsg(null)}
                  >
                     <X size={14} />
                  </button>
               </div>
            </div>
         )}

         <div className="w-full bottom-0 px-6 rounded-b-lg absolute">
            <ChatInput onSend={handleSend} editMsg={editingMsg} />
         </div>
      </div>
   );
}