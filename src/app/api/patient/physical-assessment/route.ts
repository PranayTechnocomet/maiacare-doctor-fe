// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import apiServer from "@/utils/apis/axiosBackendHelper";
import { parseRequestBody } from "@/utils/apis/requestHandler";
import { handleApiError } from "@/utils/apis/errorHandler";

export async function POST(req: Request) {
  const API_BASE_URL = "/patient/physical-assessment";

  try {
    const body = await parseRequestBody(req);

    const response = await apiServer.post(API_BASE_URL, body);

    return new NextResponse(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleApiError(error);
  }
}






export async function GET(req: Request) {
const API_BASE_URL = "/patient/physical-assessment";

  try {
    const response = await apiServer.get(API_BASE_URL);

    return new NextResponse(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleApiError(error);
  }
}




export async function PUT(req: Request) {
  const API_BASE_URL = "/patient/physical-assessment";

  try {
    // ✅ Parse the body once (let parseRequestBody handle it)
    const body = await parseRequestBody(req);
    console.log("body", body);  
    const response = await apiServer.put(API_BASE_URL, body);
    return new NextResponse(JSON.stringify(response.data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error parsing or updating profile:", error);
    return handleApiError(error);
  }
}









// export async function DELETE(req: Request) {
//   const API_BASE_URL = "/patient/delete";

//   try {
//     // ✅ Parse body if needed (some APIs need id or payload in DELETE)
//     const body = await parseRequestBody(req);
//     console.log("delete body", body);

//     // ⚙️ Axios delete with body (if backend expects body)
//     const response = await apiServer.delete(API_BASE_URL, { data: body });

//     return new NextResponse(JSON.stringify(response.data), {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Error deleting qualification:", error);
//     return handleApiError(error);
//   }
// }