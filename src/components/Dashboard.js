import React, { useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Input,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Heading,
    Text,
    Textarea,
    Button,
    ButtonGroup
} from '@chakra-ui/react'

const Dashboard = (props) => {

    const [toAddress, setToAddress] = useState("")
    const [subject, setSubject] = useState("")
    const [mainContent, setMainContent] = useState("")

    return (
        <div>
            <Tabs isFitted isLazy variant='enclosed' width={"80vw"} defaultIndex={2} style={{ position: "absolute", top: "8rem", left: "10vw" }} >
                <TabList mb='1em'>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }} >Received Mails</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }} >Sent Mails</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }} >Write A Mail</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel id='received'>
                        <Accordion allowToggle>
                            {props.receivedMails ?
                                <div>
                                    {props.receivedMails.map((mail, index) => {
                                        return <AccordionItem key={index}>
                                            <h2>
                                                <AccordionButton>
                                                    <Box flex='1' textAlign='left'>
                                                        {mail.subject}
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4} textAlign='left'>
                                                Sent By: {mail[0]}
                                                <br />
                                                Sent On: {new Date(Number(mail[4]._hex)).toLocaleDateString("en-US") + ", " + new Date(Number(mail[4]._hex)).toLocaleTimeString("en-US")}
                                                <br /><br />
                                                {mail[3]}
                                            </AccordionPanel>
                                        </AccordionItem>
                                    })}
                                </div> :
                                <Button>No Mails Yet</Button>}
                        </Accordion>
                    </TabPanel>
                    <TabPanel id='sent'>
                        <Accordion allowToggle>
                            {props.sentMails ?
                                <div>
                                    {props.sentMails.map((mail, index) => {
                                        return <AccordionItem key={index}>
                                            <h2>
                                                <AccordionButton>
                                                    <Box flex='1' textAlign='left'>
                                                        {mail[2]}
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4} textAlign='left'>
                                                Sent To: {mail[1]}
                                                <br />
                                                Sent On: {new Date(Number(mail[4]._hex)).toLocaleDateString("en-US") + ", " + new Date(Number(mail[4]._hex)).toLocaleTimeString("en-US")}
                                                <br /><br />
                                                {mail[3]}
                                            </AccordionPanel>
                                        </AccordionItem>
                                    })}
                                </div> :
                                <Button>No Mails Yet</Button>}
                        </Accordion>
                    </TabPanel>
                    <TabPanel id='send'>
                        <Heading style={{ marginTop: "2rem" }} >Write A Mail</Heading>
                        <Input onChange={(e) => setToAddress(e.target.value)} style={{ maxWidth: "600px", marginTop: "2rem" }} variant='flushed' placeholder='To Wallet Address (eg: 0x123...789)' />
                        <Input onChange={(e) => setSubject(e.target.value)} style={{ maxWidth: "600px", marginTop: "2rem" }} variant='flushed' placeholder='Subject Of Email (eg: Hello, Welcome To dMail!)' />
                        <Textarea onChange={(e) => setMainContent(e.target.value)} style={{ maxWidth: "600px", marginTop: "2rem" }} placeholder={`Main Content Of Email \n(eg: dMail is the first decentralized mailing product, which is absolutely free to use as of now!)`} resize={'none'} />
                        <br />
                        <Button onClick={e => props.sendMail(toAddress, subject, mainContent)} style={{ width: "30vw", marginTop: "2rem" }} colorScheme='blue'>Send Mail</Button>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default Dashboard