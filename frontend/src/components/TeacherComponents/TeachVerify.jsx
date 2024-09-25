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
  const [successMessage, setSuccessMessage] = useState(""); // État pour le message de succès

  useEffect(() => {
    const checkExistingRequest = async () => {
      try {
        const response = await request.get(`users/teach/requests/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Vérifier si une demande en attente existe
        if (response.data.some(request => request.status === 'pending')) {
          setHasPendingRequest(true);
        }
      } catch (err) {
        // setError('Erreur lors de la vérification des demandes');
      } finally {
        setLoading(false);
      }
    };

    checkExistingRequest();
  }, [user.userId, token]);

  const handleTeacherRequest = async () => {
    if (hasPendingRequest) {
      setSuccessMessage("Votre demande a déjà été envoyée."); // Afficher le message si la demande existe déjà
      return;
    }

    try {
      // Envoyer la demande au serveur
      await request.post('/users/teach/request', 
        { userId: user.userId }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Afficher le message de succès
      setSuccessMessage("Votre demande a été envoyée avec succès.");
      
      // Rediriger vers le tableau de bord enseignant en cas de succès
      navigate("/home");
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande', error);
    }
  };

  if (loading) {
    return <Text>Chargement...</Text>;
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
          <Alert status="info" mb={4}>  {/* Utiliser status="info" pour le message d'information */}
            <AlertIcon />
            {successMessage}
          </Alert>
        )}
        {hasPendingRequest ? (
          <Text color="red.500" mb={4}>
            Vous avez déjà une demande en attente. Veuillez patienter.
          </Text>
        ) : (
          <>
            <Box textAlign="center" mb={4}>
              <Heading as="h1" mb={2}>
                Termes et Conditions
              </Heading>
              <Text fontSize="lg">
                Veuillez lire attentivement les termes et conditions suivants avant de continuer.
              </Text>
            </Box>
            <UnorderedList pl={4} mb={4}>
              <ListItem>
                Vous devez avoir au moins 18 ans pour vous inscrire en tant qu'enseignant sur notre plateforme.
              </ListItem>
              <ListItem>
                Vous devez posséder les qualifications, l'expertise et l'autorité nécessaires pour enseigner les cours que vous ajoutez à la plateforme.
              </ListItem>
              <ListItem>
                Vous êtes tenu de fournir des informations exactes et complètes lors du processus d'inscription.
              </ListItem>
            </UnorderedList>
            <FormControl>
              <FormLabel>
                <Checkbox colorScheme="blue" defaultChecked />
                Oui, j'ai lu tous les termes et conditions. J'accepte l'accord.
              </FormLabel>
            </FormControl>
            <Box textAlign="center" mt={4}>
              <Button
                bg="#0056d2"
                color="white"
                borderRadius="5px"
                _hover={{ bg: "#003e9c" }}
                onClick={handleTeacherRequest}
              >
                Soumettre
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TeachVerify;
