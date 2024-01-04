import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Center,
  VStack,
  Divider,
  Link,
  ChakraProvider,
  SimpleGrid,
  Image,
  Icon,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import landingImg from "../assets-and-css/Group 5.png";
import NavBar from "../components/NavBar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Jake",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    comment: "The meals are absolutely delicious! I order from here regularly.",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    comment:
      "Quick delivery and the food quality is top-notch. Highly recommended!",
  },
  {
    id: 3,
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    comment: "Amazing variety of dishes. I love the vegetarian options!",
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    comment:
      "The customer service is excellent. They are always friendly and helpful.",
  },
  {
    id: 5,
    name: "Michael Brown",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    comment:
      "I appreciate the timely delivery. The packaging is neat and secure.",
  },
  {
    id: 6,
    name: "Sophia Lee",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    comment: "I'm a repeat customer. The consistency in taste is impressive!",
  },
];

const meals = [
  {
    id: 1,
    name: "Delicious Spaghetti",
    imageSrc:
      "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-threeByTwoMediumAt2X-v2.jpg",
    description: "Spaghetti is one of the simpler pastas to make fresh, involving only all-purpose flour, eggs, a little water, and optionally, olive oil. ",
  },
  {
    id: 2,
    name: "Tasty Pizza",
    imageSrc:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "My pizza starts with No-Knead pizza dough, is topped with No-Cook Pizza Sauce (or use store-bought pizza sauce, if you prefer) and includes my favourite toppings. Feel free to top your pizza as you like.",
  },
  {
    id: 3,
    name: "Healthy Salad",
    imageSrc:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Whether you want to add more plant-based meals to your diet or are simply looking to change up your salad game, you’ll find tons of inspiration in our salads.",
  },
  {
    id: 4,
    name: "Spaghetti Delight",
    imageSrc:
      "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-threeByTwoMediumAt2X-v2.jpg",
    description: "Spaghetti lends itself to serving with small shellfish such as mussels and clams, and in Italy a favourite dish is spaghetti al tonno, spaghetti with tomato sauce and canned tuna.",
  },
];

const Home = () => {
  const isMobile = window.innerWidth <= 768; 
  const displayCards = isMobile ? 1 : 3;

  const cardStyle = {
    width: "200px", 
    margin: "0 10px",
  };

  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  const handlePrev = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  return (
    <ChakraProvider>
      <Box>
        {/* Landing Section */}
        <Box
          bg="orange"
          color="white"
          minH="90vh"
          py={{ base: 12, md: 20 }}
          px={{ base: 4, md: 20 }}
          textAlign="center"
        >
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            h="100%"
          >
            <Box flex="1">
              <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }}>
                Welcome to Homey Feasts
              </Heading>
              <Text fontSize={{ base: "xl", md: "2xl" }} my={4}>
                Your go-to place for delicious homemade meals!
              </Text>
              <Button
                colorScheme="green"
                size="lg"
                mt={6}
                _hover={{ bg: "green.400" }}
              >
                Order Now
              </Button>
            </Box>
            <Box flex="1" mt={{ base: 8, md: 0 }}>
              <Image
                src={landingImg}
                alt="Homemade Food"
                borderRadius="20%"
                w="100%" // Set image width to 100% of its container
              />
            </Box>
          </Flex>
        </Box>

        {/* Popular Meals Section */}
        <Box bg="green.100" py={10} px={4} textAlign="center" minH="70vh">
          <Heading as="h2" fontSize="3xl" mb={4} color="green.800">
            Popular Meals
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={4}
            justifyItems="center"
          >
            {meals.map((meal) => (
              <Flex
                key={meal.id}
                direction="column"
                alignItems="center"
                bg="white"
                p={4}
                borderRadius="md"
                boxShadow="md"
                minH="400px"
              >
                <Image
                  src={meal.imageSrc}
                  alt={meal.name}
                  boxSize="200px"
                  objectFit="contain"
                />
                <Heading as="h3" fontSize="lg" mt={3}>
                  {meal.name}
                </Heading>
                <Text fontSize="md" color="gray.600">
                  {meal.description}
                </Text>
                <Button colorScheme="teal" mt={4} size="sm">
                  Add to Cart
                </Button>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>

        {/* Testimonial Section */}
        <Box py={12} bg="yellow.300">
          <Center>
            <VStack spacing={8}>
              <Heading as="h2" fontSize="3xl" color={"orange.800"}>
                What Our Customers Say
              </Heading>
              <Divider />
              <Flex justify="center" wrap="wrap">
                <Box
                  key={testimonials[currentTestimonial].id}
                  maxW="md"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  w="400px"
                  p={4}
                  mx={4}
                  bg="yellow.100"
                >
                  <Avatar
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    mb={4}
                    size={5}
                  />
                  <Text fontSize="md" mb={4}>
                    "{testimonials[currentTestimonial].comment}"
                  </Text>
                  <Text fontWeight="bold">
                    {testimonials[currentTestimonial].name}
                  </Text>
                </Box>
              </Flex>
              <Flex mt={4}>
                <IconButton
                  aria-label="Previous testimonial"
                  icon={<FaArrowLeft />}
                  onClick={handlePrev}
                  mr={2}
                />
                <IconButton
                  aria-label="Next testimonial"
                  icon={<FaArrowRight />}
                  onClick={handleNext}
                />
              </Flex>
            </VStack>
          </Center>
        </Box>
      </Box>

      {/* Footer */}
      <Box bg="gray.800" color="white" py={8}>
        <Flex justify="space-around" align="center">
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Connect with Us
            </Text>
            <Flex>
              <Link href="#" isExternal mx={2}>
                <Icon as={FaFacebook} boxSize={6} />
              </Link>
              <Link href="#" isExternal mx={2}>
                <Icon as={FaTwitter} boxSize={6} />
              </Link>
              <Link href="#" isExternal mx={2}>
                <Icon as={FaInstagram} boxSize={6} />
              </Link>
            </Flex>
          </VStack>
          <Divider orientation="vertical" />
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Quick Links
            </Text>
            <Link href="#" fontSize="md">
              Home
            </Link>
            <Link as={RouterLink} to="/menu" fontSize="md">
              Meals
            </Link>
            <Link href="#" fontSize="md">
              About Us
            </Link>
            <Link href="#" fontSize="md">
              Contact
            </Link>
          </VStack>
          <Divider orientation="vertical" />
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Contact Us
            </Text>
            <Text fontSize="md">123 Main Street, Cityville</Text>
            <Text fontSize="md">Email: info@homeyfeasts.com</Text>
            <Text fontSize="md">Phone: +1 (555) 123-4567</Text>
          </VStack>
        </Flex>
        <Divider my={6} />
        <Text textAlign="center" fontSize="sm">
          &copy; 2023 Homey Feasts. All rights reserved.
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default Home;
