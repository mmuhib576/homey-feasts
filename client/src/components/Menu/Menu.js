import React, { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";
import {
  Box,
  GridItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Image,
  SimpleGrid,
  Center,
  Flex,
  Container,
  AspectRatio,
} from "@chakra-ui/react";
import axios from "axios";

const Menu = ({ results }) => {
  // for modal
  const [modalId, setModalId] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const openDescription = (item) => {
    setSelectedItem(item);
    setModalId(item);
  };
  const closeDescription = () => {
    setSelectedItem(null);
  };
  const { addToCart } = useCart();
  return (
    <Box backgroundColor={"#FFD669"} minH={500}>
      <Center>
        <SimpleGrid
          columns={{ sm: 1, md: 2, xl: 3, "2xl": 3 }}
          gap={120}
          marginLeft={"-120px"}
        >
          {results.map((item) => (
            <GridItem key={item.id}>
              <Center
                ml={20}
                bg="white"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.05)" }}
                width={"90%"}
                backgroundColor={"#FFD669"}
              >
                <Flex
                  flexDirection={"column"}
                  width="full"
                  align={"center"}
                  justify={"center"}
                  border={"4px solid black"}
                  borderRadius={"30px"}
                  padding={0}
                >
                  <Container
                    borderRadius={"25px 25px 0px 0px"}
                    overflow="hidden"
                    maxH={"200px"}
                    padding={0}
                  >
                    <AspectRatio maxW="500px" ratio={16 / 9}>
                      <Image src={item?.image} alt="naruto" objectFit="cover" />
                    </AspectRatio>
                  </Container>
                  <Container
                    backgroundColor="#ffffff"
                    height={"full"}
                    borderRadius={"0px 0px 25px 25px"}
                  >
                    <Flex flexDirection={"column"}>
                      <Text fontSize="xl" fontWeight="bold" color={"#515555"}>
                        {item?.title}
                      </Text>
                      <Text fontSize={"16px"}>
                        Made by
                        <Text
                          as="span"
                          marginLeft={2}
                          fontSize={"13px"}
                          color={"#515555"}
                        >
                          {item?.chefName.username}
                        </Text>
                      </Text>
                      <Text fontSize="xl" fontWeight="bold" color={"#515555"}>
                        Price: {item?.price}$
                      </Text>
                      <Flex
                        flexDirection={"row-reverse"}
                        align={"center"}
                        paddingBottom={2}
                      >
                        <Button
                          mt={4}
                          onClick={() => {
                            addToCart(item);
                            closeDescription();
                          }}
                          colorScheme="teal"
                          size="sm"
                          backgroundColor="#207141"
                          borderRadius={20}
                          marginLeft={"20px"}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          mt={4}
                          onClick={() => openDescription(item)}
                          colorScheme="teal"
                          size="sm"
                          backgroundColor="#FE724C"
                          borderRadius={20}
                        >
                          View Meal
                        </Button>
                      </Flex>
                    </Flex>
                  </Container>
                </Flex>
              </Center>
            </GridItem>
          ))}
        </SimpleGrid>
      </Center>
      <Modal isOpen={!!selectedItem} onClose={closeDescription}>
        <ModalOverlay />
        <ModalContent
          borderRadius="md"
          boxShadow="md"
          bg="white"
          p={4}
          maxW="800px"
          mx="auto"
          backgroundColor="#ffc529"
        >
          <ModalHeader fontSize="xl" fontWeight="bold">
            {modalId?.title}
          </ModalHeader>
          <ModalCloseButton backgroundColor="#ffffff" borderRadius={20} />
          <ModalBody>
            <Flex flexDirection={{ sm: "column", lg: "row" }}>
              <Flex flexDirection={"column"}>
                <Text fontSize={23}>{modalId?.description}</Text>
                <Text fontSize={20} as={"b"}>
                  Chef: {selectedItem?.chefName.username}
                </Text>
                <Text fontSize={19} as={"b"}>
                  Price: {modalId?.price}$
                </Text>
              </Flex>
              <Center>
                <Image
                  src={modalId.image}
                  maxW="400px"
                  maxH={"300px"}
                  alt="image"
                ></Image>
              </Center>
            </Flex>
            <Center marginTop={"30px"}>
              <Button
                marginRight={20}
                onClick={() => {
                  addToCart(modalId);
                }}
              >
                Add to cart
              </Button>
              <Button>Order</Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Menu;
