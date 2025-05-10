import {
   Card,
   CardContent,
   CardHeader,
} from "@/components/ui/card"
import SearchField from "@/components/common/input/SearchField"
import ListMessageInbox from "./ListMessageInbox"

export default function CardInbox() {
   return (
      <Card className="w-full h-full max-w-[734px] max-h-[737px] px-[32px] py-[24px]" >
         <CardHeader>
            <SearchField />
         </CardHeader>
         <CardContent>
            <ListMessageInbox />
         </CardContent>
      </Card >
   )
}