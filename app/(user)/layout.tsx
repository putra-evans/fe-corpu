// /app/(user)/layout.tsx

import { FrontLayout, UserDashboardLayout } from "../../components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryProvider } from "@/components";

const queryClient = new QueryClient();

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FrontLayout>
      {/* 🔥 container tetap di sini */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-16 lg:pt-44">
        <ReactQueryProvider>
          <UserDashboardLayout>{children}</UserDashboardLayout>
        </ReactQueryProvider>
      </div>
    </FrontLayout>
  );
}
