// "use client";
// import { useRouter, usePathname } from "next/navigation";
// import useAuth from "@/components/useAuthHook";
// import { useEffect } from "react";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     if (!loading && !isAuthenticated && pathname !== "/login") {
//       router.push("/login");
//     }
//   }, [isAuthenticated, loading, pathname, router]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return children;
// };

// export default ProtectedRoute;
