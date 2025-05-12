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
import { Textarea } from "@/components/ui/textarea";
import { differenceInCalendarDays } from "date-fns";

interface AccordionTasksProps {
   task: Tasks;
   onDelete: (id: number) => void;
}

export default function AccordionTasks({ task, onDelete }: AccordionTasksProps) {
   const [checked, setChecked] = useState(task.completed);
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(task.dueDate);
   const [description, setDescription] = useState(task.description || "");
   const [isEditingDesc, setIsEditingDesc] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [title, setTitle] = useState(task.title || "");
   const [isEditingTitle, setIsEditingTitle] = useState(false);

   const today = new Date();
   const daysLeft = selectedDate ? differenceInCalendarDays(selectedDate, today) : null;

   useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
   }, []);

   useEffect(() => {
      const tasksInStorage = localStorage.getItem("tasks");
      if (tasksInStorage) {
         const parsed = JSON.parse(tasksInStorage);
         const updated = parsed.map((t: Tasks) =>
            t.id === task.id ? { ...t, title, dueDate: selectedDate, description } : t
         );
         localStorage.setItem("tasks", JSON.stringify(updated));
      }
   }, [selectedDate, description]);

   if (isLoading) {
      return (
         <div className="h-[57vh] flex items-center justify-center">
            <LoaderComponent />
         </div>
      );
   }

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
                        <div className="w-full">
                           {isEditingTitle ? (
                              <input
                                 value={title}
                                 onChange={(e) => setTitle(e.target.value)}
                                 onBlur={() => setIsEditingTitle(false)}
                                 autoFocus
                                 className={`text-sm bg-transparent outline-none border border-primary-gray rounded px-2 py-1 w-full ${checked ? "line-through text-primary-grayLight" : "text-gray-800"
                                    }`}
                              />
                           ) : (
                              <span
                                 className={`text-sm cursor-text ${checked ? "line-through text-primary-grayLight" : "text-gray-800"}`}
                                 onClick={() => setIsEditingTitle(true)}
                              >
                                 {title || "Type Task Title"}
                              </span>
                           )}
                        </div>
                        <div className="flex items-center gap-3 whitespace-nowrap">
                           {!checked && daysLeft !== null && daysLeft > 0 && daysLeft < 11 && (
                              <span className="text-xs text-indicator-red font-medium">
                                 {daysLeft} Days Left
                              </span>
                           )}
                           <span className="text-xs text-primary-grayLight">
                              {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "No date"}
                           </span>
                           <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                        </div>
                     </div>
                  </AccordionTrigger>

                  <Popover>
                     <PopoverTrigger asChild>
                        <Ellipsis className="h-4 w-4 text-muted-foreground absolute -right-0 top-[2px] cursor-pointer" />
                     </PopoverTrigger>
                     <PopoverContent className="w-24 p-2 border border-primary-gray shadow-none me-10">
                        <button
                           onClick={() => onDelete(task.id)}
                           className="text-indicator-red text-sm ms-2"
                        >
                           Delete
                        </button>
                     </PopoverContent>
                  </Popover>
               </div>

               <AccordionContent className="mt-2 ps-7">
                  <div className="flex items-center gap-3 text-xs mb-2">
                     <Clock className="h-4 w-4 text-primary-blue" />
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

                  <div className="flex items-start gap-3">
                     <Pencil className="h-4 w-4 text-primary-blue mt-1" />
                     <div className="flex-1">
                        {isEditingDesc ? (
                           <Textarea
                              className="w-full border border-primary-gray rounded px-2 py-1 text-sm"
                              value={description}
                              autoFocus
                              onBlur={() => setIsEditingDesc(false)}
                              onChange={(e) => setDescription(e.target.value)}
                           />
                        ) : (
                           <p
                              className={`text-primary-gray text-sm ${description ? "" : "italic"}`}
                              onClick={() => setIsEditingDesc(true)}
                           >
                              {description || "No Description"}
                           </p>
                        )}
                     </div>
                  </div>
               </AccordionContent>
            </div>
         </div>
      </AccordionItem>
   );
}