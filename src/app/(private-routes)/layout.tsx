import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions"
import { redirect } from "next/navigation";
import Header from "../components/header";

interface PrivateLayoutProps {
	children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps){
	const session = await getServerSession(nextAuthOptions)

	if (!session) {
		redirect('/')
	}

	return <><Header />{children}</>
}