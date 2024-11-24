import React, { useCallback } from "react";
import Model from "react-body-highlighter";
import { Box, Text, Heading, Stack, useColorMode, Divider } from "@chakra-ui/react";
import "./styles.css";

export default function HumanBodyCard() {
  const { colorMode } = useColorMode();

  const data = [
    {
      name: "Bench Press",
      muscles: ["chest", "triceps", "front-deltoids"]
    },
    {
      name: "Tricep Pushdown",
      muscles: ["triceps"]
    }
  ];

  const handleClick = useCallback(({ muscle, data }) => {
    const { exercises, frequency } = data;

    alert(
      `You clicked the ${muscle}! You've worked out this muscle ${frequency} times through the following exercises: ${JSON.stringify(
        exercises
      )}`
    );
  }, []);

  return (
    <Box
      maxW="500px"
      mx="auto"
      p={6}
      bg={colorMode === "light" ? "gray.50" : "gray.700"}
      borderRadius="lg"
      boxShadow="md"
      textAlign="center"
    >
      <Heading as="h2" size="lg" mb={4}>
        Human Body Workout Visualization
      </Heading>
      <Text color="gray.500" fontSize="sm" mb={4}>
        Click on a muscle group to see the exercises you've done for it!
      </Text>
      <Divider mb={6} />

      <Stack spacing={8}>
        {/* Anterior (Front) View */}
        <Box>
          <Text fontWeight="bold" mb={2}>Anterior View</Text>
          <Model data={data} onClick={handleClick} />
        </Box>

        {/* Posterior (Back) View */}
        <Box>
          <Text fontWeight="bold" mb={2}>Posterior View</Text>
          <Model
            type="posterior"
            data={data}
            highlightedColors={["#e65a5a", "#db2f2f"]}
            onClick={handleClick}
          />
        </Box>
      </Stack>
    </Box>
  );
}
