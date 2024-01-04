// import React, { useState } from "react";
// import {
//   Text,
//   Flex,
//   Box,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Input,
//   Textarea,
//   Image,
//   IconButton,
// } from "@chakra-ui/react";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const Meal = ({ meal, index, totalMeals, goToPrev, goToNext }) => {
//   const [isUpdateOpen, setIsUpdateOpen] = useState(false);
//   const [updatedName, setUpdatedName] = useState(meal.title);
//   const [updatedDescription, setUpdatedDescription] = useState(
//     meal.description
//   );
//   const [updatedPrice, setUpdatedPrice] = useState(meal.price);
//   const [updatedImageLink, setUpdatedImageLink] = useState(meal.image);
//   const [imageLoadError, setImageLoadError] = useState(false);

//   const handleImageError = () => {
//     setImageLoadError(true);
//   };

//   const handleUpdateClick = () => {
//     setIsUpdateOpen(true);
//   };

//   const handleCloseUpdate = () => {
//     setIsUpdateOpen(false);
//   };

//   const handleNameChange = (event) => {
//     setUpdatedName(event.target.value);
//   };

//   const handleDescriptionChange = (event) => {
//     setUpdatedDescription(event.target.value);
//   };

//   const handlePriceChange = (event) => {
//     setUpdatedPrice(event.target.value);
//   };

//   const handleImageLinkChange = (event) => {
//     setUpdatedImageLink(event.target.value);
//   };

//   const handleUpdateMeal = () => {
//     // Handle the meal update logic here
//     console.log("Updated name:", updatedName);
//     console.log("Updated description:", updatedDescription);
//     console.log("Updated price:", updatedPrice);
//     console.log("Updated image link:", updatedImageLink);

//     // Close the update overlay
//     setIsUpdateOpen(false);
//   };

//   const handleDeleteMeal = () => {
//     // Handle the meal delete logic here
//     console.log("Meal deleted");
//   };

//   return (
//     <Flex
//       flexDirection="column"
//       alignItems="center"
//       p={4}
//       mb={4}
//       ml={4}
//       border={"4px"}
//       borderColor="#515555"
//       borderRadius="2xl"
//       boxShadow="lg"
//       bgColor="#FAF6EB"
//       maxW="300px"
//     >
//       <Box m={2}>
//         {imageLoadError ? (
//           <Text color="red.500">Error loading image</Text>
//         ) : (
//           <Image
//             src={meal.image}
//             alt="meal-image"
//             bg="#CBCBCB"
//             maxW={200}
//             maxH={300}
//             objectFit="cover"
//             mb={2}
//             onError={handleImageError}
//           />
//         )}
//         <Text
//           fontSize="xl"
//           fontWeight="bold"
//           color="#FE724C"
//           textAlign="center"
//         >
//           {meal.title}
//         </Text>
//         <Text fontSize="md" color="#FFC529B2" fontWeight="bold">
//           Description:
//         </Text>
//         <Text
//           color="#207141E5"
//           maxW={["200px", "200px", "200px"]}
//           maxH="100px"
//           overflowX="auto"
//         >
//           {meal.description}
//         </Text>
//         <Text fontSize="md" color="#FFC529B2" fontWeight="bold">
//           Price:
//         </Text>
//         <Text color="#207141E5">
//           {meal.price}
//           <b>$</b>
//         </Text>
//         <Button
//           mt={2}
//           bgColor="#FFC529B2"
//           color="#207141E5"
//           mb={2}
//           width="100%"
//         >
//           Order Now
//         </Button>
//         <Flex justifyContent="space-between">
//           <IconButton
//             mt={2}
//             ml={2}
//             bgColor="#FE724C"
//             color="#FFFFFF"
//             onClick={handleDeleteMeal}
//             aria-label="Delete Meal"
//             icon={<FaTrash />}
//           />
//           <Button
//             mt={2}
//             ml={2}
//             bgColor="#FE724C"
//             color="#FFFFFF"
//             onClick={handleUpdateClick}
//           >
//             <FaEdit />
//           </Button>
//         </Flex>
//       </Box>
//       <Modal isOpen={isUpdateOpen} onClose={handleCloseUpdate}>
//         <ModalOverlay />
//         <ModalContent bgColor="#FAD560">
//           <ModalHeader>Update Meal</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Input
//               value={updatedImageLink}
//               onChange={handleImageLinkChange}
//               placeholder="Update image link"
//             />
//             <Input
//               value={updatedName}
//               onChange={handleNameChange}
//               placeholder="Update name"
//               mt={3}
//             />
//             <Textarea
//               value={updatedDescription}
//               onChange={handleDescriptionChange}
//               placeholder="Update description"
//               mt={3}
//             />
//             <Input
//               value={updatedPrice}
//               onChange={handlePriceChange}
//               placeholder="Update price"
//               mt={3}
//             />
//           </ModalBody>
//           <ModalFooter>
//             <Button bgColor="#207141" color="white" onClick={handleUpdateMeal}>
//               Save
//             </Button>
//             <Button ml={4} colorScheme="red" onClick={handleCloseUpdate}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Flex>
//   );
// };

