'use server'

import { signIn, signOut } from "../../../auth";
import connectMongoDB from "../../../config/mongodb";

export async function doLogout() {
    await signOut({ redirectTo: "/ "});
    console.log("User is logged out!");
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
        await connectMongoDB();
        const response = await signIn("credentials", {
            username,
            password,
            redirect: false
        });
        return response;
    }  catch (err: any) {
        throw err;
    }
}