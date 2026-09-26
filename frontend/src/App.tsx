import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Segments from "./pages/Segments";
import Templates from "./pages/Templates";
import Campaigns from "./pages/Campaigns";
import SendEmail from "./pages/SendEmail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/segments"
            element={<Segments />}
          />

          <Route
            path="/templates"
            element={<Templates />}
          />

          <Route
            path="/campaigns"
            element={<Campaigns />}
          />

          <Route
            path="/send-email"
            element={<SendEmail />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;