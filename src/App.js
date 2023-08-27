import "./App.css";
import route from "./routes/routes";
import { useNavigate, useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsContext from "./Context/productsContext";

function App() {
  const routes = useRoutes(route);
  const [token, setToken] = useState(null);
  const [userIsLogin, setUserIsLogin] = useState(false);
  const [adminIsLogin, setAdminIsLogin] = useState(true);
  const [mode, setMode] = useState(false);
  const [showShopSidebar, setShowShopSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("user"))?.token;
    const adminToken = JSON.parse(localStorage.getItem("admin"))?.token;
    console.log(adminToken);
    if (userToken) {
      setToken(userToken);
      setUserIsLogin(true);
    } else {
      navigate("/login");
    }
    if (adminToken) {
      setAdminIsLogin(true);
    } else {
      navigate("/adminlogin");
    }
  }, [token]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setMode(true);
    } else {
      setMode(false);
    }
  }, []);

  useEffect(() => {
    if (mode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <div className="App max-w-[1400px] mx-auto relative w-full min-w-full">
      <ProductsContext.Provider
        value={{
          mode,
          setMode,
          showShopSidebar,
          setShowShopSidebar,
          token,
          userIsLogin,
          adminIsLogin,
        }}
      >
        {routes}
      </ProductsContext.Provider>
    </div>
  );
}
export default App;
