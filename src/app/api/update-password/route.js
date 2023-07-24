import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const { email, newPassword } = await request.json();
    // console.log("email", email);
    // console.log("password new", newPassword);

    const client = await connectToDatabase();
    const db = client.db();
    const usersCollection = db.collection("users");

    const updateResult = await usersCollection.updateOne(
      { email },
      { $set: { password: newPassword } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Failed to update Password" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error updating password" },
      { status: 500 }
    );
  }
}
