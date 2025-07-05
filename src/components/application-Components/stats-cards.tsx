import { Card, CardHeader } from "@/components/ui/card"
import { Users, UserCheck, UserPlus, MessageSquare, Calendar } from "lucide-react"
import { CircleArrowDown,CircleArrowUp } from "lucide-react"

const color="text-[var(--gray)]";
const color2="text-[var(--gray2)]";

const Up=<CircleArrowUp className="text-[var(--green)] h-3"/>
const Down=<CircleArrowDown className="text-[var(--red)] h-3"/>

const stats = [
  {
    title: "Total Users",
    value: "12,457",
    icon: Users,
    performance:Up,
  },
  {
    title: "Active Learners (30 Days)",
    value: "4,385",
    icon: UserCheck,
    performance:Up,
  },
  {
    title: "New Signups (This Week)",
    value: "312",
    icon: UserPlus,
    performance:Down,
  },
  {
    title: "Total Enquiries",
    value: "642",
    icon: MessageSquare,
    performance:Up,
  },
  {
    title: "Users with Sessions Booked",
    value: "1,205",
    icon: Calendar,
    performance:Down,
  },
]

export default function StatsCards() {
  return (
    <div className="grid gap-4 xl:gap-2 md:grid-cols-2 xl:grid-cols-5 ">
      {stats.map((stat, index) => (
        <Card key={index} className="xl:rounded-sm">
          <CardHeader className="flex-col items-center  gap-3 py-2 h-full">
            <div className="flex justify-between h-full items-center">
              <div className={`${color} text-xs uppercase text-light line-clamp-1`}>{stat.title}</div>
              {stat.performance}
            </div>
            <div className="flex  items-center gap-3">
              <div className={`rounded-full `}>
                <stat.icon className={`h-8 w-8 ${color}`} />
              </div>
              <div className={`${color2} text-2xl`}>{stat.value}</div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

