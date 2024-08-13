import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search page</p>
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/Register"
          element={
            <Layout>
              <Register></Register>{" "}
            </Layout>
          }
        />
        <Route
          path="/SignIn"
          element={
            <Layout>
              <SignIn></SignIn>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
