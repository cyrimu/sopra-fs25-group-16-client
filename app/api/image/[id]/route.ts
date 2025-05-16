import { NextResponse } from "next/server";

// Mock image lookup — replace with DB or filesystem access
async function getBase64Image(id: string): Promise<string | null> {
  if (id === "a09bfc60-1ec2-4386-b3bf-8513b667f246") {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0N..."; // Full base64 here
  }
  return null;
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const base64 = await getBase64Image(params.id);
  if (!base64) {
    return new NextResponse("Image not found", { status: 404 });
  }

  return new NextResponse(base64, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}