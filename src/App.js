import './App.css';
import RainbowButton from "./components/Login";
import '@rainbow-me/rainbowkit/styles.css';
import { ChakraProvider, Heading } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { ethers } from "ethers";
import dmail from "./smartcontract/dmail.json"

import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { useEffect, useState } from 'react';
import Intro from './components/Intro';
import Dashboard from './components/Dashboard';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function App() {

  const toast = useToast()

  const [account, setAccount] = useState()
  const [sentMails, setSentMails] = useState([])
  const [receivedMails, setReceivedMails] = useState([])
  const contractAddress = "0x57fd19F965989a87e90e58e9bCAe6C265b714060"
  const contractABI = dmail.output.abi

  const getAllSentMails = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const dMailContract = new ethers.Contract(contractAddress, contractABI, signer);

        let mailCount = await dMailContract.getSentMailsCount(account);
        let mailBase = []

        if (mailCount > 0) {
          for (let i = 0; i < mailCount; i++) {
            let mail = await dMailContract.getSentMails(account, i);
            mailBase.push(mail)
          }
        }

        setSentMails(mailBase);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }

  }

  const getAllReceivedMails = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const dMailContract = new ethers.Contract(contractAddress, contractABI, signer);

        let mailCount = await dMailContract.getReceivedMailsCount(account);
        let mailBase = []

        if (mailCount > 0) {
          for (let i = 0; i < mailCount; i++) {
            let mail = await dMailContract.getReceivedMails(account, i);
            mailBase.push(mail)
          }
        }

        setReceivedMails(mailBase);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getAllSentMails()
    getAllReceivedMails()
  }, [account])

  const sendMail = async (to, subject, matter) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const dMailContract = new ethers.Contract(contractAddress, contractABI, signer);

        let sendmail = await dMailContract.sendMail(to, subject, matter);
        const receipt = await sendmail.wait();

        toast({
          title: 'Sending Your Mail, We will notify you once your mail is sent!',
          status: 'info',
          duration: 3000,
          isClosable: true,
        })

        if (receipt.status === 1) {
          console.log("Mail Sent");
          toast({
            title: 'Mail Sent Successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }
        else {
          toast({
            title: 'Failed To Send Email',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Failed To Send Email',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }

  }

  return (

    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize="compact" theme={midnightTheme()} initialChain={chain.polygonMumbai} >
        <ChakraProvider>
          <div className="App">
            <Heading style={{ position: "absolute", top: '2rem', left: "2rem" }} >dMail</Heading>
            <RainbowButton setAccount={setAccount} account={account} />
            {account ? <Dashboard sendMail={sendMail} getReceivedMails={getAllReceivedMails} getSentMails={getAllSentMails} sentMails={sentMails} receivedMails={receivedMails} /> : <Intro />}
          </div>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
