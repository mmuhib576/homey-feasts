import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Montserrat, sans-serif",
    subheading: "Nunito, sans-serif",
    body: "Nunito, sans-serif",
  },
  colors: {
    primary: {
      50: "#FDFDFD",
    },
    accent: {
      yellow: "#FFD669",
      red: "#FE724C",
      green: "#207141",
      black: "#272D2F",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "medium",
        borderRadius: "50px",
      },
      sizes: {
        10: {
          fontSize: "md",
          borderRadius: "10px",
        },
        0: {
          fontSize: "md",
          borderRadius: "0",
        },
      },
      variants: {
        yellow: {
          backgroundColor: "accent.yellow",
          color: "white",
          _hover: {
            backgroundColor: "accent.yellow",
          },
        },
        red: {
          backgroundColor: "accent.red",
          color: "white",
          _hover: {
            backgroundColor: "accent.red",
          },
        },
        green: {
          backgroundColor: "accent.green",
          color: "white",
          _hover: {
            backgroundColor: "accent.green",
          },
        },
        black: {
          backgroundColor: "accent.black",
          color: "white",
          _hover: {
            backgroundColor: "accent.black",
          },
        },
      },
    },
  },
});

export default theme;
