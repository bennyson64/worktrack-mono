import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useWorks } from "@/hooks/use-works"
import { getStatusData, getDateData } from "@/lib/dashdata"

export default function Dashboard() {
  const { data: works = [], isLoading, error } = useWorks()

  const status = getStatusData(works)
  const dateData = getDateData(works)

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  const pieData = [
    { name: "Todo", value: status.todo },
    { name: "In Progress", value: status.inprogress },
    { name: "Done", value: status.done },
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Todo</p>
          <p className="text-2xl font-bold">{status.todo}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="text-2xl font-bold">{status.inprogress}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Done</p>
          <p className="text-2xl font-bold">{status.done}</p>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* STATUS PIE */}
        <ResponsiveContainer width="100%" height={350}>
          <Card>
            <div className="h-[350px] p-4">
              <p className="font-medium mb-4">Work by Status</p>

              <ChartContainer
                config={{
                  Todo: { label: "Todo" },
                  "In Progress": { label: "In Progress" },
                  Done: { label: "Done" },
                }}
                className="h-[300px] w-full"
              >
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    strokeWidth={0}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </Card>
        </ResponsiveContainer>

        {/* DATE BAR */}
        <ResponsiveContainer width="100%" height={300}>
          <Card>
            <div className="p-4">
              <p className="font-medium mb-4">Works by Date</p>

              <ChartContainer
                config={{
                  count: { label: "Works" },
                }}
                className="h-[300px] w-full"
              >
                <BarChart data={dateData}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis allowDecimals={false} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </div>
          </Card>
        </ResponsiveContainer>
      </div>

      {/* LIST */}
      <Card className="p-4">
        <p className="font-medium mb-4">All Works</p>

        <div className="space-y-3">
          {works.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between border rounded p-3"
            >
              <div>
                <p className="font-medium">{w.title}</p>
                <p className="text-xs text-muted-foreground">
                  {w.createdAt
                    ? new Date(w.createdAt).toLocaleString()
                    : "—"}
                </p>
              </div>
              <Badge>{w.status}</Badge>
            </div>
          ))}

          {works.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No works yet
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
