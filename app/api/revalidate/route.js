import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { route } = await req.json()
    revalidatePath(route)
    return NextResponse.json({status: 200})
}