import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, Heading, Alert, AlertIcon, Spacer } from '@chakra-ui/react';
import request from '../../utils/request';

const AdminRequests = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await request.get('users/admin/requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des demandes', error);
                setError('Erreur lors de la récupération des demandes');
            }
        };

        fetchRequests();
    }, []);

    const handleAction = async (id, action) => {
        try {
            const response = await request.put(`users/admin/requests/${id}`, { action });
            setSuccessMessage(response.data.message); // Afficher le message de succès

            // Filtrer les requêtes après action
            setRequests(requests.filter(request => request._id !== id));
        } catch (error) {
            console.error('Erreur lors du traitement de la demande', error);
            setError('Erreur lors du traitement de la demande');
        }
    };

    return (
        
        <Box p={4}>
            <Spacer height="100px" />
            <Heading as="h2" mb={4}>Demandes en attente</Heading>
            {error && (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                </Alert>
            )}
            {successMessage && (
                <Alert status="success" mb={4}>
                    <AlertIcon />
                    {successMessage}
                </Alert>
            )}
            <List spacing={3}>
                {requests.map(request => (
                    <ListItem key={request._id} p={3} borderWidth={1} borderRadius="md">
                        <Box>
                            <strong>{request.userId.name}</strong> souhaite devenir enseignant.
                        </Box>
                        <Box mt={2}>
                            <Button 
                                colorScheme="green" 
                                mr={2} 
                                onClick={() => handleAction(request._id, 'approve')}
                            >
                                Approuver
                            </Button>
                            <Button 
                                colorScheme="red" 
                                onClick={() => handleAction(request._id, 'reject')}
                            >
                                Rejeter
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default AdminRequests;
