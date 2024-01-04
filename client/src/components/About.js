import { useState, Link } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  HStack,
  Radio,
  Center,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { StarIcon } from "@chakra-ui/icons";
import image1 from "../assets-and-css/image.png";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useAuth } from "./Auth/AuthContext";
const About = () => {
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
    rating: 1,
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const user = token ? jwtDecode(token) : null;

      if (!user) {
        console.error("User not authenticated");
        return;
      }
      // Your existing submit logic...
      const response = await axios.post(
        "http://localhost:5001/feedback/createfeedback",
        {
          ...formData,
          userId: user._id,
        }
      );

      console.log("Feedback submitted:", response.data);

      // Clear form fields
      setFormData({
        name: "",
        feedback: "",
        rating: 1,
      });

      // Show success toast
      toast({
        title: "Feedback successfully added!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting feedback:", error.message);

      // Show error toast
      toast({
        title: "Error submitting feedback. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="full" bg="#FFC529B2" py={16}>
      <Box p={4} borderWidth={1} borderRadius="lg" bg="#FFF8E0" boxShadow="xl">
        <Text fontSize={["xl", "2xl"]} textAlign="center" color="#207141">
          Welcome to Homey Feasts! We are dedicated to bringing you the taste of
          home-cooked meals from local chefs and home-based kitchens.
        </Text>

        <Text mt={4} fontSize={["xl", "2xl"]} color="#272D2F99">
          Our mission is to provide you with the comfort and nostalgia of
          homemade food. We work closely with passionate home chefs to ensure
          you get the most delicious and heartwarming dishes delivered to your
          doorstep.
        </Text>
      </Box>

      <Heading as="h3" size="2xl" color="white" mt={12} textAlign="center">
        "Thinking about savoring homemade delights?"
      </Heading>

      <Image src={image1} alt="think" w={["60%", "30%"]} mx="auto" mt={4} />

      <Heading as="h4" size="2xl" mt={8} textAlign="center" color="#FE724C">
        Join our community now!
      </Heading>
      <Center>
        {/* Adding the Join our community button with a ChakraLink */}
        <ChakraLink
          href="https://discord.gg/gGq8aUsMpS" // Replace with your actual Discord invite link
          isExternal
        >
          <Button
            mt={4}
            color="white"
            bg="#FE724C"
            _hover={{ filter: "brightness(90%)" }}
            leftIcon={<FaDiscord />}
            fontSize="lg" 
          >
            Join our community on Discord
          </Button>
        </ChakraLink>
      </Center>

      {isLoggedIn ? (
        <Center>
          <Box
            mt={8}
            p={4}
            borderWidth={1}
            borderRadius="lg"
            align="center"
            bg="#FFF8E0"
            boxShadow="xl"
            maxW={700}
            w={["100%", "100%", "100%"]}
          >
            <Heading
              as="h2"
              size={["xl", "2xl"]}
              textAlign="center"
              color="#207141"
              mb={4}
            >
              Leave your Feedback
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel color="#207141">Name</FormLabel>
                <Input
                  borderWidth={1}
                  borderRadius="lg"
                  borderColor={"#272D2FCC"}
                  color="#272D2F99"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel color="#207141">Feedback Message</FormLabel>
                <Textarea
                  borderWidth={1}
                  borderRadius="lg"
                  borderColor={"#272D2FCC"}
                  color="#272D2F99"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  placeholder="Your feedback here"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel color="#207141">Rating</FormLabel>
                <RadioGroup>
                  <HStack spacing={4}>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Radio
                        key={rating}
                        value={String(rating)}
                        onChange={handleInputChange}
                        isChecked={formData.rating === rating}
                        name="rating"
                      >
                        <StarIcon color="yellow.500" />
                      </Radio>
                    ))}
                  </HStack>
                </RadioGroup>
              </FormControl>
              <Button
                mt={4}
                color="white"
                bg="#FE724C"
                _hover={{ filter: "brightness(90%)" }}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Center>
      ) : (
        // Render content when user is not logged in
        <Text textAlign="center" fontSize="xl" color="#207141">
          Please log in to leave feedback.
        </Text>
      )}
    </Container>
  );
};

export default About;
