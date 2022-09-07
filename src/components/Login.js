import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

const RainbowButton = (props) => {
    const toast = useToast()
    return (
        <div>
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                }) => {

                    const ready = mounted !== 'loading';
                    const connected =
                        ready &&
                        account &&
                        chain

                    if (connected) {
                        props.setAccount(account.address)
                    }

                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {

                                if (connected) {
                                    props.setAccount(account.address)
                                }

                                if (!connected) {
                                    props.setAccount(null)
                                    return (
                                        <Button colorScheme='blue' onClick={() => {
                                            openConnectModal()
                                            toast({
                                                title: 'Connecting Wallet',
                                                status: 'info',
                                                duration: 3000,
                                                isClosable: true,
                                            })

                                        }} style={{ display: 'flex', gap: 12, position: "fixed", top: "2rem", right: "2rem" }} type="button">
                                            Connect Wallet
                                        </Button>
                                    );
                                }

                                if (chain.unsupported) {
                                    return (
                                        <Button colorScheme='blue' onClick={() => {
                                            openChainModal()
                                            toast({
                                                title: 'Please Switch To Mumbai Network',
                                                status: 'info',
                                                duration: 3000,
                                                isClosable: true,
                                            })
                                        }} style={{ display: 'flex', gap: 12, position: "fixed", top: "2rem", right: "2rem" }} type="button">
                                            Wrong network
                                        </Button>
                                    );
                                }

                                return (
                                    <div style={{ display: 'flex', gap: 12, position: "fixed", top: "2rem", right: "2rem" }} >
                                        <Button colorScheme='blue' onClick={() => { openAccountModal() }} type="button">
                                            {"Connected To: "}
                                            {account.displayName}
                                        </Button>
                                    </div>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    )
}

export default RainbowButton