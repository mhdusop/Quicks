import { Dot } from "lucide-react";
import { AvatarGroup, AvatarSingle } from "./AvatarMessageList";
import { formatDate } from "@/utils/formatDate";
import { inboxData } from "@/utils/inbox-data";
import { useEffect, useState } from "react";
import LoaderComponent from "@/components/shared/LoaderComponent";

export default function ListMessageInbox() {
   const [isLoading, setIsLoading] = useState(true)


   useEffect(() => {
      const timer = setTimeout(() => {
         setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
   }, []);

   if (isLoading) return (
      <div className="h-[57vh] flex items-center justify-center">
         <LoaderComponent />
      </div>
   )

   return (
      <div className="w-full max-w-3xl mx-auto space-y-4">
         {inboxData.map((group) => {
            const lastMessage = group.messages[group.messages.length - 1];
            return (
               <div key={group.groupId} className="border-b border-primary-gray pb-8 flex flex-col items-start cursor-pointer hover:bg-primary-grayLight/10 p-2" >
                  <div className="flex items-start gap-[17px] w-full">
                     {group.isGroup ? <AvatarGroup /> : <AvatarSingle name={group.groupName} />}
                     <div className="flex justify-between w-full items-center">
                        <div>
                           <div className="flex items-center gap-5">
                              <div className="text-primary-blue font-semibold">
                                 {group.groupName || group.members.find((m) => m !== "User")}
                              </div>
                              <div className="text-xs text-gray-500">{formatDate(lastMessage.timestamp)}</div>
                           </div>
                           <div>
                              <p className="text-sm text-gray-600">{lastMessage.sender} :</p>
                              <p className="text-xs text-primary-gray">{lastMessage.text}</p>
                           </div>
                        </div>
                        <div className="flex flex-col items-end">
                           {lastMessage.status === "unread" && (
                              <Dot className="text-indicator-red mt-1 w-10 h-10" string={0} />
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   );
}