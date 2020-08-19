import {
  isValidPrivate,
  isValidPublic,
  privateToAuthID,
  publicToAuthID,
  importPublic,
  privateToPublic,
} from 'flureejs-utils'

import { bufferToHex } from 'flureejs-utils'

import { BS58check } from 'flureejs-utils'

export { default as hdkey } from './hdkey'
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

    if (privateKey && !isValidPrivate(privateKey)) {
      throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid)')
    }

    if (publicKey && !isValidPublic(publicKey)) {
      throw new Error('Invalid public key')
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
   * Create an instance where the authID is valid against the supplied pattern (**this will be very slow**)
   */

  public static generateVanityAuthID(pattern: RegExp | string): Wallet {
    if (!(pattern instanceof RegExp)) {
      pattern = new RegExp(pattern)
    }
    while (true) {
      const privateKey = randomBytes(32) as Buffer
      const authID = privateToAuthID(privateKey).toString()
      if (pattern.test(authID)) {
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
    const publicKey: Buffer = BS58check.decode(extendedPublicKey).slice(45)
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
    const tmp: Buffer = BS58check.decode(extendedPrivateKey)
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
   * Returns the wallet's authID.
   */
  public getAuthID(): Buffer {
    return publicToAuthID(this.pubKey)
  }

  /**
   * Returns the wallet's authID as string
   */
  public getAuthIDString(): string {
    return bufferToHex(this.getAuthID())
  }
}

// helpers

function keyExists(k: Buffer | undefined | null): k is Buffer {
  return k !== undefined && k !== null
}
