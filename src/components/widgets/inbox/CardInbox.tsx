import ChatView from "./ChatView";
import ListMessageInbox from "./ListMessageInbox";
import SearchField from "@/components/common/input/SearchField";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Group } from "@/interface/group";
import { useEffect } from "react";

export default function CardInbox({
   selectedGroup,
   setSelectedGroup,
   setIsInboxActive,
}: {
   selectedGroup: Group | null;
   setSelectedGroup: (group: Group | null) => void;
   setIsInboxActive: (active: boolean) => void;
}) {

   useEffect(() => {
      if (selectedGroup) {
         localStorage.setItem("message", JSON.stringify(selectedGroup.messages));
      } else {
         localStorage.removeItem("message");
      }
   }, [selectedGroup])

   return (
      <Card className={`w-full h-full max-w-[734px] max-h-[737px] ${selectedGroup ? "p-0" : "p-3"} overflow-hidden`}>
         {!selectedGroup && (
            <CardHeader>
               <SearchField />
            </CardHeader>
         )}
         <CardContent className={`h-full overflow-y-auto ${selectedGroup ? "p-0" : ""}`}>
            {selectedGroup ? (
               <ChatView
                  group={selectedGroup}
                  onBack={() => setSelectedGroup(null)}
                  onClose={() => {
                     setSelectedGroup(null)
                     setIsInboxActive(false)
                  }}
               />
            ) : (
               <ListMessageInbox onSelectGroup={(group) => setSelectedGroup(group)} />
            )}
         </CardContent>
      </Card>
   );
}
