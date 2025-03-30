import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";

import Templates from "./pages/Templates";
import TemplatePreview from "./components/templates/TemplatePreview";

import Portfolio from "./pages/Portfolio";
import CreatePortfolio from "./pages/CreatePortfolio";
import PortfolioEditor from "./pages/PortfolioEditor";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:id" element={<TemplatePreview />} />

          <Route path="/portfolios" element={<Portfolio />} />
          <Route path="/create-portfolio/:id" element={<CreatePortfolio />} />
          <Route path="/edit-portfolio" element={<PortfolioEditor />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
