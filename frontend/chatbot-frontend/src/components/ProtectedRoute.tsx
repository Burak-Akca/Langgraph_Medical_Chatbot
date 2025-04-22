import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[]; // Define the type for allowedRoles
}


const getUserRoleFromToken = (): string | null => {
    const token = sessionStorage.getItem("access_token");
    if (!token) return null;
  
    try {
      const base64Url = token.split(".")[1]; // Payload kısmını al
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(atob(base64)); // Base64'ü decode et

      console.log("Decoded Payload:", decodedPayload); // Decode edilmiş payload'ı konsola yazdır
      return decodedPayload.client_id || null; // Eğer rol varsa döndür, yoksa null
    } catch (error) {
      console.error("Geçersiz token:", error);
      return null;
    }
  };

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
      const token = sessionStorage.getItem("access_token"); // JWT token'ı localStorage'dan al
  const userRole =getUserRoleFromToken() // Kullanıcının rolünü al

  if (!token) {
    return <Navigate to="/signin" replace />; // Eğer token yoksa login sayfasına yönlendir
  }

  if (allowedRoles && !allowedRoles.includes(userRole || "")) {
    return <Navigate to="/unauthorized" replace />; // Yetkisizse unauthorized sayfasına yönlendir
  }

  return <Outlet />; // Yetkiliyse, sayfayı göster
};

export default ProtectedRoute;
