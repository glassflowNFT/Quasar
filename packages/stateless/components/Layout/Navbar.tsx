import React from 'react'
import Link from 'next/link'
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
    useBreakpointValue,
    useColorModeValue,
    Text,
    Divider
  } from '@chakra-ui/react'
import { ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons'


function Navbar() {
  const isDesktop = useBreakpointValue({ base: false, lg: true })

  function toHome() {
    
  }

  return (
    <Box as='section'>
            <Box as='nav' mt={3} mb={3}>  
                <Container maxW={'5xl'}>
                    <HStack spacing="10" justify="space-between">
                        <Text fontWeight={600} fontSize='4xl' color={'#FB2576'} textShadow={'2px 3px white'}>Quasar</Text>
                        {isDesktop ? (
                          <Flex>
                          <HStack spacing="8" justify="space-between">
                              <Link color={'white'} href='https://github.com/glassflowNFT/Quasar'>Documentation <ExternalLinkIcon mx='2px'/> </Link>
                              <Link href='/home' passHref>
                              <Button>Enter App <ExternalLinkIcon mx='2px'/></Button>
                              </Link>
                          </HStack>
                      </Flex>
                        ) : (
                          <Button>Enter App <ExternalLinkIcon mx='2px'/></Button>
                        )}   
                    </HStack>
                </Container>
            </Box>
            <Box opacity={'40%'}>
            <Divider />
            </Box>
    </Box>
  )
}

export default Navbar