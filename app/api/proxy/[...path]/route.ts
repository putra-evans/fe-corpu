import { NextResponse } from "next/server";

const BASE_URL = process.env.API_BASE_URL;

if (!BASE_URL) {
  throw new Error("API_BASE_URL belum diset");
}

export async function GET(req: Request, context: any) {
  return handleRequest(req, context, "GET");
}

export async function POST(req: Request, context: any) {
  return handleRequest(req, context, "POST");
}

export async function PUT(req: Request, context: any) {
  return handleRequest(req, context, "PUT");
}

export async function DELETE(req: Request, context: any) {
  return handleRequest(req, context, "DELETE");
}

async function handleRequest(
  req: Request,
  context: { params: Promise<{ path: string[] }> },
  method: string
) {
  try {
    const { path } = await context.params;
    const joinedPath = path.join("/");
    const { searchParams } = new URL(req.url);
    const url = `${BASE_URL}/${joinedPath}?${searchParams.toString()}`;
    const token = req.headers.get("authorization");

    const contentType = req.headers.get("content-type");

    let body;

    if (method !== "GET") {
      if (contentType?.includes("multipart/form-data")) {
        body = await req.formData();
      } else {
        body = await req.text();
      }
    }

    const headers: any = {
      ...(token && { Authorization: token }),
    };

    if (!contentType?.includes("multipart/form-data")) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(url, {
      method,
      headers,
      body,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Proxy error" }, { status: 500 });
  }
}
