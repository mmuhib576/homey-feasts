// SearchBar.js
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Box, Flex, useToast } from "@chakra-ui/react";

export const SearchBar = ({ results, setResults }) => {
  const [input, setInput] = useState("");
  const [chef, setChef] = useState("");
  const [meal, setMeal] = useState("");
  const [searchOption, setSearchOption] = useState("chef");
  const toast = useToast();
  // axios.defaults.withCredentials = true;
  useEffect(() => {
    // Initial fetch of all meals
    axios
      .get(`http://localhost:5001/meals/getmeals`)
      .then(function (response) {
        setResults(response.data);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }, [setResults]);

  useEffect(() => {
    // Handle search by chef or meal
    if (
      (searchOption === "chef" && chef) ||
      (searchOption === "meal" && meal)
    ) {
      const filteredMeals = results.filter((result) =>
        searchOption === "chef"
          ? result.chefName.username === chef
          : result.title.toLowerCase().includes(meal.toLowerCase())
      );

      if (filteredMeals.length === 0) {
        toast({
          title: "No Meals Found",
          description: `Cannot find meals for '${
            searchOption === "chef" ? chef : meal
          }'`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }

      setResults(filteredMeals);
    } else {
      axios
        .get(`http://localhost:5001/meals/getmeals`)
        .then(function (response) {
          setResults(response.data);
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    }
  }, [chef, meal, searchOption]);

  const handleClick = () => {
    if (searchOption === "chef") {
      setChef(input);
      setMeal("");
    } else {
      setMeal(input);
      setChef("");
    }
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleDropdownChange = (value) => {
    setSearchOption(value);
    setInput("");
  };

  return (
    <Flex className="input-wrapper" alignContent="center">
      <FaSearch id="search-icon" size={22} />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <select onChange={(e) => handleDropdownChange(e.target.value)}>
        <option value="chef">Search by Chef</option>
        <option value="meal">Search by Meal</option>
      </select>
      <Box as="button" fontSize={18} onClick={handleClick}>
        Search
      </Box>
    </Flex>
  );
};

export default SearchBar;
