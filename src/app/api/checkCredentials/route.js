import { connectToDatabase } from "../../utils/db";
import { NextResponse } from "next/server";

export async function POST(req, response) {
  try {
    const { email, password } = await req.json();
    console.log("EMail", email);
    console.log("Password", password);
    const client = await connectToDatabase();
    const db = client.db();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email });
    // console.log("User", user);
    // console.log("!user", !user);
    // console.log("user.password", user.password !== password);
    if (!user || user.password !== password) {
      return NextResponse.json({ success: false }, { status: 401 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.log("error", e);
  }
}
