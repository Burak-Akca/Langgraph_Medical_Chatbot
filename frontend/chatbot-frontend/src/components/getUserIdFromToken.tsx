const getUserIdFromToken = (): string | null => {
    const token = sessionStorage.getItem("access_token");
    if (!token) return null;
  
    try {
      const base64Url = token.split(".")[1]; // Payload kısmını al
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(atob(base64)); // Base64'ü decode et
  
      console.log("Decoded Payload:", decodedPayload); // Decode edilmiş payload'ı konsola yazdır
      return decodedPayload.sub || null; // Kullanıcı ID'si (sub) varsa döndür, yoksa null
    } catch (error) {
      console.error("Geçersiz token:", error);
      return null;
    }
  };
  
  export default getUserIdFromToken;
  