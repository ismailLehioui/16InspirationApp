import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // ou autre méthode pour récupérer l'utilisateur actuel
import request from "../../utils/request"; // Votre fichier d'axios

const TeachVerify = () => {
  const [message, setMessage] = useState('');
  const user = useSelector(state => state.auth.user); // Supposant que vous avez l'utilisateur dans le store Redux

  const handleTeacherRequest = () => {
    request.post("/requests/become-teacher", { userId: user._id })  // Envoyer la requête avec l'ID utilisateur
      .then((response) => {
        alert("Votre demande pour devenir enseignant a été envoyée.");
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la demande:", error);
      });
  };

  return (
    <div>
      {user.role !== 'teacher' && user.role !== 'admin' ? (
        <>
          <h2>Demandez à devenir un enseignant sur 16Ispiration</h2>
          <button onClick={handleTeacherRequest}>Envoyer une demande</button>
        </>
      ) : (
        <p>Vous êtes déjà un enseignant ou un administrateur.</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default TeachVerify;














// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import {
//   Box,
//   Heading,
//   Text,
//   Checkbox,
//   FormControl,
//   FormLabel,
//   Button,
//   UnorderedList,
//   ListItem,
// } from '@chakra-ui/react';

// import { useNavigate } from "react-router-dom";
// import { changeRole } from '../../Redux/TeacherReducer/action';


// const TeachVerify = () => {
    
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const user = JSON.parse(localStorage.getItem('user'))
// //   console.log(user);

//   function teacher() {
//     dispatch(changeRole('teacher',user.userId));
//     navigate("/TeacherDashboard");
//   }
  

//   return (
//     <Box p={4}>
//       <Box maxW="600px" mx="auto">
//         <Box textAlign="center" mb={4}>
//           <Heading as="h1" mb={2}>
//             Terms & Conditions
//           </Heading>
//           <Text fontSize="lg">
//             Please read the following terms and conditions carefully before
//             proceeding.
//           </Text>
//         </Box>
//         <UnorderedList pl={4} mb={4}>
//           <ListItem>
//             You must be at least 18 years old to register as a teacher on our
//             platform.
//           </ListItem>
//           <ListItem>
//             You must possess the necessary qualifications, expertise, and
//             authority to teach the courses you add to the platform.
//           </ListItem>
//           <ListItem>
//             You are required to provide accurate and complete information during
//             the registration process.
//           </ListItem>
//         </UnorderedList>
//         <FormControl>
//           <FormLabel>
//             <Checkbox colorScheme="blue" defaultChecked /> Yes, I have read
//             all the terms and conditions. I accept the agreement.
//           </FormLabel>
//         </FormControl>
//         <Box textAlign="center" mt={4}>
//         <Button
//               bg="#0056d2"
//               color="white"
//               borderRadius="5px"
//               _hover={{ bg: "#003e9c" }}
//               onClick={teacher}
//             >
//               Submit
//             </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default TeachVerify;
