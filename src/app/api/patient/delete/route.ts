import { NextResponse } from "next/server";
import apiServer from "@/utils/apis/axiosBackendHelper";
import { parseRequestBody } from "@/utils/apis/requestHandler";
import { handleApiError } from "@/utils/apis/errorHandler";

export async function DELETE(req: Request) {
  const API_BASE_URL = "/patient/delete";

  try {
    // ✅ Parse body if needed (some APIs need id or payload in DELETE)
    const body = await parseRequestBody(req);
    console.log("delete body", body);

    // ⚙️ Axios delete with body (if backend expects body)
    const response = await apiServer.delete(API_BASE_URL, { data: body });

    return new NextResponse(JSON.stringify(response.data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting qualification:", error);
    return handleApiError(error);
  }
}
