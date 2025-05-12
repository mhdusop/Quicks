"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Accordion } from "@/components/ui/accordion";
import { tasksData } from "@/utils/tasks-data";
import AccordionTasks from "./AccordionTasks";
import { ChevronDown } from "lucide-react";

export default function CardTasks() {
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
                  <DropdownMenuItem>All Tasks</DropdownMenuItem>
                  <DropdownMenuItem>Completed</DropdownMenuItem>
                  <DropdownMenuItem>Pending</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
            <Button className="text-sm h-8 px-4 bg-primary-blue text-primary-white hover:bg-primary-blue/80">New Task</Button>
         </CardHeader>

         <CardContent className="flex-1 overflow-y-auto px-8 py-6">
            <Accordion type="multiple" className="w-full space-y-4">
               {tasksData.map((task) => (
                  <AccordionTasks key={task.id} task={task} />
               ))}
            </Accordion>
         </CardContent>
      </Card>
   );
}