import React, { useState, useEffect } from 'react';
import { Button, Input, Alert, AlertIcon } from '@chakra-ui/react';
import request from '../../utils/request';

const LiveSessionScheduler = () => {
  const [liveDate, setLiveDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [telegramLink] = useState('https://t.me/yourtelegramgroup'); // Lien vers votre groupe Telegram

  const scheduleLiveSession = async () => {
    setError('');
    setSuccessMessage('');

    if (!liveDate) {
      setError('Veuillez entrer une date et une heure valides.');
      return;
    }

    try {
      await request.post('/live/schedule', { date: liveDate }); // Modifiez l'URL selon vos besoins
      setSuccessMessage('Session en direct planifiée avec succès.');
    } catch (err) {
      setError('Erreur lors de la planification de la session.');
      console.error('Erreur lors de l\'appel API:', err);
    }
  };

  useEffect(() => {
    const checkLiveStatus = () => {
      const liveTime = new Date(liveDate).getTime();
      const currentTime = new Date().getTime();

      if (liveTime && currentTime >= liveTime) {
        setIsLive(true);
      }
    };

    const interval = setInterval(checkLiveStatus, 1000); // Vérifier chaque seconde

    return () => clearInterval(interval); // Nettoyer l'intervalle à la désactivation du composant
  }, [liveDate]);

  return (
    <div>
      <Input 
        type="datetime-local" 
        placeholder="Planifiez votre session" 
        value={liveDate} 
        onChange={(e) => setLiveDate(e.target.value)} 
      />
      <Button onClick={scheduleLiveSession} colorScheme="blue" mt={2}>
        Planifier la Session
      </Button>

      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}

      {isLive && (
        <div style={{ animation: 'blink-animation 1s infinite' }}>
          <p style={{ color: 'red' }}>🔔 En direct maintenant !</p>
          <Button onClick={() => window.open(telegramLink, '_blank')} colorScheme="telegram">
            Rejoindre le Live sur Telegram
          </Button>
        </div>
      )}

      <style>{`
        @keyframes blink-animation {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LiveSessionScheduler;
