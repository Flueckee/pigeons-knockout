"use server";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";

const pb = new PocketBase("https://pocketbase.fluecke.de/");

const PB_TOKEN = "pb_token"

export const loginWithEmail = async (email: string, password: string) => {
  const authData = await pb.collection("users").authWithPassword(email, password);
  const cookieStore = await cookies();

  cookieStore.set("pb_token", authData.token, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
};

export const registerWithEmail = async (email: string, password: string, passwordConfirm: string) => {
  const data = {
    email: email,
    emailVisibility: true,
    firstname: "",
    lastname: "",
    Schlagname: "",
    password: password,
    passwordConfirm: passwordConfirm,
  };

  await pb.collection("users").create(data);
  await pb.collection("users").requestVerification("test@example.com");
};

export const isLoggedIn = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const pbCookie = cookieStore.get("pb_token")

  return pbCookie != undefined

};
