import * as crypto from 'crypto'
import { privateKeyVerify, publicKeyVerify, publicKeyConvert, publicKeyCreate } from 'secp256k1'

export { default as hdkey } from './hdkey'
const bs58check = require('bs58check')
const randomBytes = require('randombytes')

// wallet implementation

export default class Wallet {
  constructor(
    private readonly privateKey?: Buffer | undefined,
    private publicKey: Buffer | undefined = undefined,
  ) {
    if (privateKey && publicKey) {
      throw new Error('Cannot supply both a private and a public key to the constructor')
    }

    if (privateKey) {
      try {
        !isValidPrivate(privateKey)
      } catch {
        throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid)')
      }
    }

    if (publicKey) {
      try {
        !isValidPublic(publicKey)
      } catch {
        throw new Error('Invalid public key')
      }
    }
  }

  // static methods
  /**
   * Create an instance based on a new random key.
   */

  public static generate(): Wallet {
    return new Wallet(randomBytes(32))
  }

  /**
   * Create an instance where the address is valid against the supplied pattern (**this will be very slow**)
   */

  public static generateVanityAddress(pattern: RegExp | string): Wallet {
    if (!(pattern instanceof RegExp)) {
      pattern = new RegExp(pattern)
    }
    while (true) {
      const privateKey = randomBytes(32) as Buffer
      const address = privateToAddress(privateKey)
      if (pattern.test(address)) {
        return new Wallet(privateKey)
      }
    }
  }

  /**
   * Create an instance based on a public key (certain methods will not be available)
   *
   * This method only accepts uncompressed public keys, unless
   * the `nonStrict` flag is set to true.
   */
  public static fromPublicKey(publicKey: Buffer, nonStrict: boolean = false): Wallet {
    if (nonStrict) {
      publicKey = importPublic(publicKey)
    }
    return new Wallet(undefined, publicKey)
  }

  /**
   * Create an instance based on a BIP32 extended public key (xpub)
   */
  public static fromExtendedPublicKey(extendedPublicKey: string): Wallet {
    if (extendedPublicKey.slice(0, 4) !== 'xpub') {
      throw new Error('Not an extended public key')
    }
    const publicKey: Buffer = bs58check.decode(extendedPublicKey).slice(45)
    // Convert to an Ethereum public key
    return Wallet.fromPublicKey(publicKey, true)
  }

  /**
   * Create an instance based on a raw private key
   */
  public static fromPrivateKey(privateKey: Buffer): Wallet {
    return new Wallet(privateKey)
  }

  /**
   * Create an instance based on a BIP32 extended private key (xprv)
   */
  public static fromExtendedPrivateKey(extendedPrivateKey: string): Wallet {
    if (extendedPrivateKey.slice(0, 4) !== 'xprv') {
      throw new Error('Not an extended private key')
    }
    const tmp: Buffer = bs58check.decode(extendedPrivateKey)
    if (tmp[45] !== 0) {
      throw new Error('Invalid extended private key')
    }
    return Wallet.fromPrivateKey(tmp.slice(46))
  }

  // private getters

  /**
   * Returns the wallet's public key.
   */
  private get pubKey(): Buffer {
    if (!keyExists(this.publicKey)) {
      this.publicKey = privateToPublic(this.privateKey as Buffer)
    }
    return this.publicKey
  }

  /**
   * Returns the wallet's private key.
   */
  private get privKey(): Buffer {
    if (!keyExists(this.privateKey)) {
      throw new Error('This is a public key only wallet')
    }
    return this.privateKey
  }

  // public instance methods

  /**
   * Returns the wallet's private key.
   *
   */
  // tslint:disable-next-line
  public getPrivateKey(): Buffer {
    return this.privKey
  }
  public getPrivateKeyString(): string {
    return bufferToHex(this.privKey)
  }

  /**
   * Returns the wallet's public key.
   */
  // tslint:disable-next-line
  public getPublicKey(): Buffer {
    return this.pubKey
  }

  /**
   * Returns the wallet's public key as a "0x" prefixed hex string
   */
  public getPublicKeyString(): string {
    return bufferToHex(this.getPublicKey())
  }

  /**
   * Returns the wallet's address.
   */
  public getAddress(): Buffer {
    return publicToAddress(this.pubKey)
  }

  /**
   * Returns the wallet's address as string
   */
  public getAddressString(): string {
    return bufferToHex(this.getAddress())
  }
}

// helpers

function keyExists(k: Buffer | undefined | null): k is Buffer {
  return k !== undefined && k !== null
}

function isValidPrivate(privateKey: Buffer): boolean {
  return privateKeyVerify(privateKey)
}

function isValidPublic(publicKey: Buffer): boolean {
  if (publicKey.length === 64) {
    // Convert to SEC1 for secp256k1
    return publicKeyVerify(Buffer.concat([Buffer.from([4]), publicKey]))
  }
  return publicKeyVerify(publicKey)
}

function bufferToHex(buf: Buffer): string {
  return '0x' + buf.toString('hex')
}

function hexToUnit8Array(str: string) {
  return new Uint8Array(Buffer.from(str, 'hex'))
}

function importPublic(publicKey: Buffer): Buffer {
  if (publicKey.length !== 64) {
    publicKey = Buffer.from(publicKeyConvert(publicKey, false).slice(1))
  }
  return publicKey
}

function privateToPublic(privateKey: Buffer): Buffer {
  // skip the type flag and use the X, Y points
  return Buffer.from(publicKeyCreate(privateKey, false)).slice(1)
}

function publicToAddress(publicKey: Buffer): Buffer {
  const hashSHA = crypto
    .createHash('sha256')
    .update(hexToUnit8Array(publicKey.toString('hex')))
    .digest()
  const hashRIPE = crypto
    .createHash('ripemd160')
    .update(hashSHA)
    .digest('hex')

  const pubPrefixed = '0f' + '02' + hashRIPE

  const account_id = bs58check.encode(hexToUnit8Array(pubPrefixed))

  return Buffer.from(account_id)
}

function privateToAddress(privateKey: Buffer): string {
  const publicKey = privateToPublic(privateKey)
  return publicToAddress(publicKey).toString()
}
