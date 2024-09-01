import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Text,
  Stack,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, AtSignIcon, InfoIcon } from "@chakra-ui/icons";
import axios from "axios"
import { useToast } from "@chakra-ui/react";
import { registerValidation } from "../validators";

const Register = ({ changeComp }) => {
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [password, setPassword] = useState("");
  const isError = email === "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const toast = useToast();

  const onSubmit = () => {
    const { res, mes } = registerValidation(email, first, last, password);
    if(!res){
      toast({
        position: 'top',
        title: mes,
        status: 'error',
        duration: 2000,
      })
      return;
    }
    setIsSubmitting(true);
    axios.post('https://exp-assignment-api.vercel.app/api/register', {
      email: email,
      password: password,
      first: first,
      last: last
    })
    .then((res) => {
      toast({
        position: 'top',
        title: 'User Registered Successfully',
        status: 'success',
        duration: 2500,
      })
      changeComp();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsSubmitting(false)
    })
  };

  return (
    <form
      style={{
        fontSize: "1rem",
        width: "30%",
        boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        padding: "1rem 1rem 2rem",
        borderRadius: "10px",
        backgroundColor: "rgba(255, 255, 255)"
      }}
    >
      <Text
        color="teal.500"
        mb={'1rem'}
        style={{ textAlign: "center", fontSize: "1.75rem", fontWeight: "bold" }}
      >
        Register
      </Text>
      <Stack spacing={3}>
      <FormControl isRequired>
          <InputGroup>
            <Input
              type="text"
              placeholder="First Name"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <InputRightElement>
              <InfoIcon width="2.5rem" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <Input
              type="text"
              placeholder="Last Name"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
            <InputRightElement>
              <InfoIcon width="2.5rem" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <Input
            placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputRightElement>
              <AtSignIcon width="2.5rem" />
            </InputRightElement>
          </InputGroup>
          {/* {!isError ? (
            <FormHelperText>We will never share your email.</FormHelperText>
          ) : (
            <FormErrorMessage>Email cannot be empty</FormErrorMessage>
          )} */}
        </FormControl>
        <FormControl isRequired>
          <InputGroup size="md">
            <Input
            placeholder="Password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="2.5rem">
              {showPass ? (
                <ViewOffIcon
                  _hover={{ cursor: "pointer" }}
                  h="1.75rem"
                  onClick={() => setShowPass(!showPass)}
                />
              ) : (
                <ViewIcon
                  h="1.75rem"
                  onClick={() => setShowPass(!showPass)}
                  _hover={{ cursor: "pointer" }}
                />
              )}
            </InputRightElement>
          </InputGroup>
          {password === "" ? (
            <FormErrorMessage>Password cannot be empty</FormErrorMessage>
          ) : null}
        </FormControl>
      </Stack>
      <Text
        color="teal.500"
        textUnderlineOffset="2px"
        _hover={{ textDecoration: "underline" }}
        onClick={() => changeComp()}
      >
        Already registered? <strong>Login</strong>
      </Text>
      <Button
        mt={4}
        colorScheme="teal"
        isLoading={isSubmitting}
        onClick={onSubmit}
      >
        Register
      </Button>
    </form>
  );
};

export default Register;
