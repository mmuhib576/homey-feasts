// Auth.js

import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Link as ChakraLink,
  useToast,
  Select,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useAuth } from "./AuthContext"; // Import the AuthContext

function Auth({ setIsLoggedIn, setUser }) {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
    role: "user",
  });

  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      const authUser = data.authUser;

      if (data.user) {
        localStorage.setItem("token", data.user);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("authUserData", JSON.stringify(data.authUser));

        // Call the login function from AuthContext with user data
        login({ ...data, userType: credentials.role, authUser: data.authUser });

        toast({
          title: "Login successful",
          status: "success",
          position: "top",
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/");
        }, 600);
      } else {
        toast({
          title: "Wrong username or password",
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (user.exp <= Date.now() / 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      } else {
        const storedAuthUserData = localStorage.getItem("authUserData");

        const authUser = JSON.parse(storedAuthUserData);

        // Set the user data in AuthContext on app load
        login({ ...user, userType: credentials.role, authUser });
        navigate("/");
      }
    }
  }, [navigate, login, credentials.role]);

  return (
    <Box p={20} display="flex" alignItems="center">
      <Box p={4} maxW="md" mx="auto" bg="yellow.50">
        <Heading textAlign="center" mb={6}>
          Sign in to Homey Feasts
        </Heading>
        <Box borderWidth="1px" borderRadius="md" p={4}>
          <form onSubmit={handleSubmit}>
            <Input
              required
              type="text"
              placeholder="Enter Username"
              name="userName"
              value={credentials.userName}
              onChange={handleChange}
              mb={3}
            />
            <Input
              required
              type="password"
              placeholder="Enter Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              mb={3}
            />
            <Select
              name="role"
              value={credentials.role}
              onChange={handleChange}
              mb={3}
            >
              <option value="user">User</option>
              <option value="chef">Chef</option>
            </Select>
            <Button colorScheme="teal" type="submit" isFullWidth mt={4}>
              Sign in
            </Button>
          </form>
        </Box>
        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          <ChakraLink color="blue.400" as={Link} to="/signup">
            Sign up
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
}

export default Auth;
