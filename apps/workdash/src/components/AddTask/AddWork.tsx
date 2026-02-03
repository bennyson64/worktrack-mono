//shadcn/ui
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



//RHF lib
import { useForm } from "react-hook-form"

//zustand store
import { useAddWork  } from "@/hooks/use-works";
import type { WorkStatus } from "@repo/shared";

interface AddWorkProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddWork({ open, onOpenChange }: AddWorkProps) {
  const { mutate: addWork } = useAddWork();
  const form = useForm<{ title: string; status: WorkStatus }>({
    defaultValues: { title: "", status: "todo" }
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await addWork({ title: data.title, status: data.status })
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error("Error adding work:", error)
    }
  }, (errors) => {
    if (errors.title) {
      return errors
    }
  })
  return (
    
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Add Work</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add work here</DialogTitle>
          <DialogDescription>To add in kanban board add here</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input 
            {...form.register("title", { 
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters long"
              }
            })} 
            placeholder="Title" 
          />
          {form.formState.errors.title && (
            <p className="text-red-500 text-sm">{form.formState.errors.title.message}</p>
          )}

          <select className="m-3" {...form.register("status")}>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Adding..." : "Add Work"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
