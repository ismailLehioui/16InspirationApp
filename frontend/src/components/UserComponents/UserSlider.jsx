import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Slider,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const UserSlider = () => {
  // Updated images for 16Inspiration
  const images = [
    "https://images.pexels.com/photos/5212653/pexels-photo-5212653.jpeg?cs=srgb&dl=pexels-max-fischer-5212653.jpg&fm=jpg",
    "https://www.yool.education/storage/blogs/82/1678503568.webp",
    "https://digital-learning-academy.com/wp-content/uploads/2020/02/udemy-apprentissage-en-ligne.jpg",
    "https://www.vedantu.com/seo/content-images/33e42c38-8332-4d51-9dcf-65a4f262b5da.png",
    "https://media.wired.com/photos/6365b7166776a0176c76e4de/master/w_2560%2Cc_limit/All-the-Free-Resources-You-Can-Find-at-Your-Library-Gear-GettyImages-1331816640.jpg",
  ];

  // Updated text to reflect 16Inspiration’s offerings
  const textOnImage = [
    "Motivation for Success",
    "Cultural Enrichment",
    "Wellness and Growth",
    "Inspiring Learning Journeys",
    "Collaboration and Community",
  ];

  // Updated descriptions focusing on the platform’s mission
  const indexDescription = [
    "At 16Inspiration, we believe in motivating individuals to reach their highest potential through personalized guidance, creative learning, and expert advice.",
    "Discover the world through cultural enrichment programs that open your mind to new perspectives and foster deeper understanding of global arts and traditions.",
    "Our wellness services are designed to help you achieve balance, personal growth, and mental clarity. Explore our offerings in life coaching, yoga, and therapy.",
    "Learn from experts across various fields, from entrepreneurship to social sciences, as we bring you the best in inspirational learning content.",
    "Join a vibrant community of learners, creators, and dreamers at 16Inspiration. Together, we can collaborate and grow toward personal and professional success.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (value) => {
    setCurrentIndex(value);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container mt="100px" maxW="container.xxl">
      <Flex direction="column" align="center" bg="#F7F3EA">
        {/* Slider Controls and Image */}
        <Flex align="center" justify="space-between" mb={4}>
          <Button colorScheme="blue" borderRadius="50%" onClick={handlePrevious}>
            <ArrowLeftIcon />
          </Button>
          <Box position="relative" p="2">
            <Image
              w="2000px"
              h="400px"
              fit="cover"
              src={`${images[currentIndex]}`}
            />
            <Box
              position="absolute"
              bottom="10"
              w="100%"
              color="rgba(255, 255, 255, 0.8)"
              p="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Text>
                <Heading
                  size="3xl"
                  letterSpacing="1.5px"
                  style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
                >
                  {textOnImage[currentIndex]}
                </Heading>
              </Text>
            </Box>
          </Box>
          <Button colorScheme="blue" borderRadius="50%" onClick={handleNext}>
            <ArrowRightIcon />
          </Button>
        </Flex>

        {/* Slider Input */}
        <Slider
          defaultValue={currentIndex}
          min={0}
          max={images.length - 1}
          onChange={handleChange}
          w="400px"
        ></Slider>

        {/* Description Box */}
        <Box pb="3rem" w="80%" m="auto" p="4">
          <Text>
            <Heading size="md" fontWeight="500" letterSpacing="2px" lineHeight="2rem">
              {indexDescription[currentIndex]}
            </Heading>
          </Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default UserSlider;
