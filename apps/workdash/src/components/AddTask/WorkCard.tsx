import { Draggable } from "@hello-pangea/dnd"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type Work } from "@repo/shared"
import { EditWorkSheet } from "./editSheet"
import { useDeleteWork } from "@/hooks/use-works"

export function WorkCard({ work, index }: { work: Work; index: number }) {
  const deleteMutation = useDeleteWork()

  return (
    <Draggable draggableId={work.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`mb-3 transition-all duration-200 ${
              snapshot.isDragging
                ? "transform rotate-2 scale-105 shadow-2xl opacity-90"
                : "transform hover:scale-102"
            }`}
          >
            <Card
              className={`p-4 cursor-move transition-all duration-200 ${
                snapshot.isDragging
                  ? "bg-blue-50 border-blue-300 shadow-lg"
                  : "hover:shadow-md hover:border-gray-300 bg-white"
              }`}
            >
              <div {...provided.dragHandleProps}>
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-medium text-sm leading-tight ${
                        snapshot.isDragging
                          ? "text-blue-900"
                          : "text-gray-900"
                      }`}
                    >
                      {work.title}
                    </h3>
                    {work.createdAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(work.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-1 shrink-0">
                    <EditWorkSheet work={work}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-50"
                      >
                        ✏️
                      </Button>
                    </EditWorkSheet>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-red-50 text-red-500"
                      disabled={deleteMutation.isPending}
                      onClick={() => deleteMutation.mutate(work.id)}
                    >
                      🗑️
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )
      }}
    </Draggable>
  )
}
