import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ConversationPage from "./pages/ConversationPage/ConversationPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import PricesPage from "./pages/PricesPage/PricesPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import SignIn from "./pages/materialUI/sign-in/SignIn";
import SignUp from "./pages/materialUI/sign-up/SignUp";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
  {/* Kullanıcı giriş yaptıysa dashboard erişebilir */}
  <Route element={<ProtectedRoute allowedRoles={["SympthonAIVisitorId", "Manager", "Admin"]} />}>
          <Route path="/conversation" element={<ConversationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
  </Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/prices" element={<PricesPage />} />
        {/* <Route path="/conversation" element={<ConversationPage />} /> */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
