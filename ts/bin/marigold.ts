import { Marigold } from '../'
import { ethers } from 'ethers'
import { Uu } from 'pollenium-uvaursi'
import { engine } from 'pollenium-xanthoceras'
import { SignedOrder } from 'pollenium-alchemilla'
import { Client as AnemoneClient, clientDefaults as anemoneClientDefaults } from 'pollenium-anemone'
import { Keypair } from 'pollenium-ilex'
import dotenv from 'dotenv-safe'

dotenv.config()

async function run() {

  const privateKey = Uu.fromHexish(process.env.PRIVATE_KEY_HEX)
  const address = new Keypair(privateKey).getAddress()

  console.log('===============================')
  console.log(`executor: ${address.uu.toHex()}`)
  console.log('===============================')



  const marigold = new Marigold({
    latency: 1,
    provider: new ethers.providers.InfuraProvider('homestead', '7c8a7e7164c247cd8ccb11a1525a6d9e'),
    privateKey,
    engine
  })

  const applicationId = Uu.fromUtf8('alchemilla.orders.v0').genPaddedLeft(32)
  const anemoneClient = new AnemoneClient({
    ...anemoneClientDefaults,
    signalingServerUrls: [
      'wss://begonia-us-1.herokuapp.com',
      'wss://begonia-eu-1.herokuapp.com'
    ],
    sdpTimeout: 20,
    connectionTimeout: 20
  })

  anemoneClient.missiveSnowdrop.addHandle((missive) => {
    if (!missive.applicationId.uu.getIsEqual(applicationId)) {
      return
    }
    const signedOrder = SignedOrder.fromLigma(missive.applicationData)
    marigold.handleSignedOrder(signedOrder)
  })

}

run()
