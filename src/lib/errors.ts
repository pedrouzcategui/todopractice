import { Prisma } from "@prisma/client";

export function parseApiError(error: unknown) {
  const showError = process.env.NODE_ENV === "development";
  const defaultError = { message: "An unknown error occurred." };

  if (!showError) return defaultError;

  if (error instanceof Error) {
    return { message: error.message };
  } else if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError
  ) {
    return { ...error, message: error.message.split("\n") };
  }

  return defaultError;
}
