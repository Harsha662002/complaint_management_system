import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("staff");
    const data = await collection.find().toArray();
    console.log(data);
    return NextResponse.json(
      { message: "Users fetched successfully", users: data },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error fetching Users", e);
    return NextResponse.error({ message: "Something went wrong" });
  }
}

export async function POST(req, res) {
  try {
    const { complaint, selectedEmployee } = await req.json();
    console.log("IN route  complaint", complaint);
    console.log("IN route  selectedEmployee", selectedEmployee);
    const EmployeeName = selectedEmployee.name;
    const id = complaint._id;
    const ComplaintDate = complaint.ComplaintDate;
    const Status = "assigned";
    const Email = complaint.Email;
    const Subject = complaint.Subject;
    const Type = complaint.Type;
    const Description = complaint.Description;
    const client = await connectToDatabase();
    const db = client.db();
    const assignCollection = db.collection("assigned");
    const newAssignment = {
      id,
      ComplaintDate,
      Status,
      Email,
      Subject,
      Type,
      Description,
      EmployeeName,
    };
    const result = await assignCollection.insertOne(newAssignment);
    return NextResponse.json(
      { message: "Assigned Complaint successfully", user: newAssignment },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error Assigning Complaint", e);
    return NextResponse.error({ message: "Something went wrong" });
  }
}
