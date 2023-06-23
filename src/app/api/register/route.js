import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const image = formData.get("image");

    console.log("DATA", name, username, email, phone, password, image);

    if (!name || !username || !email || !phone || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db();
    const usersCollection = db.collection("users");
    const newUser = {
      name,
      username,
      email,
      phone,
      password,
      image,
    };

    const result = await usersCollection.insertOne(newUser);
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
