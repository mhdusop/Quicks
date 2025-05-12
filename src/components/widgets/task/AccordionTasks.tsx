import { useState } from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import type { Tasks } from "@/interface/tasks";

export default function AccordionTasks({ task }: { task: Tasks }) {
   const [checked, setChecked] = useState(task.completed);

   return (
      <AccordionItem value={`task-${task.id}`} className="border-b px-1 !mt-0">
         <div className="flex items-start gap-3 py-4">
            <Checkbox
               checked={checked}
               onCheckedChange={(state) => setChecked(state === true)}
            />
            <div className="w-full">
               <AccordionTrigger className="w-full justify-between text-sm font-medium py-0">
                  <span className={`w-full ${checked ? "line-through text-primary-grayLight" : ""}`}>{task.title}</span>
                  <div className="flex items-center gap-4 justify-end w-full me-2">
                     {!checked && task.daysLeft && (
                        <span className="text-xs text-indicator-red">{task.daysLeft} Days Left</span>
                     )}
                     <span className="text-primary-grayLight">{format(task.dueDate, "dd/MM/yyyy")}</span>
                  </div>
               </AccordionTrigger>
               <AccordionContent className="mt-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                     <Calendar
                        mode="single"
                        selected={task.dueDate}
                        className="rounded-md border"
                        disabled
                     />
                     <span>{format(task.dueDate, "dd/MM/yyyy")}</span>
                  </div>
                  {task.description ? (
                     <p className="text-xs text-gray-700">{task.description}</p>
                  ) : (
                     <p className="text-xs italic text-gray-500">No Description</p>
                  )}
               </AccordionContent>
            </div>
         </div>
      </AccordionItem>
   );
}