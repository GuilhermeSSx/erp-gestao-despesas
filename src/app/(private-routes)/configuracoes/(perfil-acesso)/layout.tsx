import BasicTabs from "@/app/components/basicTabs";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-[calc(100vh-60px)] md:overflow-hidden">
            <div className="w-full h-fit">
                <BasicTabs />
            </div>
            <div className="w-full h-full flex-none bg-slate-50">
                {children}
            </div>
            
        </div>
    );
}