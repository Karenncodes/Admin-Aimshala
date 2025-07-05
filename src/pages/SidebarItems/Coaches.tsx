import StatsCards from "@/components/application-Components/stats-cards"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { coachTableData } from "@/Data/Data";
import { Badge } from "@/components/ui/badge"
import { Bell, Download, X, ChevronLeft, ChevronRight, Search, ChevronDown, Mars, Venus, Phone, Mail, MessageCircle, Plus, Trash2, Funnel, EllipsisVertical   } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import sample from "@/assets/icon2.png"

export default function Coaches() {
    return (
        <div>
            <div className="py-2 text-2xl">Coaches</div>
            <StatsCards />
            <Buttonbar/>
            <CoachTableSection />
        </div>
    )
}

function Buttonbar() {
    return (
        <div className="flex justify-between px-4 py-3 bg-white rounded-sm my-2 shadow-2xs border">
            <Button variant="blue" size='new'>
                <Plus className="h-3 w-3" />
                <span className="">Add Contacts</span>
            </Button>
            <div className="flex gap-4">
                <Button variant="delete" size='new'>
                    <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="filter" size='new'>
                    <Funnel className="h-3 w-3" />
                    <span className="">Filter</span>
                </Button>
                <Button variant="import" size='new'>
                    <span className="">Import</span>
                </Button>
                <Button variant="more" size='new'>
                    <EllipsisVertical className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

function CoachTableSection() {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: "ascending" | "descending";
    } | null>(null);

    // Sorting logic
    const sortedData = [...coachTableData];
    if (sortConfig !== null) {
        sortedData.sort((a, b) => {
            const aValue = a[sortConfig.key as keyof typeof a];
            const bValue = b[sortConfig.key as keyof typeof b];
            if (aValue < bValue) {
                return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
        });
    }

    const totalPages = Math.ceil(sortedData.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = sortedData.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    const requestSort = (key: string) => {
        let direction: "ascending" | "descending" = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === currentRecords.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(
                currentRecords.map((user): string => user.id.toString())
            );
        }
    };

    const toggleSelectUser = (userId: string) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    return (
        <div className="flex flex-row gap-2 w-full h-max shadow-2xs">
            <div className="flex-1 rounded-md border bg-white">
                <div className="flex items-center justify-between border-b p-5 mt-auto">
                    <div className="flex justify-end items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="select-all"
                                checked={
                                    selectedUsers.length === currentRecords.length &&
                                    currentRecords.length > 0
                                }
                                onCheckedChange={toggleSelectAll}
                            />
                            <label htmlFor="select-all" className="text-sm font-medium">
                                Select All
                            </label>
                            {selectedUsers.length > 0 && (
                                <Badge variant="outline" className="ml-2">
                                    {selectedUsers.length} selected
                                </Badge>
                            )}
                            <div className="flex justify-end items-center gap-4">
                                {selectedUsers.length > 0 && (
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Bell className="mr-2 h-4 w-4" />
                                            Send Notification
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Export Selected
                                        </Button>
                                        <Button variant="destructive" size="sm">
                                            <X className="mr-2 h-4 w-4" />
                                            Mark Inactive
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2 text-sm"
                                >
                                    {recordsPerPage}
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {[5, 10, 25, 50, 100].map((size) => (
                                    <DropdownMenuItem
                                        key={size}
                                        onClick={() => {
                                            setRecordsPerPage(size);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        {size}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="flex justify-around items-center border rounded-md overflow-hidden bg-white shadow-sm">
                            <Input
                                placeholder="Search"
                                className="border-none focus:ring-0 focus-visible:ring-0 focus:outline-none px-2 py-1 w-40 sm:w-45"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                variant="ghost"
                                className="rounded-none rounded-r-md bg-gray-200"
                                aria-label="Search"
                            >
                                <Search className="h-5 w-5 text-gray-500" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40px]"></TableHead>
                                <TableHead
                                    onClick={() => requestSort("profile.name")}
                                    className="cursor-pointer"
                                >
                                    Profile{" "}
                                    {sortConfig?.key === "profile.name" &&
                                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead
                                    onClick={() => requestSort("contact.email")}
                                    className="cursor-pointer"
                                >
                                    Contact{" "}
                                    {sortConfig?.key === "contact.email" &&
                                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead
                                    onClick={() => requestSort("status")}
                                    className="cursor-pointer"
                                >
                                    Status{" "}
                                    {sortConfig?.key === "status" &&
                                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead
                                    onClick={() => requestSort("sessions.total")}
                                    className="cursor-pointer"
                                >
                                    Sessions{" "}
                                    {sortConfig?.key === "sessions.total" &&
                                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead
                                    onClick={() => requestSort("assessments")}
                                    className="cursor-pointer"
                                >
                                    Assessments{" "}
                                    {sortConfig?.key === "assessments" &&
                                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead
                                    onClick={() => requestSort("orgLinked")}
                                    className="cursor-pointer"
                                >
                                    Org Linked{" "}
                                    {sortConfig?.key === "orgLinked" &&
                                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead
                                    onClick={() => requestSort("lastActive")}
                                    className="cursor-pointer"
                                >
                                    Last Active / DOJ{" "}
                                    {sortConfig?.key === "lastActive" &&
                                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentRecords.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedUsers.includes(user.id.toString())}
                                            onCheckedChange={() => toggleSelectUser(user.id.toString())}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 rounded-full bg-gray-200 overflow-hidden">
                                                <img
                                                    src={user.profile.photo}
                                                    alt={user.profile.name}
                                                    className="h-14 w-14 object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex justify-start items-center">
                                                    <div className="font-medium">{user.profile.name}</div>
                                                    <div className="flex items-center gap-1 ">
                                                        {user.profile.gender === "M" ? (
                                                            <Mars className="h-4" />
                                                        ) : (
                                                            <Venus className="h-4" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs font-light"
                                                        >
                                                            {user.profile.type}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <div className="text-gray-500 text-xs">
                                                        {user.specialty}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-start items-center gap-2">
                                                        <div className="text-xs text-gray-900 italic">
                                                            {`@${user.profile.userid}`}
                                                        </div>
                                                    </div>

                                                    {/* <div className="flex justify-start gap-2 mt-1">
                                                        <Button
                                                            variant="text"
                                                            size="xs"
                                                        // onClick={() => navigate(`/user-details/${user.id}`)}
                                                        >
                                                            View
                                                            <span className="sr-only">View</span>
                                                        </Button>
                                                        <Separator
                                                            orientation="vertical"
                                                            thickness="2px"
                                                            length="100px"
                                                        />
                                                        <Button variant="text" size="xs">
                                                            History
                                                            <span className="sr-only">Chat</span>
                                                        </Button>
                                                        <Separator
                                                            orientation="vertical"
                                                            thickness="2px"
                                                            length="80px"
                                                        />
                                                        <Button variant="text" size="xs">
                                                            Flag
                                                            <span className="sr-only">Flag</span>
                                                        </Button>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">{user.contact.email}</div>
                                        <div className="text-xs text-gray-500">
                                            {user.contact.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{user.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            <div>{`${user.sessions.total}`}</div>
                                            <div className="text-xs text-gray-400">{`${user.sessions.completed} Completed`}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">{user.assessments}</div>
                                    </TableCell>
                                    <TableCell>{user.orgLinked}</TableCell>
                                    <TableCell>
                                        <div className="text-sm">{user.lastActive}</div>
                                        <div className="text-xs text-gray-500">{user.joined}</div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between border-t p-4 flex-wrap gap-2">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                            Showing {indexOfFirstRecord + 1}-
                            {Math.min(indexOfLastRecord, sortedData.length)} of{" "}
                            {sortedData.length} explorers
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === currentPage ? "default" : "outline"}
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
            
            {/* View panels */}
            <div className="rounded-md border bg-white px-4 py-6 h-max w-full max-w-md mx-auto">
                <div className="flex flex-col justify-center items-center">
                    <img
                        src={sample}
                        alt="Tonya Noble"
                        className="w-32 h-32 rounded-full object-cover border-4 border-neutral-200 shadow"
                    />
                    <h1 className="text-2xl font-semibold mt-4">Tonya Noble</h1>
                    <h2 className="text-base text-gray-500 mb-2">Nesta Technologies</h2>
                    <div className="flex justify-center gap-3 mt-2">
                        <button className="bg-green-100 rounded p-2" title="Call">
                            <Phone className="w-5 h-5 text-green-500" />
                        </button>
                        <button className="bg-red-100 rounded p-2" title="Email">
                            <Mail className="w-5 h-5 text-red-500" />
                        </button>
                        <button className="bg-yellow-100 rounded p-2" title="Message">
                            <MessageCircle className="w-5 h-5 text-yellow-500" />
                        </button>
                    </div>
                </div>
                <div className="mt-6 p-4">
                    <h3 className="text-sm font-semibold text-gray-600 mb-1 ">PERSONAL INFORMATION</h3>
                    <p className="text-gray-500 text-sm mb-4">
                        Hello, I'm Tonya Noble, The most effective objective is one that is tailored to the job you are applying for. It states what kind of career you are seeking, and what skills and experiences.
                    </p>
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                        <div className="font-medium">Designation</div>
                        <div>Lead Designer / Developer</div>
                        <div className="font-medium">Email ID</div>
                        <div>tanyanoble@velzon.com</div>
                        <div className="font-medium">Phone No</div>
                        <div>414-453-5725</div>
                        <div className="font-medium">Lead Score</div>
                        <div>154</div>
                        <div className="font-medium">Tags</div>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">Lead</Badge>
                            <Badge variant="outline" className="text-xs">Partner</Badge>
                        </div>
                        <div className="font-medium">Last Contacted</div>
                        <div>15 Dec, 2021 <span className="text-xs text-gray-400">08:58AM</span></div>
                    </div>
                </div>
            </div>
        </div>
    );

}