import "./App.css";
import { useState } from "react";
import { ChakraProvider, CSSReset, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authenticate from "./routes/Authenticate";
import Signuproute from "./routes/Signuproute";
import customTheme from "./theme";
import Home from "./routes/Home";
import NavBar from "./components/NavBar";
import MenuRoute from "./routes/MenuRoute";
import PaymentRoute from "./routes/PaymentRoute";
import { CartProvider } from "./components/Cart/CartContext";
import AboutRoute from "./routes/AboutRoute";
import ChefProf from "./routes/ChefProf";
import Profile from "./components/profiles/Profile";
import { AuthProvider } from "./components/Auth/AuthContext";
import Blog from "./components/Blog";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <CartProvider>
          <ColorModeScript />
          <CSSReset />
          <BrowserRouter>
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuRoute />} />
              <Route
                path="/signin"
                element={
                  <Authenticate
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setUser={setUser}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <Signuproute
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setUser={setUser}
                  />
                }
              />
              <Route path="/payment" element={<PaymentRoute />} />
              <Route
                path="/about"
                element={<AboutRoute isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/chefprofile"
                element={<ChefProf isLoggedIn={isLoggedIn} user={user} />}
              />
              <Route
                path="/profile"
                element={<Profile isLoggedIn={isLoggedIn} user={user} />}
              />
              <Route
                path="/blog"
                element={<Blog isLoggedIn={isLoggedIn} user={user} />}
              />
              {/* <Route
                path="/userprofile"
                element={<UserProf isLoggedIn={isLoggedIn} user={user} />}
              /> */}
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
