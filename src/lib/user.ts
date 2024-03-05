import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "./auth";

export function getSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}

// TO USE THIS SNIPPET:

// For Server Components
// import { getSession } from "@/lib/user";
// const user = await getSession();

// For API handlers
// import { getSession } from "@/lib/user";
// const user = await getSession(req, res); <- req, res from handler
