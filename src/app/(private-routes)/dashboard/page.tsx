import DashboardContent from '@/app/components/dashboard/DashboardContent'


export default function Dashboard() {
  return (
    <div className="p-3 overflow-hidden w-full md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex flex-col ">
      <div className='flex justify-center items-center rounded w-full h-full'>
        <div className='relative flex justify-end rounded-lg w-full h-full'>
          <DashboardContent />
        </div>
      </div>

    </div>
  )
}