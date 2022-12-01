import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import {
  Flex,
  Box,

  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';


const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>

      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>

          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
                <form spacing={4} onSubmit={handleFormSubmit}>

                  <FormLabel>Email address</FormLabel>
                  <Input 
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />

                  <FormLabel>Password</FormLabel>
                  <Input 
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />

            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                      }}
                      type="submit">
                Sign in
              </Button>
            </Stack>
                </form>
              )}
              {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
              )}
            </div>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
