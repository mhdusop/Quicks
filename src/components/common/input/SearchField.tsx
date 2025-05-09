import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchField() {
   return (
      <div className="flex items-center justify-between relative rounded">
         <Input placeholder="Search" />
         <Search strokeWidth={2.5} className="text-primary-grayLight absolute right-3" size={16} />
      </div>
   )
}