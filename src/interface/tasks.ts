export interface Tasks {
   id: number
   title: string
   dueDate: Date
   description?: string 
   daysLeft?: number
   completed: boolean,
}