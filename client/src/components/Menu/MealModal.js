import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Image,
  Flex,
  Center,
} from "@chakra-ui/react";

const MealModal = ({ selectedItem, closeDescription }) => {
  return (
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
          {selectedItem?.title}
        </ModalHeader>
        <ModalCloseButton backgroundColor="#ffffff" borderRadius={20} />
        <ModalBody>
          <Flex flexDirection={{ sm: "column", lg: "row" }}>
            <Flex flexDirection="column">
              <Text fontSize={23}>{selectedItem?.description}</Text>
              <Text fontSize={20} as="b">
                Chef: {selectedItem?.chefName.username}
              </Text>
              <Text fontSize={19} as="b">
                Price: {selectedItem?.price}$
              </Text>
            </Flex>
            <Center>
              <Image
                src={selectedItem?.image}
                maxW="400px"
                maxH="300px"
                alt="image"
              ></Image>
            </Center>
          </Flex>
          <Center marginTop="30px">
            <Button marginRight={20}>Add to cart</Button>
            <Button>Order</Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MealModal;
