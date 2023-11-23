import BasicTabs from "@/app/components/basicTabs";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-[calc(100vh-60px)] md:overflow-hidden">
            <div className="w-full h-[7%]">
                <BasicTabs />
            </div>
            <div className="w-full h-[93%] flex-none">
                {children}
            </div>
            
        </div>
    );
}