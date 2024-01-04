import React from "react";
import {
  Flex,
  Button,
  Container,
  AspectRatio,
  Image,
  Text,
} from "@chakra-ui/react";

const MealCard = ({ item, openDescription }) => {
  return (
    <Flex
      flexDirection="column"
      width="full"
      align="center"
      justify="center"
      border="4px solid black"
      borderRadius="30px"
      padding={0}
    >
      <Container
        borderRadius="25px 25px 0px 0px"
        overflow="hidden"
        maxH="200px"
        padding={0}
      >
        <AspectRatio maxW="500px" ratio={16 / 9}>
          <Image src={item?.image} alt="meal" objectFit="cover" />
        </AspectRatio>
      </Container>
      <Container
        backgroundColor="#ffffff"
        height="full"
        borderRadius="0px 0px 25px 25px"
      >
        <Flex flexDirection="column">
          <Text fontSize="xl" fontWeight="bold" color="#515555">
            {item?.title}
          </Text>
          <Text fontSize="16px">
            Made by{" "}
            <Text as="span" marginLeft={2} fontSize="13px" color="#515555">
              {item?.chefName.username}
            </Text>
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="#515555">
            Price: {item?.price}$
          </Text>
          <Flex flexDirection="row-reverse" align="center" paddingBottom={2}>
            <Button
              mt={4}
              onClick={() => openDescription(item)}
              colorScheme="teal"
              size="sm"
              backgroundColor="#FE724C"
              borderRadius={20}
              marginLeft={4}
            >
              View Meal
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default MealCard;
