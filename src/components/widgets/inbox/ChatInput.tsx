import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
   onSend: (text: string) => void;
   editMsg?: any;
}

export default function ChatInput({ onSend, editMsg }: ChatInputProps) {
   const [text, setText] = useState("");

   const handleSend = () => {
      if (!text.trim()) return;
      onSend(text);
      setText("");
   };

   useEffect(() => {
      if (editMsg) setText(editMsg.text);
   }, [editMsg]);

   return (
      <div className="flex items-center bg-[#fff] py-4 gap-4">
         <Input
            placeholder="Type a new message"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => {
               if (e.key === "Enter") handleSend();
            }}
            className="border border-primary-grayLight"
         />
         <Button className="bg-primary-blue hover:bg-primary-blue/80" onClick={handleSend}>
            Send
         </Button>
      </div>
   );
}