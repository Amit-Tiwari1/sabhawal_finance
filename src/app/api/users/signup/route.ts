import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import crypto from "crypto";
import { dbConnect, sequelizeInstance } from "@/dbConfig/dbConfig";
import { writeFile } from "fs/promises";
import path from "path";

dbConnect();

(async () => {
  try {
    await sequelizeInstance.sync({ alter: true });
    console.log("User table created or exists already");
  } catch (error) {
    console.error("Error syncing the database:", error);
  }
})();

export async function POST(request: NextRequest): Promise<NextResponse> {

  try {
    const formData = await request.formData();

    const username = formData.get("username") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const mobilenumber = formData.get("mobilenumber") as string;
    const role = formData.get("role") as string;
    const address1 = formData.get("address1") as string;
    const landmark = formData.get("landmark") as string | undefined;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const pin = formData.get("pin") as string;
    const password = formData.get("password") as string;
    const userpic = formData.get("userpic") as File | null;

    if (!username || !email || !mobilenumber || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const timestamp = new Date().toISOString().replace(/[-:T.]/g, "_");

    let userImageUrl = "";
    if (userpic) {
      const extension = userpic.name.split('.').pop();
      const imageName = `${username}_${timestamp}.${extension}`;
      const imagePath = path.join(process.cwd(), 'public', 'profilepic', 'users', imageName);

      const imageBuffer = Buffer.from(await userpic.arrayBuffer());
      await writeFile(imagePath, imageBuffer);

      userImageUrl = `/profilepic/users/${imageName}`;
    } else {
      userImageUrl = '/profilepic/users/default_profile_pic.png';
    }

    const newUser = await User.create({
      username,
      fullName,
      email,
      mobilenumber,
      role,
      address1,
      landmark: landmark || "",
      city,
      state,
      pin,
      password: hashedPassword,
      userpic: userImageUrl,
      isverified: false,
    });

    // Send verification email
    // await sendEmail({ email, type: "Verify", username });

    return NextResponse.json({
      message:
        "User registered successfully. Please wait for admin verification.",
      status: "200",
      data: newUser,
    });
  } catch (error: unknown) {
    console.error("Error during registration:", (error as Error).message);

    return NextResponse.json(
      { error: (error as Error).message || "Internal server error." },
      { status: 500 }
    );
  }
}
