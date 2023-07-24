import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const category = formData.get("category");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const image = formData.get("image");

    // console.log("DATA", name, category, email, phone, password, image);

    if (!name || !category || !email || !phone || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    let usersCollection;
    const client = await connectToDatabase();
    const db = client.db();
    if (category !== "Student") {
      usersCollection = db.collection("staff");
    } else {
      usersCollection = db.collection("users");
    }
    const newUser = {
      name,
      email,
      phone,
      category,
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

export async function GET(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("users");
    const data = await collection.find().toArray();
    // console.log(data);
    return NextResponse.json(
      { message: "Users fetched successfully", users: data },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error fetching Users", e);
    return NextResponse.error({ message: "Something went wrong" });
  }
}
