import React from 'react';
import { Button } from '@chakra-ui/react';

const JoinTelegramButton = ({ telegramLink }) => {
    const handleJoin = () => {
        window.open(telegramLink, "_blank"); // Ouvre le lien Telegram dans un nouvel onglet
    };

    return (
        <Button onClick={handleJoin} colorScheme="telegram">
            Rejoindre le Live sur Telegram
        </Button>
    );
};

export default JoinTelegramButton;
