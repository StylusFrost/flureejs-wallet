/* tslint:disable no-invalid-this */
import * as assert from 'assert'
import Wallet from '../src'

const fixturePrivateKey = 'efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378'
const fixturePrivateKeyStr = '0x' + fixturePrivateKey
const fixturePrivateKeyBuffer = Buffer.from(fixturePrivateKey, 'hex')

const fixturePublicKey =
  '5d4392f450262b276652c1fc037606abac500f3160830ce9df53aa70d95ce7cfb8b06010b2f3691c78c65c21eb4cf3dfdbfc0745d89b664ee10435bb3a0f906c'
const fixturePublicKeyStr = '0x' + fixturePublicKey
const fixturePublicKeyBuffer = Buffer.from(fixturePublicKey, 'hex')

const fixtureAddress = Buffer.from('Texkmv6QtyCSgSLwb1TCjwwyeFzxrWkrvpi').toString('hex')
const fixtureAddressStr = '0x' + fixtureAddress
const fixtureAddressExtend = Buffer.from('TfGtWFR262hoct1mC5ZEkTXQmANHnJupKWw').toString('hex')
const fixtureAddressExtendStr = '0x' + fixtureAddressExtend

const fixtureWallet = Wallet.fromPrivateKey(fixturePrivateKeyBuffer)

describe('.getPrivateKey()', function() {
  it('should work', function() {
    assert.strictEqual(fixtureWallet.getPrivateKey().toString('hex'), fixturePrivateKey)
  })
  it('should fail', function() {
    assert.throws(function() {
      Wallet.fromPrivateKey(Buffer.from('001122', 'hex'))
    }, /^Error: Private key does not satisfy the curve requirements.*$/)
  })
})

describe('.getPrivateKeyString()', function() {
  it('should work', function() {
    assert.strictEqual(fixtureWallet.getPrivateKeyString(), fixturePrivateKeyStr)
  })
})

describe('.getPublicKey()', function() {
  it('should work', function() {
    assert.strictEqual(fixtureWallet.getPublicKey().toString('hex'), fixturePublicKey)
  })
})

describe('.getPublicKeyString()', function() {
  it('should work', function() {
    assert.strictEqual(fixtureWallet.getPublicKeyString(), fixturePublicKeyStr)
  })
})

describe('.getAddress()', function() {
  it('should work', function() {
    assert.strictEqual(fixtureWallet.getAddress().toString('hex'), fixtureAddress)
  })
})
describe('.getAddressString()', function() {
  it('should work', function() {
    assert.strictEqual(fixtureWallet.getAddressString(), fixtureAddressStr)
  })
})

describe('public key only wallet', function() {
  const pubKey = Buffer.from(fixturePublicKey, 'hex')
  it('.fromPublicKey() should work', function() {
    assert.strictEqual(
      Wallet.fromPublicKey(pubKey)
        .getPublicKey()
        .toString('hex'),
      fixturePublicKey,
    )
  })
  /*
  it('.fromPublicKey() should not accept compressed keys in strict mode', function() {
    assert.throws(function() {
      Wallet.fromPublicKey(
        Buffer.from('030639797f6cc72aea0f3d309730844a9e67d9f1866e55845c5f7e0ab48402973d', 'hex'),
      )
    }, /^Error: Invalid public key$/)
  })
  */
  it('.fromPublicKey() should accept compressed keys in non-strict mode', function() {
    const tmp = Buffer.from(
      '030639797f6cc72aea0f3d309730844a9e67d9f1866e55845c5f7e0ab48402973d',
      'hex',
    )
    assert.strictEqual(
      Wallet.fromPublicKey(tmp, true)
        .getPublicKey()
        .toString('hex'),
      '0639797f6cc72aea0f3d309730844a9e67d9f1866e55845c5f7e0ab48402973defa5cb69df462bcc6d73c31e1c663c225650e80ef14a507b203f2a12aea55bc1',
    )
  })
  it('.getAddress() should work', function() {
    assert.strictEqual(
      Wallet.fromPublicKey(pubKey)
        .getAddress()
        .toString('hex'),
      fixtureAddress,
    )
  })
  it('.getPrivateKey() should fail', function() {
    assert.throws(function() {
      Wallet.fromPublicKey(pubKey).getPrivateKey()
    }, /^Error: This is a public key only wallet$/)
  })
})

