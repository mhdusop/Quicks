import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatInput() {
   return (
      <div className="flex items-center gap-4">
         <Input placeholder="Type a new message" />
         <Button className="bg-primary-blue hover:bg-primary-blue/80">Send</Button>
      </div>
   )
}