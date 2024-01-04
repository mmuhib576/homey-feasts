import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  Image,
  Center,
  Flex,
  Container,
  useToast,
  AspectRatio,
} from "@chakra-ui/react";
import { useCart } from "./CartContext";

function Cart({ onClose }) {
  const {
    cart,
    total,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const toast = useToast();

  const handleCheckout = (event) => {
    event.preventDefault();

    if (cart.length > 0) {
      console.log(cart);
      navigate("/payment", { state: { cart, total } });
      onClose();
    } else {
      toast({
        title: "No items in cart",
        description: "Cannot proceed to checkout with an empty cart.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCart = () => {
    if (cart.length === 0) {
      return (
        <Center fontSize="6xl" fontWeight="bold" padding={10}>
          Nothing in cart
        </Center>
      );
    } else {
      return cart.map((item) => (
        <Flex
          key={item._id}
          paddingY={5}
          w="full"
          align="center"
          justifyContent="space-around"
        >
          {/* image */}
          <AspectRatio w={180} maxW="200px" ratio={16 / 9}>
            <Image src={item.image} alt="img" objectFit="cover" />
          </AspectRatio>
          {/* name, quantity, veg/non-veg */}
          <Box>
            <Text fontWeight="bold">{item.title}</Text>
            <Text>{item.quantity}</Text>
            <Text>{item.weight}</Text>
          </Box>
          <Flex direction="column" justifyContent="flex-end">
            <Flex direction="row" align="center">
              <Button
                backgroundColor="#D0D0D0"
                onClick={() => decreaseQuantity(item._id)}
              >
                -
              </Button>
              <Text paddingX={2}>{item.quantity}</Text>
              <Button
                backgroundColor="#D0D0D0"
                onClick={() => increaseQuantity(item._id)}
              >
                +
              </Button>
            </Flex>
          </Flex>
          <Flex direction="column" justifyContent="flex-end">
            <Text fontWeight="bold">${item.price * item.quantity}</Text>
            <Text
              fontSize="sm"
              color="red"
              as="button"
              _hover={{
                textDecoration: "underline",
              }}
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </Text>
          </Flex>
        </Flex>
      ));
    }
  };

  return (
    <Center>
      <Box w="100%">
        <Flex align="center" justifyContent="space-between">
          <Text fontSize="xl" color="#989898" fontWeight="bold">
            Shopping Cart
          </Text>
          <Text
            fontSize="md"
            color="red"
            as="button"
            _hover={{
              textDecoration: "underline",
            }}
            onClick={clearCart}
          >
            Remove all
          </Text>
        </Flex>
        {/* cart items */}
        <Flex direction="column">{handleCart()}</Flex>
        <Container backgroundColor="#B0B0B0" h="2px" />
        {/* total */}
        <Flex
          direction="column"
          align="center"
          justifyContent="space-between"
          paddingY={5}
        >
          <Flex justifyContent="flex-end" w="full">
            <Flex direction="column">
              <Text fontSize="lg" fontWeight="bold">
                SubTotal
              </Text>
              <Text fontSize="sm">{cart.length} items</Text>
            </Flex>
            <Text fontSize="lg" fontWeight="bold" paddingLeft={10}>
              ${total}
            </Text>
          </Flex>
          <Flex align="center" justifyContent="flex-end" w="full" paddingY={2}>
            <Link style={{ textDecoration: "none" }}>
              <Button
                onClick={(e) => handleCheckout(e)}
                backgroundColor="#515555"
                borderRadius={20}
                color="white"
                paddingX={12}
                _hover={{
                  backgroundColor: "skyblue",
                }}
              >
                Checkout
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Center>
  );
}

export default Cart;
