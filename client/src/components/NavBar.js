import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  ChakraProvider,
  extendTheme,
  CSSReset,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import logoSvg from "../assets-and-css/image.png";
import { useAuth } from "./Auth/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import Cart from "./Cart/Cart";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e7f2f8",
      500: "#1fa2f2",
    },
  },
});

const NavBar = () => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCartPopupOpen, setCartPopupOpen] = useState(false);

  const CartPopup = ({ isOpen, onClose }) => {
    return (
      <div
        className={`popup ${isOpen ? "open" : ""}`}
        style={{
          minWidth: "800px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 999,
          backgroundColor: "rgb(254,252,191)",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
          maxHeight: "70vh",
          display: isOpen ? "block" : "none",
        }}
      >
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "25px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          &times;
        </button>
        <h2 style={{ marginBottom: "20px" }}>Your Cart</h2>
        <Cart onClose={onClose} />
        <style>
          {`
                /* Style the scrollbar */
                ::-webkit-scrollbar {
                  width: 10px;
                  margin: 10px;
                }
      
                ::-webkit-scrollbar-thumb {
                  background-color: #888;
                  border-radius: 5px;
                }
      
                ::-webkit-scrollbar-track {
                  background-color: #f1f1f1;
                }
              `}
        </style>
      </div>
    );
  };

  const openCart = () => {
    setCartPopupOpen(true);
  };

  const closeCart = () => {
    setCartPopupOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/signin");
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box bg="yellow.100" py={2}>
        <Flex align="center" justify="space-between" maxW="960px" mx="auto">
          <Box>
            <Link
              as={RouterLink}
              to="/"
              color="white"
              fontSize="xl"
              fontWeight="bold"
              _hover={{ textDecoration: "none" }}
            >
              <Image src={logoSvg} alt="Food Order App Logo" w={20} h={20} />
            </Link>
          </Box>
          <Box>
            <Flex align="center">
              <Link
                as={RouterLink}
                to="/menu"
                color="orange"
                fontSize="l"
                _hover={{
                  fontWeight: "none",
                  transition: "ease-in-out 0.3s",
                  textDecoration: "underline",
                }}
                px={4}
                mr={4}
              >
                Meals
              </Link>
              <Link
                as={RouterLink}
                to="/about"
                color="orange"
                fontSize="l"
                _hover={{
                  fontWeight: "none",
                  transition: "ease-in-out 0.3s",
                  textDecoration: "underline",
                }}
                px={4}
                mr={4}
              >
                About
              </Link>
              {isLoggedIn ? (
                <Flex>
                  <Link
                    as={RouterLink}
                    to="/blog"
                    color="orange"
                    fontSize="l"
                    _hover={{
                      fontWeight: "none",
                      transition: "ease-in-out 0.3s",
                      textDecoration: "underline",
                    }}
                    px={4}
                    mr={4}
                  >
                    Blog
                  </Link>
                  <Menu>
                    <MenuButton
                      as={Link}
                      to="/profile"
                      color="orange"
                      fontSize="l"
                      _hover={{
                        fontWeight: "none",
                        transition: "ease-in-out 0.3s",
                        textDecoration: "underline",
                      }}
                      px={4}
                      mr={4}
                    >
                      Profile
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        as={RouterLink}
                        to="/profile"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        View Profile
                      </MenuItem>
                      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                    </MenuList>
                  </Menu>
                  {isLoggedIn && user?.role === "user" && (
                    <>
                      <Flex
                        as="button"
                        align="center"
                        onClick={openCart}
                        paddingX={3}
                        color="orange"
                        _hover={{ textDecoration: "underline" }}
                      >
                        Cart <CiShoppingCart as="span" />
                      </Flex>
                      <CartPopup isOpen={isCartPopupOpen} onClose={closeCart} />
                    </>
                  )}
                </Flex>
              ) : (
                <>
                  <Link
                    as={RouterLink}
                    to="/signin"
                    color="orange"
                    fontSize="l"
                    _hover={{
                      fontWeight: "none",
                      transition: "ease-in-out 0.3s",
                      textDecoration: "underline",
                    }}
                    px={4}
                    mr={4}
                  >
                    Login
                  </Link>
                  <Link
                    as={RouterLink}
                    to="/signup"
                    color="orange"
                    fontSize="l"
                    _hover={{
                      fontWeight: "none",
                      transition: "ease-in-out 0.3s",
                      textDecoration: "underline",
                    }}
                    px={4}
                    mr={4}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default NavBar;
