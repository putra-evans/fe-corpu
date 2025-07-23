import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/not-found",
  },
});

export const config = {
  matcher: ["/admin", "/admin/kelas"],
};
