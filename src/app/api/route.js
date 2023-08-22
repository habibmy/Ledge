import { NextResponse } from "next/server";
import conn from "./db";

export async function GET(request) {
  console.log("GET request received");
  const result = await conn.query("SELECT * FROM expenses");
  return NextResponse.json(result.rows);
}

export async function POST(request) {
  console.log("POST request received");
  const formData = await request.json();
  const description = formData.description;
  const amount = formData.amount;
  const date = formData.date;
  console.log("description", description);
  console.log("amount", amount);
  console.log("date", date);
  try {
    const result = await conn.query(
      "INSERT INTO expenses (description, amount, date) VALUES ($1, $2, $3)",
      [description, amount, date]
    );
    console.log("result", result);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "Error adding expense" });
  }

  return NextResponse.json({ message: "Expense added sucessfully" });
}
