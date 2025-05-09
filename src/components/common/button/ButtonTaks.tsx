import { Button } from "@/components/ui/button"
import ChromeReaderYellowIcon from "@/components/icons/ChromeReaderYellowIcon"
import ChromeReaderWhiteIcon from "@/components/icons/ChromeReaderWhiteIcon"

type ButtonTaskProps = {
   isActive?: boolean
   onClick: () => void
   isHide?: boolean
}

export default function ButtonTaks({ isActive, onClick, isHide }: ButtonTaskProps) {
   return (
      <div className="flex flex-col items-center">
         {!isHide && <p className="font-lato text-primary-white mb-1">Task</p>}

         {isActive && (
            <div className="absolute w-[60px] h-[60px] rounded-full bg-primary-gray z-0" />
         )}

         <Button
            onClick={onClick}
            className={`w-[60px] h-[60px] rounded-full p-4 shadow transition duration-300 ease-in-out z-10 ${isActive
               ? "bg-indicator-orange hover:bg-indicator-orange/80 ms-7"
               : "bg-primary-white hover:bg-primary-white/80"
               }`}
         >

            {isActive ? <ChromeReaderWhiteIcon /> : <ChromeReaderYellowIcon />}
         </Button>
      </div>
   )
}