describe('.fromExtendedPrivateKey()', function() {
  it('should work', function() {
    const xprv =
      'xprv9s21ZrQH143K4KqQx9Zrf1eN8EaPQVFxM2Ast8mdHn7GKiDWzNEyNdduJhWXToy8MpkGcKjxeFWd8oBSvsz4PCYamxR7TX49pSpp3bmHVAY'
    assert.strictEqual(
      Wallet.fromExtendedPrivateKey(xprv).getAddressString(),
      fixtureAddressExtendStr,
    )
  })
  it('should fail', function() {
    const xpri = 'xprXToy8MpkGcKjxeFWd8oBSvsz4PCYamxR7TX49pSpp3bmHVAY'
    assert.throws(function() {
      Wallet.fromExtendedPrivateKey(xpri).getAddressString(), fixtureAddressExtendStr
    }, /^Error: Not an extended private key$/)
  }),
    it('should fail, short len', function() {
      const xpri = 'xprv1111'
      assert.throws(function() {
        Wallet.fromExtendedPrivateKey(xpri).getAddressString(), fixtureAddressExtendStr
      }, /^Error: Invalid checksum$/)
    })
})

describe('.fromExtendedPublicKey()', function() {
  it('should work', function() {
    const xpub =
      'xpub661MyMwAqRbcGout4B6s29b6gGQsowyoiF6UgXBEr7eFCWYfXuZDvRxP9zEh1Kwq3TLqDQMbkbaRpSnoC28oWvjLeshoQz1StZ9YHM1EpcJ'
    assert.strictEqual(
      Wallet.fromExtendedPublicKey(xpub).getAddressString(),
      fixtureAddressExtendStr,
    )
  }),
    it('should fail', function() {
      const xpub = 'xpjLeshoQz1StZ9YHM1EpcJ'
      assert.throws(function() {
        Wallet.fromExtendedPublicKey(xpub).getAddressString(), fixtureAddressExtendStr
      }, /^Error: Not an extended public key$/)
    })
})

describe('.generate()', function() {
  it('should generate an account', function() {
    assert.strictEqual(Wallet.generate().getPrivateKey().length, 32)
  })
})

describe('.generateVanityAddress()', function() {
  it('should generate an account with TfGv prefix (object)', function() {
    this.timeout(0) // never
    const wallet = Wallet.generateVanityAddress(/^TfGv/)
    assert.strictEqual(wallet.getPrivateKey().length, 32)
    assert.strictEqual(wallet.getAddress()[0], 84)
    assert.strictEqual(wallet.getAddress()[1], 102)
    assert.strictEqual(wallet.getAddress()[2], 71)
    assert.strictEqual(wallet.getAddress()[3], 118)
  })

  it('should generate an account with TfGv prefix (string)', function() {
    this.timeout(0) // never
    const wallet = Wallet.generateVanityAddress('^TfGv')
    assert.strictEqual(wallet.getPrivateKey().length, 32)
    assert.strictEqual(wallet.getAddress()[0], 84)
    assert.strictEqual(wallet.getAddress()[1], 102)
    assert.strictEqual(wallet.getAddress()[2], 71)
    assert.strictEqual(wallet.getAddress()[3], 118)
  })
})

describe('raw new Wallet() init', function() {
  it('should fail when both priv and pub key provided', function() {
    assert.throws(function() {
      new Wallet(fixturePrivateKeyBuffer, fixturePublicKeyBuffer)
    }, /^Error: Cannot supply both a private and a public key to the constructor$/)
  })
})

describe('Invalid Public Key', function() {
  it('should fail when invalid pub key provided', function() {
    assert.throws(function() {
      new Wallet(undefined, Buffer.from('XXXXXX'))
    }, /^Error: Invalid public key$/)
  })
})
