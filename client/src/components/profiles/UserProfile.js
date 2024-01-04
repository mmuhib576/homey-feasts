import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Heading,
  VStack,
  Input,
  HStack,
  Button,
  IconButton,
  Center,
  Image,
  Text,
  Stack,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import ChefCarousel from "./ChefCarousel";
import { useAuth } from "../Auth/AuthContext";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const { cart, total, addToCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);

  const [editableFields, setEditableFields] = useState({
    username: user ? user.authUser.username : "",
    email: user ? user.authUser.email : "",
  });
  const handleAddToCart = (meal) => {
    addToCart(meal._id);
  };
  const handleToggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleInputChange = (field, value) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/users/${user.authUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user.authUser, // Include existing user data
            ...editableFields, // Include updated fields
          }),
        }
      );

      if (response.ok) {
        const updatedUserData = await response.json();
        console.log(updatedUserData);
        // Update the user context with the updated data
        const updatedUser = response.data;
        setUser({
          ...user,
          authUser: {
            ...user.authUser,
            ...updatedUser,
          },
        });
        // Exit edit mode
        setIsEditMode(false);
      } else {
        console.error("Failed to update user profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  useEffect(() => {
    // Reset editableFields when switching users
    setEditableFields({
      username: user ? user.authUser.username : "",
      email: user ? user.authUser.email : "",
    });
  }, [user]);

  return (
    <Container
      maxW="full"
      p={4}
      bgColor="#FFC529B2"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading as="h1" size="2xl" color="#207141" mb={4}>
        User Profile
      </Heading>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        bgColor="yellow.100"
        mb={4}
        w="100%"
        maxW="600px"
      >
        <VStack spacing={5} mt={4} color="#272D2FB2">
          <Input
            defaultValue={editableFields.username}
            fontSize="2xl"
            fontWeight="bold"
            textAlign="left"
            borderColor={"#272D2FB2"}
            readOnly={!isEditMode}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Input
            defaultValue={editableFields.email}
            fontSize="lg"
            color="teal.500"
            readOnly={!isEditMode}
            borderColor={"#272D2FB2"}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />

          <Button
            colorScheme="teal"
            size="md"
            justifyContent={{ base: "right" }}
            onClick={isEditMode ? handleSave : handleToggleEditMode}
            disabled={
              !isEditMode && (!editableFields.username || !editableFields.email)
            }
          >
            {isEditMode ? "Save" : "Edit"}
          </Button>
        </VStack>
      </Box>
      <MealCarousel onOrderNow={handleAddToCart} />
      <ChefCarousel />
    </Container>
  );
};

const MealCarousel = ({ onOrderNow }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cart, total, addToCart, clearCart } = useCart();
  const UserMeals = user.authUser?.favoriteMeals;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % UserMeals.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + UserMeals.length) % UserMeals.length
    );
  };
  const currentMeal = UserMeals[currentIndex];

  return (
    <Box
      mt={4}
      bgColor="yellow.100"
      borderRadius="2xl"
      borderColor={"white"}
      borderShadow="xl"
      borderWidth="2px"
      p={4}
    >
      <Heading as="h2" size="lg" align="center" color="#207141" mb={2}>
        Favorite Meals
      </Heading>
      <HStack spacing={4} justifyContent="space-between" alignItems="center">
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={goToPrev}
          aria-label="Previous"
          size="md"
          isDisabled={UserMeals.length <= 1}
          color="#FAD560"
          bg="#207141"
        />
        <Center flex="1">
          <Stack
            bgColor="white"
            p={4}
            minH={500}
            minW={300}
            maxW={500}
            borderRadius="2xl"
            borderWidth="4px"
            boxShadow="2xl"
            borderColor="#515555"
            textAlign="center"
            color="#515555"
            spacing={2}
          >
            <Center flex="1">
              <Image
                src={currentMeal.image}
                alt="logo"
                bg="#CBCBCB"
                minH={300}
                maxW={200}
                objectFit="cover"
                mb={2}
              />
            </Center>
            <Text fontSize="xl" fontWeight={"bold"} color="#272D2F">
              {currentMeal.name}
            </Text>
            <Text fontSize="lg">{`Made by: ${currentMeal.chefName.username}`}</Text>
            <Text fontSize="lg">{`Price: ${currentMeal.price}`}</Text>
            {/* <Button mt={2} bg="#FE724C" color="#FFFFFF" size="md">
              View Meal
            </Button> */}
            <Button
              mt={4}
              bg="#207141"
              color="#FFFFFF"
              size="md"
              _hover={{ filter: "brightness(90%)" }}
              onClick={() => {
                addToCart(currentMeal);
                navigate("/payment");
              }}
            >
              Order Now
            </Button>
          </Stack>
        </Center>
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={goToNext}
          aria-label="Next"
          size="md"
          isDisabled={UserMeals.length <= 1}
          color="#FAD560"
          bg="#207141"
        />
      </HStack>
    </Box>
  );
};

export default UserProfile;
