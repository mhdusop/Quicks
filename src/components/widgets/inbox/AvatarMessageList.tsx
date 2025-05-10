import { UserRound } from "lucide-react";

export function AvatarGroup() {
   return (
      <div className="relative w-[44px] h-[34px]">
         <div className="absolute left-0 top-0 w-[34px] h-[34px] bg-primary-light flex items-center justify-center rounded-full z-0">
            <UserRound size={18} className="text-primary-blue" />
         </div>
         <div className="absolute left-4 top-0 w-[34px] h-[34px] bg-primary-blue flex items-center justify-center rounded-full z-10">
            <UserRound size={18} className="text-primary-light" />
         </div>
      </div>
   )
}

export function AvatarSingle({ name }: { name: string }) {
   const initialName = name?.charAt(0).toUpperCase() || "?";

   return (
      <div className="relative w-[34px] h-[34px]">
         <div className="w-[34px] h-[34px] bg-primary-blue flex items-center justify-center rounded-full z-10">
            <span className="text-primary-light text-sm font-medium">{initialName}</span>
         </div>
      </div>
   );
}