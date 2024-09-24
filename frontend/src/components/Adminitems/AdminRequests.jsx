import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/admin/requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des demandes');
            }
        };

        fetchRequests();
    }, []);

    const handleAction = async (id, action) => {
        try {
            await axios.put(`/admin/requests/${id}`, { action });
            setRequests(requests.filter(request => request._id !== id));
        } catch (error) {
            console.error('Erreur lors du traitement de la demande');
        }
    };

    return (
        <div>
            <h2>Demandes en attente</h2>
            <ul>
                {requests.map(request => (
                    <li key={request._id}>
                        {request.userId.name} souhaite devenir enseignant.
                        <button onClick={() => handleAction(request._id, 'approve')}>Approuver</button>
                        <button onClick={() => handleAction(request._id, 'reject')}>Rejeter</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminRequests;
