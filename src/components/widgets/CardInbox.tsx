import {
   Card,
   CardContent,
   CardHeader,
} from "@/components/ui/card"
import SearchField from "@/components/common/input/SearchField"
import LoaderComponent from "@/components/shared/LoaderComponent"

export default function CardInbox() {
   return (
      <Card className="w-full h-full max-w-[734px] max-h-[737px] px-[32px] py-[24px]" >
         <CardHeader>
            <SearchField />
         </CardHeader>
         <CardContent>

         </CardContent>
      </Card >
   )
}