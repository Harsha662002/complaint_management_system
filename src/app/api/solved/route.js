import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("solved");
    const data = await collection.find().toArray();
    // console.log(data);
    return NextResponse.json(
      {
        message: "Solved Complaints fetched successfully",
        solvedComplaints: data,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error fetching Solved Complaints", e);
    return NextResponse.error({ message: "Something went wrong" });
  }
}
