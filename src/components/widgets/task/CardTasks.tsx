import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Accordion } from "@/components/ui/accordion";
import { tasksData } from "@/utils/tasks-data";
import AccordionTasks from "./AccordionTasks";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { Tasks } from "@/interface/tasks";

export default function CardTasks() {
   const [tasks, setTasks] = useState<Tasks[]>([]);

   useEffect(() => {
      const storedTasks = localStorage.getItem("tasks");

      if (storedTasks) {
         setTasks(JSON.parse(storedTasks));
      } else {
         localStorage.setItem("tasks", JSON.stringify(tasksData));
         setTasks(tasksData);
      }
   }, []);

   const handleAddTask = () => {
      const newTask: Tasks = {
         id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
         title: "Type Task Title",
         completed: false,
         dueDate: new Date,
         description: "",
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
   };

   const handleDeleteTask = (taskId: number) => {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
   };

   return (
      <Card className="w-full h-full max-w-[734px] max-h-[737px] flex flex-col">
         <CardHeader className="flex flex-row justify-between items-center px-8 py-4">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-sm border-primary-gray hover:bg-primary-lightGray">
                     My Tasks
                     <ChevronDown />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuItem>Personal Errands</DropdownMenuItem>
                  <DropdownMenuItem>Urgent To-Do</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
            <Button
               className="text-sm h-8 px-4 bg-primary-blue text-primary-white hover:bg-primary-blue/80"
               onClick={handleAddTask}
            >
               New Task
            </Button>
         </CardHeader>

         <CardContent className="flex-1 overflow-y-auto px-8 pb-6 pt-0">
            <Accordion type="multiple" className="w-full space-y-4">
               {tasks.map((task) => (
                  <AccordionTasks key={task.id} task={task} onDelete={handleDeleteTask} />
               ))}
            </Accordion>
         </CardContent>
      </Card>
   );
}