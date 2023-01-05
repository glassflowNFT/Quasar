import Head from 'next/head'
import { Inter } from '@next/font/google'
import {
   Container,
   Text,
   useColorMode,
   Button,
   Box,
   Stack,
   Heading,
   Image,
   Card,
  CardHeader, 
  CardBody,
  HStack,
  Center,
  useBreakpointValue} from '@chakra-ui/react'
import { MoonIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import Navbar from '../packages/stateless/components/Navbar'
import stars from '../public/stars.jpeg'



const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  // const { colorMode, toggleColorMode } = useColorMode()

  const isDesktop = useBreakpointValue({ base: false, lg: true })

  return (
    <>
      <Head>
        <title>Quasar</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container maxW={'3xl'}>
            <Stack as={Box}
                textAlign={'center'}
                spacing={{ base: 8, md: 14 }}
                py={{ base: 10, md: 20 }}>
                  <Center>
                  <Heading  fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', md: '5xl' }}
                            lineHeight={'100%'}
                            mt={20}>
                              <HStack>
                              <Text  color={'white'}>Transparent Judging /</Text>
                              <Text textShadow={'2px 3px white'} color={'#FB2576'}>Voting</Text> 
                              </HStack>
                  </Heading>
                  </Center>
                  <Center>
                       <Stack alignItems={'center'}>
                            <Text pb={5} w={'75%'} color='white'>
                            Quasar Module is a smart contract application and framework for custom IRL events.
                            </Text>
                            <Button>Enter App <ExternalLinkIcon mx='2px'/></Button>
                       </Stack>
                 </Center>         
                  <Center>
                    <Card variant={'filled'} backgroundColor='#150050' w={500}>
                        <CardHeader>
                            <Heading color={'white'} size='md'>
                                What is Quasar?
                            </Heading>
                        </CardHeader>
                        <CardBody textAlign={'left'} color={'white'}>
                        The Quasar Module aims to bring the power of CosmWasm, and the integrity of on-chain voting to any hosted event that will elevate both the guest and host experience.
                        Some of the things we do:

                              <ul>
                                <br />
                                <li> In-Event Entry Judging </li>
                                <li> Ticket Minting, Distribution, and Attendance Management </li>
                              </ul>
                        </CardBody>
                    </Card>
                  </Center>
            </Stack>
      </Container>
    </>
  )
}
