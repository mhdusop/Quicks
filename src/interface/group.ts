import type { Message } from "./message";

export interface Group {
   groupId: string;
   groupName: string;
   isGroup: boolean;
   members: string[];
   messages: Message[];
}