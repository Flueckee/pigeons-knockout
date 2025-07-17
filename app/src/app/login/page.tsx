"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "./login";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const pbCookie = cookieStore.get("pb_token");

  if (pbCookie) {
    redirect("/");
  }

  return <Login />;
}