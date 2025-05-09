import { Button } from "@/components/ui/button"
import QuestionAnswerPurpleIcon from "@/components/icons/QuestionAnswerPurpleIcon"
import QuestionAnswerWhiteIcon from "@/components/icons/QuestionAnswerWhiteIcon"

type ButtonInboxProps = {
   isActive?: boolean
   onClick: () => void
   isHide?: boolean
}

export default function ButtonInbox({ isActive, onClick, isHide }: ButtonInboxProps) {
   return (
      <div className="flex flex-col items-center">
         {!isHide && (
            <p className="font-lato text-primary-white mb-1 z-10">Inbox</p>
         )}

         {isActive && (
            <div className="absolute w-[60px] h-[60px] rounded-full bg-primary-gray z-0" />
         )}

         <Button
            onClick={onClick}
            className={`w-[60px] h-[60px] rounded-full p-4 shadow transition duration-300 ease-in-out z-10 relative ${isActive
               ? "bg-indicator-purple hover:bg-indicator-purple/80 left-4 "
               : "bg-primary-white hover:bg-primary-white/80"
               }`}
         >
            {isActive ? <QuestionAnswerWhiteIcon /> : <QuestionAnswerPurpleIcon />}
         </Button>
      </div>
   )
}