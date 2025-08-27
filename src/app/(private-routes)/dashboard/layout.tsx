import SideMenu from "@/app/components/dashboard/SideMenu";


function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-full bg-gray-100 overflow-y-auto'>
            <SideMenu />
            <div className='flex-1 flex flex-col'>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout;