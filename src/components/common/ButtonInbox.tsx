import { Button } from "@/components/ui/button"
import QuestionAnswerPurpleIcon from "@/components/icons/QuestionAnswerPurpleIcon"

export default function ButtonInbox() {
   return (
      <div className="flex flex-col items-center">
         <p className="font-lato mb-1">Inbox</p>
         <Button className="bg-primary-white w-[60px] h-[60px] rounded-full p-4 shadow hover:bg-primary-white/80 transition duration-300 ease-in-out">
            <QuestionAnswerPurpleIcon />
         </Button>
      </div>
   )
}