import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    //console.log("form", formData);
    const client = await connectToDatabase();
    const db = client.db();
    const usersCollection = db.collection("users");

    const updateResult = await usersCollection.updateOne(
      { email },
      { $set: { image: "" } } // Set the "image" field to an empty string
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Failed to remove photo" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Photo removed successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error removing photo" },
      { status: 500 }
    );
  }
}
