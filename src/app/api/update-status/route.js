import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const { id, Status, complaint, solvedStaff, comment } =
      await request.json();
    // console.log("id", id);
    // console.log("status", Status);
    // console.log("Complaint", complaint);
    // console.log("solvedStaff", solvedStaff);
    // console.log("comment", comment);

    const client = await connectToDatabase();
    const db = client.db();
    const complaintsCollection = db.collection("complaints");
    const solvedCollection = db.collection("solved");

    const updateResult = await complaintsCollection.updateOne(
      { id },
      { $set: { Status: Status } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Failed to update Status" },
        { status: 400 }
      );
    }

    complaint.Status = Status;
    complaint.StaffSolved = solvedStaff;
    complaint.Comment = comment;
    const insertResult = await solvedCollection.insertOne(complaint);
    if (insertResult.insertedCount === 0) {
      return NextResponse.json(
        { message: "Failed to move complaint to the solved collection" },
        { status: 400 }
      );
    }

    const deleteResult = await complaintsCollection.deleteOne({ id });
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        {
          message: "Failed to remove complaint from the complaints collection",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Status updated, complaint moved to the solved collection, and complaint removed from the complaints collection",
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error updating Status" },
      { status: 500 }
    );
  }
}
