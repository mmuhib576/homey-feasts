import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Heading,
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  IconButton,
  Flex,
  Icon,
  HStack,
  SimpleGrid,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import {
  FaHeart,
  FaChevronRight,
  FaChevronLeft,
  FaMapMarkerAlt,
  FaLock,
} from "react-icons/fa";
import Meal from "./Meal";
import { useAuth } from "../Auth/AuthContext";

const ChefProfile = () => {
  const { user, isLoggedIn } = useAuth();
  const authUser = user.authUser;
  console.log(authUser);
  const chefName = authUser._id;
  const {
    isOpen: addMealIsOpen,
    onOpen: openAddMeal,
    onClose: closeAddMeal,
  } = useDisclosure();
  const {
    isOpen: messageIsOpen,
    onOpen: openMessage,
    onClose: closeMessage,
  } = useDisclosure();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [meals, setMeals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [image, setImage] = useState("");
  const [editableFields, setEditableFields] = useState({
    username: "",
    about: "",
    email: "",
    password: "",
    address: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const { setUser } = useAuth(); // Assuming you have a setUser function in your AuthContext

  useEffect(() => {
    const userData = authUser;
    setMeals(userData.meals || []);
    setEditableFields({
      username: userData.username || "",
      about: userData.about || "",
      email: userData.email || "",
      password: userData.password || "",
      address: userData.address || "",
    });
  }, [user]);

  const handleAddMeal = (title, description, price, image) => {
    const chefName = authUser._id;
    console.log(title);
    // Construct the newMeal object using the provided arguments
    const newMeal = {
      title,
      description,
      price,
      image,
      chefName,
    };

    // Call the addMeal function with the newMeal object
    addMeal(newMeal);
    closeAddMeal();
  };

  const addMeal = async (newMeal) => {
    console.log("New Meal Object:", newMeal);

    try {
      const response = await axios.post(
        `http://localhost:5001/meals/createmeal`,
        newMeal
      );
      console.log("Meal added:", response.data);

      // Assuming your backend returns the updated list of meals
      const addedMeal = response.data;
      setMeals((prevMeals) => [...prevMeals, addedMeal]);
    } catch (error) {
      console.error("Error adding a meal:", error);
      // Handle error as needed
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 3 + meals.length) % meals.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % meals.length);
  };

  const handleToggleEditMode = () => {
    if (isEditMode) {
      // Check if any changes have been made
      const changesMade = Object.keys(editableFields).some(
        (field) => editableFields[field] !== authUser[field]
      );

      if (changesMade) {
        handleEditChefDetails();
        setIsEditMode((prev) => !prev);
      } else {
        // Handle the case where no changes have been made
        // You can display a message or take other actions
        console.log("No changes made.");
      }
    } else {
      setIsEditMode((prev) => !prev);
    }
  };
  const editChefDetails = async (updatedDetails) => {
    console.log(updatedDetails);
    try {
      const response = await axios.put(
        `http://localhost:5001/chefs/${authUser._id}`,
        updatedDetails
      );
      console.log("Chef details updated:", response.data);

      // Assuming your backend returns the updated chef details
      const updatedUser = response.data;
      setUser({
        ...user,
        authUser: {
          ...user.authUser,
          ...updatedUser,
        },
      });
    } catch (error) {
      console.error("Error editing chef details:", error);
      // Handle error as needed
    }
  };
  // const editChefDetails = async (chefId, updatedDetails) => {
  //   try {
  //     const response = await axios.put(`/api/chefs/${chefId}`, updatedDetails);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error editing chef details:", error);
  //     throw error;
  //   }
  // };

  // Function to filter out unchanged fields
  const getChangedFields = (originalDetails, updatedDetails) => {
    const changedFields = {};
    for (const key in updatedDetails) {
      if (originalDetails[key] !== updatedDetails[key]) {
        changedFields[key] = updatedDetails[key];
      }
    }
    return changedFields;
  };

  const handleUpdateMeal = async (updatedMeal) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/meals/${updatedMeal._id}`,
        updatedMeal
      );
      console.log("Meal updated:", response.data);

      // Assuming your backend returns only the updated meal
      const updatedMealData = response.data;

      // Update the specific meal in the meals state
      setMeals((prevMeals) => {
        const updatedMeals = prevMeals.map((m) =>
          m._id === updatedMealData._id ? updatedMealData : m
        );
        return updatedMeals;
      });
    } catch (error) {
      console.error("Error updating meal:", error);
      // Handle error as needed
    }
  };

  const handleDeleteMeal = async (mealId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/meals/${mealId}`
      );

      // Assuming your backend returns the updated list of meals
      const updatedMeals = response.data;
      setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== mealId));
    } catch (error) {
      console.error("Error deleting meal:", error);
      // Handle error as needed
    }
  };

  // Usage
  const handleEditChefDetails = async () => {
    // Assuming you have the original chef details stored somewhere, let's call it `originalChefDetails`
    const originalChefDetails = {
      username: authUser.username,
      about: authUser.about,
      email: authUser.email,
      password: authUser.password,
      address: authUser.address,
    };

    const changedFields = getChangedFields(originalChefDetails, editableFields);

    // Check if any changes have been made
    if (Object.keys(changedFields).length > 0) {
      try {
        // Make the API call with only the changed fields
        await editChefDetails(changedFields);
        console.log("Chef details updated successfully.");

        // Assuming your backend returns the updated chef details
        const updatedUser = { ...authUser, ...changedFields };
        setUser({
          ...user,
          authUser: updatedUser,
        });
      } catch (error) {
        console.error("Error updating chef details:", error);
        // Handle error as needed
      }
    } else {
      // Handle the case where no changes have been made
      console.log("No changes made.");
    }
  };
  // const handleEditChefDetails = () => {
  //   editChefDetails(editableFields);
  //   setIsEditMode((prev) => !prev);
  // };

  const handleInputChange = (field, value) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  return (
    <Container
      maxW="full"
      p={6}
      bgColor="#FAD560 "
      display="flex"
      flexDirection="column"
      alignItems="center"
      pb={200}
    >
      <Heading textAlign="center" color={"#207141"}>
        Chef Profile
      </Heading>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        bgColor="yellow.100"
        mt={8}
        mb={4}
        w="100%"
        maxW="600px"
      >
        {!user.role === "chef" ? (
          <IconButton
            mt={1}
            onClick={toggleFavorite}
            icon={<FaHeart color={isFavorite ? "red" : "gray"} />}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          />
        ) : (
          <div></div>
        )}
        <VStack spacing={3} mt={4} color="#272D2FB2">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="left"
            color={"#FE724C"}
          >
            {isEditMode ? (
              <Editable
                defaultValue={authUser.username}
                fontSize="lg"
                onChange={(value) => handleInputChange("username", value)}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            ) : (
              authUser.username
            )}
          </Text>
          <Text fontSize="md" maxH="50px" overflow="auto">
            {isEditMode ? (
              <Editable
                defaultValue={authUser.about}
                fontSize="lg"
                onChange={(value) => handleInputChange("about", value)}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            ) : (
              authUser.about
            )}
          </Text>
          <Text fontSize="lg" color="teal.500">
            {isEditMode ? (
              <Editable
                defaultValue={authUser.email}
                fontSize="lg"
                onChange={(value) => handleInputChange("email", value)}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            ) : (
              authUser.email
            )}
          </Text>
          <Box
            fontSize="lg"
            textAlign="left"
            display="flex"
            alignItems="center"
          >
            <Icon as={FaMapMarkerAlt} color={"green.500"} mr={2} />
            <Text fontSize="lg" isDisabled={!isEditMode}>
              {isEditMode ? (
                <Editable
                  defaultValue={authUser.address}
                  isDisabled={!isEditMode}
                  onChange={(value) => handleInputChange("address", value)}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              ) : (
                authUser.address || "No address available"
              )}
            </Text>
          </Box>

          {/* Save or Edit button */}
          <Button
            colorScheme="teal"
            size="sm"
            onClick={handleToggleEditMode}
            disabled={!isEditMode}
          >
            {isEditMode ? "Save" : "Edit"}
          </Button>
        </VStack>
      </Box>

      <Flex
        mt={4}
        justifyContent={{ base: "center", md: "flex-end" }}
        gap={100}
      >
        <Button bgColor={"#207141"} color="white" onClick={openAddMeal}>
          Add Meal
        </Button>

        {!user.role === "chef" ? (
          <Button bgColor={"#272D2F"} color="white" onClick={openMessage}>
            Message
          </Button>
        ) : (
          <div></div>
        )}
      </Flex>

      <Box
        mt={4}
        maxW="full"
        bgColor="#FAD560"
        borderRadius="2xl"
        borderColor={"white"}
        borderShadow="xl"
        borderWidth="2px"
        // align="center"
      >
        <Text align="center" color="white" fontSize="2xl">
          Meals:
        </Text>
        <Flex
          alignItems={{ base: "center", md: "start" }}
          direction={{ base: "column", md: "row" }}
        >
          <HStack>
            <FaChevronLeft
              onClick={goToPrev}
              isDisabled={meals.length <= 3}
              aria-label="Prev"
              color="#515555"
              style={{ cursor: "pointer" }}
            />

            {meals.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                {meals
                  .slice(currentIndex, currentIndex + 3)
                  .map((meal, index) => (
                    <Meal
                      key={index}
                      meal={meal}
                      index={currentIndex + index}
                      totalMeals={meals.length}
                      goToPrev={goToPrev}
                      goToNext={goToNext}
                      setMeals={setMeals}
                      closeAddMeal={closeAddMeal}
                      handleUpdate={handleUpdateMeal}
                      handleDelete={handleDeleteMeal}
                    />
                  ))}
              </SimpleGrid>
            ) : (
              <p>No meals added yet.</p>
            )}

            <FaChevronRight
              onClick={goToNext}
              isDisabled={meals.length <= 3}
              aria-label="Next"
              color="#515555"
              style={{ cursor: "pointer" }}
            />
          </HStack>
        </Flex>
      </Box>

      <Modal isOpen={addMealIsOpen} onClose={closeAddMeal}>
        <ModalOverlay bg="#515555" />
        <ModalContent>
          <ModalHeader bgColor="#FAD560">Add Meal</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="#FAD560">
            <VStack spacing={4}>
              <Input
                placeholder="Image Link"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Input
                placeholder="Meal Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Meal Description"
                rows={4}
                resize="vertical"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </VStack>
          </ModalBody>
          <ModalFooter bgColor="#FAD560">
            {/* Add a condition to disable the button when any field is empty or invalid */}
            <Button
              bgColor="#207141"
              color="white"
              mr={3}
              onClick={() => handleAddMeal(title, description, price, image)}
              disabled={!title || !description || isNaN(parseFloat(price))}
            >
              Add
            </Button>
            <Button onClick={closeAddMeal} bgColor="#FC4C1D" color="white">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={messageIsOpen} onClose={closeMessage}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="#FAD560">Message Chef</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="#FAD560">
            <Textarea placeholder="Type your message..." rows={4} />
          </ModalBody>
          <ModalFooter bgColor="#FAD560">
            <Button bgColor="#207141" color="white">
              Send
            </Button>
            <Button
              onClick={closeMessage}
              ml={3}
              bgColor="#FC4C1D"
              color="white"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ChefProfile;
