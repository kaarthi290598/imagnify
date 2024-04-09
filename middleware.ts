import { authMiddleware } from "@clerk/nextjs";
import { Webhook } from "lucide-react";

export default authMiddleware({
  publicRoutes: ["/api/webhook/clerk"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
