import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Checkbox, FormControl, FormLabel, Button, UnorderedList, ListItem, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import request from '../../utils/request';

const TeachVerify = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token || "";
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  useEffect(() => {
    const checkExistingRequest = async () => {
      try {
        const response = await request.get(`users/teach/requests/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if a pending request exists
        if (response.data.some(request => request.status === 'pending')) {
          setHasPendingRequest(true);
        }
      } catch (err) {
        // setError('Error checking requests');
      } finally {
        setLoading(false);
      }
    };

    checkExistingRequest();
  }, [user.userId, token]);

  const handleTeacherRequest = async () => {
    if (hasPendingRequest) {
      setSuccessMessage("Your request has already been sent."); // Display message if request exists
      return;
    }

    try {
      // Send the request to the server
      await request.post('/users/teach/request', 
        { userId: user.userId }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Display success message
      setSuccessMessage("Your request has been sent successfully.");
      
      // Redirect to the teacher dashboard on success
      navigate("/home");
    } catch (error) {
      console.error('Error sending the request', error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={4}>
      <Box maxW="600px" mx="auto">
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert status="info" mb={4}>  {/* Use status="info" for information message */}
            <AlertIcon />
            {successMessage}
          </Alert>
        )}
        {hasPendingRequest ? (
          <Text color="red.500" mb={4}>
            You already have a pending request. Please wait.
          </Text>
        ) : (
          <>
            <Box textAlign="center" mb={4}>
              <Heading as="h1" mb={2}>
                Terms and Conditions
              </Heading>
              <Text fontSize="lg">
                Please read the following terms and conditions carefully before proceeding.
              </Text>
            </Box>
            <UnorderedList pl={4} mb={4}>
              <ListItem>
                You must be at least 18 years old to register as a teacher on our platform.
              </ListItem>
              <ListItem>
                You must possess the necessary qualifications, expertise, and authority to teach the courses you add to the platform.
              </ListItem>
              <ListItem>
                You are required to provide accurate and complete information during the registration process.
              </ListItem>
            </UnorderedList>
            <FormControl>
              <FormLabel>
                <Checkbox colorScheme="blue" defaultChecked />
                Yes, I have read all the terms and conditions. I accept the agreement.
              </FormLabel>
            </FormControl>
            <Box textAlign="center" mt={4}>
              <Button
                bg="#0056d2"
                color="white"
                borderRadius="5px"
                _hover={{ bg: "#003e9c" }}
                onClick={handleTeacherRequest} // Change the button text
              >
                Send Teaching Request
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TeachVerify;
