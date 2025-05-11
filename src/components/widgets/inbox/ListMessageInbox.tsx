import { Dot } from "lucide-react";
import { AvatarGroup, AvatarSingle } from "./AvatarInbox";
import { formatDate } from "@/utils/format-date";
import { inboxData } from "@/utils/inbox-data";
import { useEffect, useState } from "react";
import LoaderComponent from "@/components/shared/LoaderComponent";
import type { Group } from "@/interface/group";

export default function ListMessageInbox({ onSelectGroup }: { onSelectGroup: (group: Group) => void }) {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
   }, []);

   if (isLoading) return (
      <div className="h-[57vh] flex items-center justify-center">
         <LoaderComponent />
      </div>
   );

   return (
      <div className="space-y-3 h-full max-h-[76vh] overflow-y-auto">
         {inboxData.map((group) => {
            const lastMessage = group.messages[group.messages.length - 1];
            return (
               <div
                  key={group.groupId}
                  onClick={() => onSelectGroup(group)}
                  className="border-b border-primary-gray pb-8 flex flex-col items-start cursor-pointer hover:bg-primary-grayLight/10 p-2"
               >
                  <div className="flex items-start gap-[17px] w-full">
                     {group.isGroup ? <AvatarGroup /> : <AvatarSingle name={group.groupName} />}
                     <div className="flex justify-between w-full items-center">
                        <div>
                           <div className="flex items-center gap-5">
                              <div className="text-primary-blue font-semibold">
                                 {group.groupName || group.members.find((m) => m !== "You")}
                              </div>
                              <div className="text-xs text-gray-500">
                                 {formatDate(lastMessage.timestamp)}
                              </div>
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
