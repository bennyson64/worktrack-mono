// src/features/works/components/kanban-column.tsx
import { Droppable } from "@hello-pangea/dnd"
import { Card } from "@/components/ui/card"
import { type Work } from "@repo/shared"
import { WorkCard } from "@/components/AddTask/WorkCard"

interface Props {
  title: string
  status: string
  works: Work[]
}

export function KanbanColumn({ title, status, works }: Props) {
  return (
    <Card className="p-4 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">{title}</h2>
        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
          {works.length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-2 min-h-[400px] p-2 rounded-lg transition-all duration-200 ${
              snapshot.isDraggingOver
                ? 'bg-blue-50 border-2 border-dashed border-blue-300'
                : 'bg-gray-50 border-2 border-dashed border-gray-200'
            }`}
          >
            {works.length === 0 && !snapshot.isDraggingOver && (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No tasks yet</p>
                <p className="text-xs mt-1">Drag tasks here</p>
              </div>
            )}
            
            {works.length === 0 && snapshot.isDraggingOver && (
              <div className="text-center py-8 text-blue-400">
                <p className="text-sm font-medium">Drop task here</p>
              </div>
            )}

            {works.map((work, index) => (
              <WorkCard key={work.id} work={work} index={index} />
            ))}
            
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  )
}
