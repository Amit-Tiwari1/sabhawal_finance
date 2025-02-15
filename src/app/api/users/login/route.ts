// import { dbConnect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
// import jwt from "jsonwebtoken";

// dbConnect();

// export async function POST(request: NextRequest): Promise<NextResponse> {
//   try {
//     const userData = await request.json();
//     const email = userData.email?.trim(); // Trim email
//     const username = userData.username?.trim(); // Trim username
//     const password = userData.password?.trim(); // Trim password

//     if ((!email && !username) || !password) {
//       return NextResponse.json(
//         { message: "Email or Username and Password are required." },
//         { status: 400 }
//       );
//     }

//     const checkUser = (await User.findOne({
//       where: email ? { email } : { username },
//     })) as User | null;

//     if (!checkUser) {
//       return NextResponse.json(
//         { message: "Invalid email or username." },
//         { status: 404 }
//       );
//     }

//     // Validate password
//     const userGivenPassword = crypto
//       .createHash("sha256")
//       .update(password)
//       .digest("hex");

//     if (userGivenPassword !== checkUser.password) {
//       return NextResponse.json(
//         { message: "Invalid password." },
//         { status: 401 }
//       );
//     }

//     const tokenData = {
//       id: checkUser.id,
//       name: checkUser.username,
//       email: checkUser.email,
//       isverified: checkUser.isverified,
//     };
//     const token = jwt.sign(tokenData, process.env.JWT_SCRET_KEY!, {
//       expiresIn: "1d",
//     });

//     const logInResponse = NextResponse.json({
//       message: "Login successful.",
//       success: true,
//       token,
//     });

//     logInResponse.cookies.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     return logInResponse;
//   } catch (error) {
//     console.error("ERROR:: during login", (error as Error).message);
//     return NextResponse.json(
//       {
//         error: (error as Error).message || "Internal server error during login",
//       },
//       { status: 500 }
//     );
//   }
// }


import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const userData = await request.json();
    const email = userData.email?.trim();
    const username = userData.username?.trim();
    const password = userData.password?.trim();

    if ((!email && !username) || !password) {
      return NextResponse.json(
        { message: "Email or Username and Password are required." },
        { status: 400 }
      );
    }

    const checkUser = (await User.findOne({
      where: email ? { email } : { username },
    })) as User | null;

    if (!checkUser) {
      return NextResponse.json(
        { message: "Invalid email or username." },
        { status: 404 }
      );
    }

    const userGivenPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (userGivenPassword !== checkUser.password) {
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 401 }
      );
    }

    const tokenData = {
      id: checkUser.id,
      name: checkUser.username,
      email: checkUser.email,
      isverified: checkUser.isverified,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SCRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful.",
      success: true,
      token,
    });

    // ✅ Fix: Use Headers for setting cookies
    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; Path=/; SameSite=Strict`
    );

    return response;
  } catch (error) {
    console.error("ERROR:: during login", (error as Error).message);
    return NextResponse.json(
      {
        error: (error as Error).message || "Internal server error during login",
      },
      { status: 500 }
    );
  }
}
