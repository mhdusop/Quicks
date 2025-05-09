import { Button } from "@/components/ui/button"
import CloudLightningIcon from "@/components/icons/CloudLightningIcon"

type ButtonQuicksProps = {
   onClick: () => void
}

export default function ButtonQuicks({ onClick }: ButtonQuicksProps) {
   return (
      <Button
         onClick={onClick}
         className="bg-primary-blue w-[68px] h-[68px] rounded-full p-4 shadow hover:bg-primary-blue/80 transition duration-300 ease-in-out"
      >
         <CloudLightningIcon />
      </Button>
   )
}
