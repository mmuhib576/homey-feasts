import React, { useEffect, useState } from "react";
import { Box, Text, Center, Container } from "@chakra-ui/react";

function Status() {
  var orderStatus = "Pending";

  var [orderState, setOrderState] = useState(null);

  useEffect(() => {
    if (orderStatus === "Pending") {
      setOrderState("Your order is Pending");
    } else if (orderStatus === "Processing") {
      setOrderState("Your order is cooking");
    } else if (orderStatus === "Delivered") {
      setOrderState("Your order is Delivered");
    } else {
      setOrderState("check cart");
    }
  }, [orderStatus]);
  return (
    <Box backgroundColor={"#FFD669"} paddingY={10}>
      <Container>
        <Center
          backgroundColor={"white"}
          paddingY={"15px"}
          borderRadius={50}
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.05)" }}
          border={"2px solid black"}
        >
          <Text color={"black"} backgroundColor={"white"}>
            {orderState}
          </Text>
        </Center>
      </Container>
    </Box>
  );
}

export default Status;
