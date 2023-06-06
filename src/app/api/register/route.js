import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

// export default async function handler(req, res) {
//   const { method } = req;

//   switch (method) {
//     case "POST":
//       await createUser(req, res);
//       break;
//     case "GET":
//       await getUsers(req, res);
//       break;
//     case "PUT":
//       await updateUser(req, res);
//       break;
//     case "DELETE":
//       await deleteUser(req, res);
//       break;
//     default:
//       res.status(405).json({ message: "Method Not Allowed" });
//       break;
//   }
// }

// export async function POST(request, response) {
//   try {
//     const { name, username, email, phone, password } = await request.json();
//     console.log("DATA", name, username, email, phone, password);

//     if (!name || !username || !email || !phone || !password) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const client = await connectToDatabase();
//     const db = client.db();
//     const usersCollection = db.collection("users");
//     const newUser = {
//       name,
//       username,
//       email,
//       phone,
//       password,
//     };

//     const result = await usersCollection.insertOne(newUser);
//     return NextResponse.json(
//       { message: "User created successfully", user: newUser },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Error creating user" },
//       { status: 500 }
//     );
//   }
// }

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

export async function GET() {
  // const client = await connectToDatabase();
  // const db = client.db();
  // const usersCollection = db.collection("users");

  // try {
  //   const users = await usersCollection.find().toArray();
  //   return NextResponse.json(users);
  // } catch (error) {
  //   return NextResponse.error({ message: "Error retrieving users" });
  // }
  return new Response("HIII");
}

async function updateUser(req, res) {
  const { id } = req.query;
  const { name, username, email, phone, password } = req.body;

  if (!name || !username || !email || !phone || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const client = await connectToDatabase();
  const db = client.db();
  const usersCollection = db.collection("users");

  const updatedUser = {
    name,
    username,
    email,
    phone,
    password,
  };

  try {
    const result = await usersCollection.updateOne(
      { _id: id },
      { $set: updatedUser }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.query;

  const client = await connectToDatabase();
  const db = client.db();
  const usersCollection = db.collection("users");

  try {
    const result = await usersCollection.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
}