// export default Meal;
import React, { useState } from "react";
import {
  Text,
  Flex,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../Auth/AuthContext";
import axios from "axios";

const Meal = ({ meal, setMeals, closeAddMeal, handleUpdate, handleDelete }) => {
  const { user } = useAuth();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(meal.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    meal.description
  );
  const [updatedPrice, setUpdatedPrice] = useState(meal.price);
  const [updatedImageLink, setUpdatedImageLink] = useState(meal.image);
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  const handleUpdateClick = () => {
    setIsUpdateOpen(true);
  };

  const handleCloseUpdate = () => {
    setIsUpdateOpen(false);
  };

  const handleNameChange = (event) => {
    setUpdatedName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setUpdatedDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setUpdatedPrice(event.target.value);
  };

  const handleImageLinkChange = (event) => {
    setUpdatedImageLink(event.target.value);
  };

  const handleUpdateMeal = () => {
    console.log("Updated name:", updatedName);
    console.log("Updated description:", updatedDescription);
    console.log("Updated price:", updatedPrice);
    console.log("Updated image link:", updatedImageLink);

    setIsUpdateOpen(false);

    // Call the callback function (handleUpdate) to update the meals state in the parent component
    handleUpdate({
      _id: meal._id,
      title: updatedName,
      description: updatedDescription,
      price: updatedPrice,
      image: updatedImageLink,
    });
  };

  const handleDeleteMeal = () => {
    console.log("Meal deleted");

    // Call the callback function (handleDelete) to delete the meal in the parent component
    handleDelete(meal._id);
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      p={4}
      mb={4}
      ml={4}
      border="1px"
      borderRadius="md"
      borderColor="#E2E8F0"
      bgColor="white"
      width="300px"
      boxShadow="md"
    >
      <Box m={2}>
        {imageLoadError ? (
          <Text color="red.500">Error loading image</Text>
        ) : (
          <Image
            src={meal.image}
            alt="meal-image"
            bg="#CBD5E0"
            width="100%"
            maxH={200}
            minH={200}
            objectFit="cover"
            mb={2}
            onError={handleImageError}
            borderRadius="md"
          />
        )}
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="#2D3748"
          textAlign="center"
        >
          {meal.title}
        </Text>
        <Text fontSize="md" color="#4A5568" fontWeight="bold" mt={2}>
          Description:
        </Text>
        <Text
          color="#4A5568"
          maxW={["200px", "200px", "200px"]}
          maxH="100px"
          overflowX="auto"
        >
          {meal.description}
        </Text>
        <Text fontSize="md" color="#4A5568" fontWeight="bold" mt={2}>
          Price:
        </Text>
        <Text color="#2D3748" fontWeight="bold">
          {meal.price}
          <b>$</b>
        </Text>
        {user.role === "chef" ? (
          <Flex justifyContent="space-between">
            <IconButton
              mt={2}
              ml={2}
              bgColor="#E53E3E"
              color="white"
              onClick={handleDeleteMeal}
              aria-label="Delete Meal"
              icon={<FaTrash />}
              _hover={{ bgColor: "#C53030" }}
            />
            <Button
              mt={2}
              ml={2}
              bgColor="#2C7A7B"
              color="white"
              onClick={handleUpdateClick}
              _hover={{ bgColor: "#2C6E6F" }}
            >
              <FaEdit />
            </Button>
          </Flex>
        ) : (
          <div></div>
        )}
      </Box>
      {user.role === "chef" ? (
        <Modal isOpen={isUpdateOpen} onClose={handleCloseUpdate}>
          <ModalOverlay />
          <ModalContent bgColor="#FAD560">
            <ModalHeader>Update Meal</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                value={updatedImageLink}
                onChange={handleImageLinkChange}
                placeholder="Update image link"
              />
              <Input
                value={updatedName}
                onChange={handleNameChange}
                placeholder="Update name"
                mt={3}
              />
              <Textarea
                value={updatedDescription}
                onChange={handleDescriptionChange}
                placeholder="Update description"
                mt={3}
              />
              <Input
                value={updatedPrice}
                onChange={handlePriceChange}
                placeholder="Update price"
                mt={3}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                bgColor="#207141"
                color="white"
                onClick={handleUpdateMeal}
              >
                Save
              </Button>
              <Button ml={4} colorScheme="red" onClick={handleCloseUpdate}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <div></div>
      )}
    </Flex>
  );
};

export default Meal;
