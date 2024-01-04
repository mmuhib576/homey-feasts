// MenuRoute.js
import { useState } from "react";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../App.css";
import Menu from "../components/Menu/Menu";
import { SearchBar } from "../components/SearchBar";
import Status from "../components/Status";

function MenuRoute() {
  const customTheme = extendTheme({
    breakpoints: {
      sm: "30em",
      md: "48em",
      lg: "62em",
      xl: "80em",
    },
  });

  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <ChakraProvider theme={customTheme} backgroundColor="#ffc529">
        <Box className="search-bar-container">
          <SearchBar setResults={setResults} results={results} />
        </Box>
        <Menu results={results} />
      </ChakraProvider>
    </div>
  );
}

export default MenuRoute;
