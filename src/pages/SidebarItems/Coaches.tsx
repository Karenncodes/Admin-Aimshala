import StatsCards from "@/components/application-Components/stats-cards"

export default function Coaches() {
    return (
        <div>
            <StatsCards />
            <CoachTable />
        </div>
    )
}

function Buttonbar(){
    return (
        <div></div>
    )
}

function CoachTable() {
    return (
        <div className="mt-4 flex flex-row justify-start gap-4">
            {/* Table */}
            <div>
                Table
            </div>
            {/* Information tabs */}
            <div>
                View mode
            </div>
        </div>
    )
}