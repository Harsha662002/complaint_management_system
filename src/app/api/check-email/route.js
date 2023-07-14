import { connectToDatabase } from "../../utils/db";
import { NextResponse } from "next/server";

export async function POST(req, response) {
  try {
    const { email, category } = await req.json();
    console.log("EMail", email);
    console.log("category", category);
    const client = await connectToDatabase();
    const db = client.db();
    let usersCollection;
    if (category !== "Student") {
      usersCollection = db.collection("staff");
    } else {
      usersCollection = db.collection("users");
    }
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false }, { status: 401 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.log(
      "Server Down!! Error in retrieving the database to find the email to check uniqueness",
      e
    );
  }
}
