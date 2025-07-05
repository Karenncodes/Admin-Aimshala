import { useState } from 'react'
import { User2, Ellipsis, MoveRight } from 'lucide-react'

const AppSidebar = () => {
  const Main = [
    { id: 'link1', icon: User2, name: 'Explorers' },
    { id: 'link2', icon: User2, name: 'Coaches' },
    { id: 'link3', icon: User2, name: 'Organisations' },
    { id: 'link4', icon: User2, name: 'Approvals' },
  ]
  const Product = [
    { id: 'link5', icon: User2, name: 'Assessments' },
    { id: 'link6', icon: User2, name: 'Sessions' },
    { id: 'link7', icon: User2, name: 'Sessions Pool' },
  ]
  const Cms = [
    { id: 'link8', icon: User2, name: 'Insights' },
    { id: 'link9', icon: User2, name: 'Videos Library' },
    { id: 'link10', icon: User2, name: 'In the News' },
    { id: 'link11', icon: User2, name: 'Testimonials' },
    { id: 'link12', icon: User2, name: 'Libraries' },
    { id: 'link13', icon: User2, name: 'Online Surveys' },
    { id: 'link14', icon: User2, name: 'Help Articles' },
    { id: 'link15', icon: User2, name: 'FAQs' },
    { id: 'link16', icon: User2, name: 'Team Members' },
  ]
  const UserR = [
    { id: 'link17', icon: User2, name: 'Reviews' },
    { id: 'link18', icon: User2, name: 'Feedbacks' },
    { id: 'link19', icon: User2, name: 'Problems' },
    { id: 'link20', icon: User2, name: 'Bugs' },
    { id: 'link21', icon: User2, name: 'Abuses' },
  ]
  const Finance = [
    { id: 'link22', icon: User2, name: 'Payments' },
    { id: 'link23', icon: User2, name: 'Payout' },
    { id: 'link24', icon: User2, name: 'Commission' },
  ]

  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSidebar = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-6 left-6 z-50 bg-gray-200 p-2 rounded"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <MoveRight className="h-6 w-6 transition-transform duration-150" />
      </button>

      {/* Sidebar */}
      <nav
        className={`
          fixed md:top-[90px] md:xl:left-[72px] md:lg:left-[50px] md:left-[24px] left-0
          md:h-[calc(100vh-120px)]
          h-[100vh]
          flex flex-col
          px-6 py-4
          gap-6
          transition-all duration-300 ease-in-out
          border bg-white z-40
          ${hovered ? 'md:w-72 overflow-y-auto' : 'md:w-20 overflow-hidden'}
          ${mobileOpen ? 'w-72' : 'w-0'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          overflow-x-hidden
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AddTitle title="main" hovered={hovered || mobileOpen} placeHold={false} />
        <AddLinks data={Main} hovered={hovered || mobileOpen} />

        <AddTitle title="Products" hovered={hovered || mobileOpen} placeHold={true} />
        <AddLinks data={Product} hovered={hovered || mobileOpen} />

        <AddTitle title="Access Code" hovered={hovered || mobileOpen} placeHold={true} />

        <AddTitle title="CMS" hovered={hovered || mobileOpen} placeHold={true} />
        <AddLinks data={Cms} hovered={hovered || mobileOpen} />

        <AddTitle title="Enquiries" hovered={hovered || mobileOpen} placeHold={true} />

        <AddTitle title="User Reports" hovered={hovered || mobileOpen} placeHold={true} />
        <AddLinks data={UserR} hovered={hovered || mobileOpen} />

        <AddTitle title="Finance" hovered={hovered || mobileOpen} placeHold={true} />
        <AddLinks data={Finance} hovered={hovered || mobileOpen} />

        <AddTitle title="Notifications" hovered={hovered || mobileOpen} placeHold={true} />
      </nav>
    </>
  )
}

export default AppSidebar

function AddTitle({
  title,
  hovered,
  placeHold = true,
}: {
  title: string
  hovered: boolean
  placeHold: boolean
}) {
  return (
    <h3
      className={`text-[12px] font-bold tracking-wide uppercase
        ${hovered || placeHold ? 'block' : 'hidden'}
        text-[var(--gray)]`}
    >
      {placeHold ? (hovered ? title : <Ellipsis className="text-[var(--gray2)]" />) : title}
    </h3>
  )
}

function AddLinks({
  data,
  hovered,
}: {
  data: { icon: any; name: string; id: string }[]
  hovered: boolean
}) {
  return (
    <>
      {data.map(({ icon: Icon, name, id }) => (
        <div
          key={id}
          className={`flex items-center min-w-0 ${
            hovered ? 'gap-4' : 'gap-1'
          } transition-all duration-300`}
        >
          <Icon
            className={`shrink-0 w-auto ${hovered ? 'h-5' : 'h-7'} text-[var(--gray2)]`}
            strokeWidth={3}
          />
          <span
            className={`
              text-[18px] font-medium
              transition-all duration-300 ease-in-out
              ${hovered ? 'opacity-100 max-w-full ml-2' : 'opacity-0 max-w-0 ml-0'}
              overflow-hidden
              whitespace-nowrap
              text-[var(--gray2)]
            `}
          >
            {name}
          </span>
        </div>
      ))}
    </>
  )
}