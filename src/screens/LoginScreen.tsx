import { Form, useActionData, useNavigation } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';

import Logo from '../components/Logo';
import ThemeToggleButton from '../components/ThemeToggleButton';

export default function LoginPage() {
  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get('username') != null;

  const actionData = useActionData() as { error: string } | undefined;

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Don&apos;t have an account? <Link href="/signup">Sign up</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Form method="post" replace>
              <input type="hidden" name="redirectTo" value="/" />
              <Stack>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" name="email" />
                <FormLabel htmlFor="email">Password</FormLabel>
                <Input id="password" type="password" name="password" />
                <Button type="submit" disabled={isLoggingIn}>
                  {isLoggingIn ? 'Logging in...' : 'Login'}
                </Button>
              </Stack>
              {actionData && actionData.error ? (
                <p style={{ color: 'red' }}>{actionData.error}</p>
              ) : null}
            </Form>
          </Stack>
        </Box>
      </Stack>
      <Box>
        <ThemeToggleButton pos="fixed" top="2" right="2" />
      </Box>
    </Container>
  );
}
