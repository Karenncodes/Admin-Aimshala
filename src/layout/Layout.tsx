import Sidebar from "@/layout/Sidebar";
import Navbar from "@/layout/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar/>
            <Sidebar/>
            <main className="flex-1 overflow-auto w-full min-h-screen pt-22 bg-[var(--background-color)] xl:pl-50 lg:pl-[160px] md:pl-[130px] xl:pr-[72px] lg:pr-[50px] px-[24px]">
                <div className="mt-1">
                    {children}
                </div>
            </main>
        </>
    );
}