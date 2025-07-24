import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/error/401",
  },
});

export const config = {
  matcher: ["/admin", "/admin/kelas"],
};
