import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/error-pages/401", // Optional custom page
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
