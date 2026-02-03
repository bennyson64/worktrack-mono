import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {Input} from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { useUpdateWork } from "@/hooks/use-works"
import {type Work} from "@repo/shared"
export function EditWorkSheet({
  work,
  children,
}: {
  work: Work
  children: React.ReactNode
}) {
  const { mutate: updateWork } = useUpdateWork()

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      title: work.title,
      status: work.status,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateWork({ id: work.id, updates: data })
    } catch (error) {
      console.error("Error updating work:", error)
    }
  })

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Work</SheetTitle>
          <SheetDescription>Update the work item details</SheetDescription>
        </SheetHeader>

        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <Input 
           {...register("title", { 
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters long"
              }
           })} />
          {formState.errors.title && (
            <p className="text-red-500 text-sm">{formState.errors.title.message}</p>
          )}

          <select
            {...register("status")}
            className="w-full border rounded-md p-2"
          >
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <Button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}