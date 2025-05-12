import { useEffect, useState } from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { Tasks } from "@/interface/tasks";
import { Calendar as CalendarIcon, ChevronDown, Clock, Ellipsis, Pencil } from "lucide-react";
import LoaderComponent from "@/components/shared/LoaderComponent";

export default function AccordionTasks({ task }: { task: Tasks }) {
   const [checked, setChecked] = useState(task.completed);
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(task.dueDate);

   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
   }, []);

   if (isLoading) return (
      <div className="h-[57vh] flex items-center justify-center">
         <LoaderComponent />
      </div>
   );

   return (
      <AccordionItem value={`task-${task.id}`} className="border-b px-1 !mt-0">
         <div className="w-full flex items-center gap-3 py-5 relative">
            <div className="w-full">
               <div className="w-full flex items-start relative">
                  <Checkbox
                     checked={checked}
                     onCheckedChange={(state) => setChecked(state === true)}
                     className="mr-3 mt-[2px]"
                  />
                  <AccordionTrigger className="py-0">
                     <div className="w-full flex justify-between items-center max-w-[96%]">
                        <span className={`text-sm ${checked ? "line-through text-primary-grayLight" : "text-gray-800"}`}>
                           {task.title}
                        </span>
                        <div className="flex items-center gap-3 whitespace-nowrap">
                           {!checked && task.daysLeft && (
                              <span className="text-xs text-indicator-red font-medium">
                                 {task.daysLeft} Days Left
                              </span>
                           )}
                           <span className="text-xs text-primary-grayLight">
                              {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "No date"}
                           </span>
                           <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                        </div>
                     </div>
                  </AccordionTrigger>
                  <Ellipsis className="h-4 w-4 text-muted-foreground absolute -right-0 top-[2px]" />
               </div>

               <AccordionContent className="mt-2 ps-7">
                  <div className="flex items-center gap-3 text-xs mb-2">
                     <Clock className="h-4 w-4 max-w-4 max-h-4 min-w-4 min-h-4 text-primary-blue" />
                     <Popover>
                        <PopoverTrigger asChild>
                           <Button
                              variant="outline"
                              className="w-[200px] justify-between items-center text-left font-normal"
                           >
                              {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Pick a date"}
                              <CalendarIcon strokeWidth={1.5} />
                           </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                           <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              initialFocus
                           />
                        </PopoverContent>
                     </Popover>
                  </div>
                  <div className="flex items-center gap-3">
                     <Pencil className="h-4 w-4 max-w-4 max-h-4 min-w-4 min-h-4 text-primary-blue" />
                     {task.description ? (
                        <p className="text-primary-gray">{task.description}</p>
                     ) : (
                        <p className="italic text-primary-gray">No Description</p>
                     )}
                  </div>
               </AccordionContent>
            </div>
         </div>
      </AccordionItem>
   );
}