import { AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { ExternalLinkIcon, WarningIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  useColorModeValue,
  useDisclosure,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react';

import ThemeToggleButton from './ThemeToggleButton';

export default function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  const navigate = useNavigate();

  return (
    <chakra.header bg={bg} w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <Flex>
          <chakra.a
            href="/"
            title="TaskHub Home page"
            display="flex"
            alignItems="center"
          >
            <Image
              src="/logo.png"
              width="100px"
              height="30px"
              alt="TaskHub Logo"
            />
            <VisuallyHidden>TaskHub</VisuallyHidden>
          </chakra.a>
        </Flex>
        <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
          Task Board
        </chakra.h1>
        <HStack display="flex" alignItems="center" spacing={1}>
          <HStack
            spacing={1}
            mr={1}
            color="brand.500"
            display={{ base: 'none', md: 'inline-flex' }}
          >
            <Link
              variant="ghost"
              href="https://github.com/sameer55chauhan"
              isExternal
            >
              Github <ExternalLinkIcon mx="2px" />
            </Link>
            <Link
              variant="ghost"
              href="https://www.linkedin.com/in/sameer-chauhan-9b0589192/"
              isExternal
            >
              Linkedin <ExternalLinkIcon mx="2px" />
            </Link>
          </HStack>
          <Box>
            <Button
              mr={3}
              rightIcon={<WarningIcon />}
              onClick={() => navigate('/logout')}
              size="sm"
            >
              Logout
            </Button>
            <ThemeToggleButton />
          </Box>
          <Box display={{ base: 'inline-flex', md: 'none' }}>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="Open menu"
              fontSize="20px"
              color={useColorModeValue('gray.800', 'inherit')}
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />
            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? 'flex' : 'none'}
              flexDirection="column"
              p={2}
              pb={4}
              m={2}
              bg={bg}
              spacing={3}
              rounded="sm"
              shadow="sm"
            >
              <CloseButton
                aria-label="Close menu"
                onClick={mobileNav.onClose}
              />
              <Link
                variant="ghost"
                href="https://github.com/sameer55chauhan"
                isExternal
              >
                Github <ExternalLinkIcon mx="2px" />
              </Link>
              <Link
                variant="ghost"
                href="https://www.linkedin.com/in/sameer-chauhan-9b0589192/"
                isExternal
              >
                Linkedin <ExternalLinkIcon mx="2px" />
              </Link>
            </VStack>
          </Box>
        </HStack>
      </Flex>
    </chakra.header>
  );
}
