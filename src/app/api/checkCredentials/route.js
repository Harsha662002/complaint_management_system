import { connectToDatabase } from "../../utils/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("users");
    const data = await collection.find().toArray();
    //console.log(data);
    return NextResponse.json(
      { message: "User fetched successfully", user: data },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error fetching useer", e);
    return NextResponse.error({ message: "Something went wrong" });
  }
}

export async function POST(req, response) {
  try {
    const { email, password, userType } = await req.json();
    // console.log("EMail", email);
    // console.log("Password", password);
    // console.log("userType", userType);
    const client = await connectToDatabase();
    const db = client.db();
    let usersCollection = "";
    if (email === "admin@admin.com") {
      usersCollection = db.collection("admin");
    } else {
      if (userType === "employee") {
        usersCollection = db.collection("users");
      } else if (userType === "staff") {
        usersCollection = db.collection("staff");
      }
    }
    const user = await usersCollection.findOne({ email });
    if (!user || user.password !== password) {
      return NextResponse.json({ success: false }, { status: 401 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.log("error", e);
  }
}
