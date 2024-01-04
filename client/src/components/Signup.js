import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useToast,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

function Signup() {
  const [userType, setUserType] = useState("user");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const successToast = () => {
    toast({
      title: "Successfully registered!",
      status: "success",
      position: "top",
      isClosable: true,
    });
  };

  const handleChangeUserType = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      userType,
      username: userName,
      email,
      password,
      location,
      experienceLevel,
    };

    fetch("http://localhost:5001/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          successToast();
          setTimeout(() => {
            navigate("/signin");
          }, 600);
        }
      })
      .then(() => {
        // Clear input fields
        setUserName("");
        setEmail("");
        setPassword("");
        setLocation("");
        setExperienceLevel("");
      });
  };

  return (
    <Box p={20}>
      <Box
        p="5"
        maxW="md"
        borderWidth="1px"
        borderRadius="md"
        mx="auto"
        bg="yellow.50"
      >
        <Box textAlign="center" mb={6}>
          <Heading textAlign="center" mb={6}>
            Sign up to Homey Feasts
          </Heading>
        </Box>
        <form onSubmit={handleSubmit} p="10">
          <FormControl isRequired>
            <Select
              value={userType}
              onChange={handleChangeUserType}
              placeholder="Select User Type"
            >
              <option value="user">Sign up as User</option>
              <option value="chef">Sign up as Chef</option>
            </Select>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {userType === "chef" && (
            <>
              <FormControl isRequired mt={4}>
                <FormLabel>Location (City, State)</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Experience Level (1 to 10)</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter Experience Level"
                  min="1"
                  max="10"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                />
              </FormControl>
            </>
          )}
          <Button
            type="submit"
            colorScheme="green"
            mt={6}
            borderRadius={"50px"}
          >
            Sign up
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <ChakraLink color="blue.400" as={Link} to="/signin">
            Sign in
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
}

export default Signup;
