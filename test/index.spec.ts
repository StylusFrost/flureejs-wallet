/* tslint:disable no-invalid-this */
import * as assert from 'assert'
import Wallet from '../src'

const fixturePrivateKey = 'fe0af041abb1c734f8ab18d5c35385ef1f1c54a7d91fd2a5f9fdd03fcf077600'
const fixturePrivateKeyStr = '0x' + fixturePrivateKey
const fixturePrivateKeyBuffer = Buffer.from(fixturePrivateKey, 'hex')

const fixturePublicKey =
  '8a271161197e408c9b64a684fcbd6c2b05c08dfcb2a8d3ef444671a128511b6379eba36c622cab9254f5221874a6d8629c83dc4f4720d31e763ab8e109dcbe2b'
const fixturePublicKeyStr = '0x' + fixturePublicKey
const fixturePublicKeyBuffer = Buffer.from(fixturePublicKey, 'hex')

const fixtureAuthID = 'Tf8ovHdgnDZXrMzqELpa1xs1cfdhJie3Pwa'
const fixtureAuthIDBuffer = Buffer.from(fixtureAuthID)
const fixtureAuthIDStr = '0x' + Buffer.from(fixtureAuthID).toString('hex')
const fixtureAuthIDExtend = 'TfHvTN7gkPsirF1EEghJJK9FeNwAtAXNoeK'
const fixtureAuthIDExtendStr = '0x' + Buffer.from(fixtureAuthIDExtend).toString('hex')

const fixtureWallet = Wallet.fromPrivateKey(fixturePrivateKeyBuffer)

describe('.getPrivateKey()', function() {
  it('should work', function() {
    assert.strictEqual(fixtureWallet.getPrivateKey().toString('hex'), fixturePrivateKey)
  })
  it('should fail', function() {
    assert.throws(function() {
      Wallet.fromPrivateKey(Buffer.from('001122', 'hex'))
    }, /^Error: Expected private key to be an Uint8Array with length 32$/)
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

describe('.getAuthID()', function() {
  it('should work', function() {
    assert.strictEqual(
      fixtureWallet.getAuthID().toString('hex'),
      fixtureAuthIDBuffer.toString('hex'),
    )
  })
})
describe('.getAuthIDString()', function() {
  it('should work', function() {
    assert.strictEqual(fixtureWallet.getAuthIDString(), fixtureAuthIDStr)
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

  it('.fromPublicKey() should not accept compressed keys in strict mode', function() {
    assert.throws(function() {
      Wallet.fromPublicKey(
        Buffer.from('030639797f6cc72aea0f3d309730844a9e67d9f1866e55845c5f7e0ab48402973d', 'hex'),
      )
    }, /^Error: Invalid public key$/)
  })

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
  it('.getAuthID() should work', function() {
    assert.strictEqual(
      Wallet.fromPublicKey(pubKey)
        .getAuthID()
        .toString('hex'),
      fixtureAuthIDBuffer.toString('hex'),
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
      Wallet.fromExtendedPrivateKey(xprv).getAuthIDString(),
      fixtureAuthIDExtendStr,
    )
  })
  it('should fail', function() {
    const xpri = 'xprXToy8MpkGcKjxeFWd8oBSvsz4PCYamxR7TX49pSpp3bmHVAY'
    assert.throws(function() {
      Wallet.fromExtendedPrivateKey(xpri).getAuthIDString(), fixtureAuthIDExtendStr
    }, /^Error: Not an extended private key$/)
  }),
    it('should fail, short len', function() {
      const xpri = 'xprv1111'
      assert.throws(function() {
        Wallet.fromExtendedPrivateKey(xpri).getAuthIDString(), fixtureAuthIDExtendStr
      }, /^Error: Invalid checksum$/)
    })
})

describe('.fromExtendedPublicKey()', function() {
  it('should work', function() {
    const xpub =
      'xpub661MyMwAqRbcGout4B6s29b6gGQsowyoiF6UgXBEr7eFCWYfXuZDvRxP9zEh1Kwq3TLqDQMbkbaRpSnoC28oWvjLeshoQz1StZ9YHM1EpcJ'
    assert.strictEqual(Wallet.fromExtendedPublicKey(xpub).getAuthIDString(), fixtureAuthIDExtendStr)
  }),
    it('should fail', function() {
      const xpub = 'xpjLeshoQz1StZ9YHM1EpcJ'
      assert.throws(function() {
        Wallet.fromExtendedPublicKey(xpub).getAuthIDString(), fixtureAuthIDExtendStr
      }, /^Error: Not an extended public key$/)
    })
})

describe('.generate()', function() {
  it('should generate an account', function() {
    assert.strictEqual(Wallet.generate().getPrivateKey().length, 32)
  })
})

describe('.generateVanityAuthID()', function() {
  it('should generate an account with TfGv prefix (object)', function() {
    this.timeout(0) // never
    const wallet = Wallet.generateVanityAuthID(/^TfGv/)
    assert.strictEqual(wallet.getPrivateKey().length, 32)
    assert.strictEqual(wallet.getAuthID()[0], 84)
    assert.strictEqual(wallet.getAuthID()[1], 102)
    assert.strictEqual(wallet.getAuthID()[2], 71)
    assert.strictEqual(wallet.getAuthID()[3], 118)
  })

  it('should generate an account with TfGv prefix (string)', function() {
    this.timeout(0) // never
    const wallet = Wallet.generateVanityAuthID('^TfGv')
    assert.strictEqual(wallet.getPrivateKey().length, 32)
    assert.strictEqual(wallet.getAuthID()[0], 84)
    assert.strictEqual(wallet.getAuthID()[1], 102)
    assert.strictEqual(wallet.getAuthID()[2], 71)
    assert.strictEqual(wallet.getAuthID()[3], 118)
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
