import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("assigned");
    const data = await collection.find().toArray();
    //console.log(data);
    return NextResponse.json(
      {
        message: "Assigned Complaints fetched successfully",
        assignedComplaints: data,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error fetching Assigned Complaints", e);
    return NextResponse.error({ message: "Something went wrong" });
  }
}
