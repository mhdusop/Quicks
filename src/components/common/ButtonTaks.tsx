import { Button } from "@/components/ui/button"
import ChromeReaderYellowIcon from "@/components/icons/ChromeReaderYellowIcon"

export default function ButtonTaks() {
   return (
      <div className="flex flex-col items-center">
         <p className="font-lato mb-1">Task</p>
         <Button className="bg-primary-white w-[60px] h-[60px] rounded-full p-4 shadow hover:bg-primary-white/80 transition duration-300 ease-in-out">
            <ChromeReaderYellowIcon />
         </Button>
      </div>
   )
}