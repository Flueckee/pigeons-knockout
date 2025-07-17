"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Profile from "./profile";


export default async function LoginPage() {
  const cookieStore = await cookies();
  const pbCookie = cookieStore.get("pb_token");

  if (!pbCookie) {
    redirect("/login");
  }

  return <Profile />;
}