import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions"
import { redirect } from "next/navigation";
import Header from "../components/layouts/Header";

interface PrivateLayoutProps {
	children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps){
	const session = await getServerSession(nextAuthOptions)

	if (!session) {
		redirect('/')
	}

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<main className="flex-1 overflow-auto">
				{children}
			</main>
		</div>
	)
}
