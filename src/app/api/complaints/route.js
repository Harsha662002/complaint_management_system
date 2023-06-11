import { connectToDatabase } from "../../utils/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("complaints");
    const data = await collection.find().toArray();
    console.log(data);
    return NextResponse.json(
      { message: "Complaints fetched successfully", complaints: data },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error fetching complaints", e);
    return NextResponse.error({ message: "Something went wrong" });
  }
}

// export default GET;

export async function POST(request, response) {
  try {
    const formData = await request.json();
    // console.log("Form", formData);
    const id = formData["id"];
    const Email = formData["Email"];
    const ComplaintDate = formData["ComplaintDate"];
    const Status = formData["Status"];
    const subject = formData["subject"];
    const type = formData["type"];
    const description = formData["description"];

    console.log(
      "DATA",
      id,
      Email,
      ComplaintDate,
      Status,
      subject,
      type,
      description
    );

    if (
      !Email ||
      !ComplaintDate ||
      !Status ||
      !subject ||
      !type ||
      !description
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db();
    const complaintCollection = db.collection("complaints");
    //console.log("collection", complaintCollection);
    const newComplaint = {
      id,
      Email,
      ComplaintDate,
      Status,
      subject,
      type,
      description,
    };
    const result = await complaintCollection.insertOne(newComplaint);
    //console.log("res", result);
    return NextResponse.json(
      { message: "Complaint created successfully", complaint: newComplaint },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating complaint" },
      { status: 500 }
    );
  }
}
