import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";

function Google() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      // After successful login, navigate to home page
      goToHome();
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign in with Google
        </h1>

        <Button
          variant="contained"
          fullWidth
          onClick={() => login()}
          sx={{
            backgroundColor: "#4285F4",
            color: "white",
            py: 1.5,
            "&:hover": {
              backgroundColor: "#3367D6",
            },
          }}
        >
          Sign in with Google 🚀
        </Button>

        <div className="mt-4 text-center">
          <Button
            variant="text"
            onClick={() => navigate("/SignIn")}
            sx={{ textTransform: "none" }}
          >
            Back to regular login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Google;
