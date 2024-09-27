import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Pages/Navbar";
import logoGoogle from "../asset/google.png";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { loginFetch } from "../Redux/UserReducer/action";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "./SignUp";

const Login = () => {
  const emailInput = useRef(null);
  const backgroundRef = useRef(null);
  const emailbox = useRef(null);
  const passwordInput = useRef(null);
  const passwordbox = useRef(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const userStore = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  // Google Auth function
  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`, "_self");
  };

  function showInput(e) {
    const ele = e.target.id;
    if (ele === "email") {
      emailInput.current.style.display = "block";
      emailInput.current.focus();
      emailbox.current.style.padding = "5px 20px";
    } else if (ele === "password") {
      passwordInput.current.style.display = "block";
      passwordInput.current.focus();
      passwordbox.current.style.padding = "5px 20px";
    }
  }

  function blockInput(event) {
    if (event.target === backgroundRef.current && !form.email) {
      emailInput.current.style.display = "none";
      emailbox.current.style.padding = "20px";
    }
    if (event.target === backgroundRef.current && !form.password) {
      passwordInput.current.style.display = "none";
      passwordbox.current.style.padding = "20px";
    }
  }

  function handleInput(e) {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleLogin() {
    dispatch(loginFetch(form)).then((res) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.message) {
        showToast({ toast, message: "Login Successful", color: "green" });
        setForm({ email: "", password: "" });
      } else {
        showToast({ toast, message: userStore?.isError, color: "red" });
      }
    });
  }

  useEffect(() => {
    if (userStore.isAuth) {
      if (userStore?.role === "user") {
        navigate("/home");
      } else if (userStore?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (userStore?.role === "teacher") {
        navigate("/TeacherDashboard");
      }
    }
  }, [userStore?.isAuth, userStore?.role, navigate]);

  return (
    <Box pb="2rem">
      <Box>
        <Navbar />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        pt="100px"
        onClick={blockInput}
        ref={backgroundRef}
      >
        <Box w={{ base: "90%", sm: "80%", md: "40%", lg: "30%" }}>
          <Box mt="15px">
            <Heading size="md">Log in to your BionicSoul Account</Heading>
          </Box>
          {/* Form fields */}
          <Box mt="35px">
            <Box
              border="1px solid"
              p="20px"
              id="email"
              m="5px 0"
              onClick={showInput}
              ref={emailbox}
            >
              <Box>
                <Heading id="email" size="xs">
                  Email
                </Heading>
              </Box>
              <Box>
                <Input
                  display="none"
                  ref={emailInput}
                  border="none"
                  p="0px"
                  focusBorderColor="transparent"
                  _focus={{ outline: "none" }}
                  name="email"
                  value={form.email}
                  onChange={handleInput}
                />
              </Box>
            </Box>
            <Box
              border="1px solid"
              p="20px"
              id="password"
              m="5px 0"
              onClick={showInput}
              ref={passwordbox}
            >
              <Box>
                <Heading id="password" size="xs">
                  Password
                </Heading>
              </Box>
              <Box>
                <Input
                  type="password"
                  display="none"
                  ref={passwordInput}
                  border="none"
                  size="sm"
                  focusBorderColor="transparent"
                  _focus={{ outline: "none" }}
                  name="password"
                  value={form.password}
                  onChange={handleInput}
                />
              </Box>
            </Box>
            {/* Link to Signup */}
            <Box display="flex" m="1rem 0" fontSize="0.7rem">
              <Text>You don't have an account?</Text>
              <Link to="/signup">
                <Text _hover={{}} fontWeight="500" ml="0.5rem" color="black">
                  SignUp
                </Text>
              </Link>
            </Box>
            {/* Login button */}
            <Box mt="15px">
              <Button
                w="100%"
                color="white"
                bg="#0056D2"
                _hover={{ background: "#1E88E5", color: "#CFD8DC" }}
                borderRadius="0"
                textAlign="center"
                onClick={handleLogin}
              >
                <Heading size="xs">
                  {userStore.loading ? <Spinner color="white" /> : "Log in"}
                </Heading>
              </Button>
            </Box>
            {/* Google Sign In button */}
            <Box mt="15px">
              <Button
                w="100%"
                color="black"
                bg="white"
                border="1px solid"
                borderRadius="0"
                textAlign="center"
                onClick={googleAuth}
              >
                <Flex alignItems="center">
                  <img
                    src={logoGoogle}
                    alt="google icon"
                    style={{ marginRight: "10px", width: "20px", height: "20px" }} // Taille ajustée ici
                  />
                  <Text>Sign in with Google</Text>
                </Flex>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
