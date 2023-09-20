import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { useWeb3Modal } from '@web3modal/react'
import { ethers } from 'ethers'

const chains = [arbitrum, mainnet, polygon]
const projectId = '066dcd9572366422f84f242f114b5028'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const provider = new ethers.providers.Web3Provider(window.ethereum)

const message = 'Hello world'


function Homepage() {
    const { open, close} = useWeb3Modal()

    const connectWallet = async () => {
        await open()

        //getting address
        const signer = provider.getSigner()
        const address = await signer.getAddress()

        //verification
        const signature = await signer.signMessage(message)
        const recoveredAddress = ethers.utils.verifyMessage(message, signature)

        if (address === recoveredAddress) {
          console.log('Signer verified')
          console.log(signature)
        }
        else{
          throw new Error('Failed to verify signer')
        }

        console.log(address)
    }

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <button className="border m-8 p-3 bg-red-800 text-white" onClick={connectWallet}> Connect wallet </button> 

      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default Homepage;