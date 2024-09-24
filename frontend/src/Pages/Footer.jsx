import React from "react";
import { Box, Grid, Heading, Link, Flex, Image, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      bg="#f5f5f5"
      p={5}
      paddingBottom={{
        sm: "60px",
        md: "60px",
        lg: "20px",
      }}
      fontFamily="Source Sans 3"
      pt="60px"
      direction="column"
    >
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)", 
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)", 
          lg: "repeat(4, 1fr)", 
        }}
        gap={4}
      >
        {/* Language Courses */}
        <Box pl={{ lg: "25px", md: "15px", sm: "10px" }} pr={{ lg: "35px", md: "15px", sm: "10px" }}>
          <Heading as="h6" size="md" fontWeight="bold">
            Language Courses
          </Heading>
          <br />
          <Link fontSize="13.5px">English</Link>
          <br />
          <Link fontSize="13.5px">French</Link>
          <br />
          <Link fontSize="13.5px">Spanish</Link>
          <br />
          <Link fontSize="13.5px">Arabic</Link>
        </Box>

        {/* Trainings and Conferences */}
        <Box pl={{ lg: "25px", md: "15px", sm: "10px" }} pr={{ lg: "35px", md: "15px", sm: "10px" }}>
          <Heading as="h6" size="md" fontWeight="bold">
            Trainings and Conferences
          </Heading>
          <br />
          <Link fontSize="13.5px">Management Training</Link>
          <br />
          <Link fontSize="13.5px">History Conferences</Link>
          <br />
          <Link fontSize="13.5px">Art and Culture</Link>
          <br />
          <Link fontSize="13.5px">Live Events</Link>
        </Box>

        {/* Wellness and Consultations */}
        <Box pl={{ lg: "25px", md: "15px", sm: "10px" }} pr={{ lg: "35px", md: "15px", sm: "10px" }}>
          <Heading as="h6" size="md" fontWeight="bold">
            Wellness and Consultations
          </Heading>
          <br />
          <Link fontSize="13.5px">Psychology Consultations</Link>
          <br />
          <Link fontSize="13.5px">Life Coaching</Link>
          <br />
          <Link fontSize="13.5px">Nutrition and Health</Link>
          <br />
          <Link fontSize="13.5px">Sociology Consultations</Link>
        </Box>

        {/* Cultural Sections */}
        <Box pl={{ lg: "25px", md: "15px", sm: "10px" }} pr={{ lg: "35px", md: "15px", sm: "10px" }}>
          <Heading as="h6" size="md" fontWeight="bold">
            Cultural Sections
          </Heading>
          <br />
          <Link fontSize="13.5px">Motivation</Link>
          <br />
          <Link fontSize="13.5px">Awareness</Link>
          <br />
          <Link fontSize="13.5px">Culture</Link>
          <br />
          <Link fontSize="13.5px">Events</Link>
        </Box>

        {/* Physical and Artistic Activities */}
        <Box pl={{ lg: "25px", md: "15px", sm: "10px" }} pr={{ lg: "35px", md: "15px", sm: "10px" }}>
          <Heading as="h6" size="md" fontWeight="bold">
            Physical and Artistic Activities
          </Heading>
          <br />
          <Link fontSize="13.5px">Sports and Yoga</Link>
          <br />
          <Link fontSize="13.5px">Painting and Dance</Link>
          <br />
          <Link fontSize="13.5px">Music and Theater</Link>
        </Box>
      </Grid>

      <Flex
        mt={15}
        gap={7}
        borderTop="1px solid #c9c9c9"
        direction={{
          sm: "column",
          md: "row",
          lg: "row",
        }}
        justifyContent={{
          lg: "space-between",
        }}
        alignItems="center"
        padding={{
          sm: "10px",
          md: "35px",
          lg: "55px",
        }}
      >
        <Box>
          <Text fontSize="13.5px">© 2023 16Inspiration. All rights reserved.</Text>
        </Box>
        <Flex spacing={4} overflow='hidden'>
        <a href="https://www.facebook.com/16inspiration/" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/facebook.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
              alt="Facebook Logo"
              mr={4}
            />
          </a>
          <a href="https://www.instagram.com/16inspiration_" target="_blank" rel="noopener noreferrer">
            <Image
              display={{
                base: "none",
                sm: "block"
              }}
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/instagram.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
              alt="Instagram Logo"
              mr={4}
            />
          </a>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
