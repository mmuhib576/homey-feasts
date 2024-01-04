import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  VStack,
  Stack,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "./Auth/AuthContext";

function Blog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5001/blog/getblogs");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    const userType = user.role;
    const userId = user.authUser._id;

    const requestBody = {
      title,
      description,
      userId,
    };

    if (userType === "chef" || userType === "user") {
      requestBody[userType] = userId;
    }

    const response = await fetch("http://localhost:5001/blog/createblog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      fetchPosts();
      setTitle("");
      setDescription("");
      setShowAddPostForm(false);
    }
  };

  return (
    <Box backgroundColor={"#FFD669"}>
      <VStack p={4} spacing={4} align="start" maxW="800px" mx="auto">
        <Flex align="center">
          <Heading mb={4}>Homey Feasts Blogs Section</Heading>
        </Flex>

        <Button
          bgColor={"orange.400"}
          color="white"
          onClick={() => setShowAddPostForm(!showAddPostForm)}
        >
          {showAddPostForm ? "Cancel" : "Add Post"}
        </Button>
        {showAddPostForm && (
          <VStack spacing={4} w="100%">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={handlePostSubmit} colorScheme="orange">
              Post
            </Button>
          </VStack>
        )}
        <VStack spacing={4} w="100%">
          {posts.map((post) => (
            <Box
              key={post._id}
              borderWidth="1px"
              p={4}
              borderRadius="md"
              borderColor={"yellow.500"}
              w="100%"
              _hover={{ bg: "yellow.100" }}
              backgroundColor={"yellow.200"}
            >
              <Heading size="md" align="start">
                {post.title}
              </Heading>
              <Text>{post.description}</Text>
              <Text fontSize="sm" color="gray.500">
                {`By ${
                  post.user ? post.user.username : post.chef.username
                } on ${new Date(post.createdAt).toLocaleString()}`}
              </Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

export default Blog;
