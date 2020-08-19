[flureejs-wallet](../README.md) > [Wallet](../classes/wallet.md)

# Class: Wallet

## Hierarchy

**Wallet**

## Index

### Constructors

- [constructor](wallet.md#constructor)

### Properties

- [privateKey](wallet.md#privatekey)
- [publicKey](wallet.md#publickey)

### Accessors

- [privKey](wallet.md#privkey)
- [pubKey](wallet.md#pubkey)

### Methods

- [getAuthID](wallet.md#getauthid)
- [getAuthIDString](wallet.md#getauthidstring)
- [getPrivateKey](wallet.md#getprivatekey)
- [getPrivateKeyString](wallet.md#getprivatekeystring)
- [getPublicKey](wallet.md#getpublickey)
- [getPublicKeyString](wallet.md#getpublickeystring)
- [fromExtendedPrivateKey](wallet.md#fromextendedprivatekey)
- [fromExtendedPublicKey](wallet.md#fromextendedpublickey)
- [fromPrivateKey](wallet.md#fromprivatekey)
- [fromPublicKey](wallet.md#frompublickey)
- [generate](wallet.md#generate)
- [generateVanityAuthID](wallet.md#generatevanityauthid)

---

## Constructors

<a id="constructor"></a>

### constructor

⊕ **new Wallet**(privateKey: _`Buffer` \| `undefined`_, publicKey?: _`Buffer` \| `undefined`_): [Wallet](wallet.md)

_Defined in [index.ts:19](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L19)_

**Parameters:**

| Name                      | Type                    | Default value |
| ------------------------- | ----------------------- | ------------- |
| `Optional` privateKey     | `Buffer` \| `undefined` | -             |
| `Default value` publicKey | `Buffer` \| `undefined` | undefined     |

**Returns:** [Wallet](wallet.md)

---

## Properties

<a id="privatekey"></a>

### ` <Private>``<Optional> ` privateKey

**● privateKey**: _`Buffer` \| `undefined`_

_Defined in [index.ts:21](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L21)_

---

<a id="publickey"></a>

### `<Private>` publicKey

**● publicKey**: _`Buffer` \| `undefined`_

_Defined in [index.ts:22](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L22)_

---

## Accessors

<a id="privkey"></a>

### `<Private>` privKey

**privKey**:

_Defined in [index.ts:124](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L124)_

---

<a id="pubkey"></a>

### `<Private>` pubKey

**pubKey**:

_Defined in [index.ts:114](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L114)_

---

## Methods

<a id="getauthid"></a>

### getAuthID

▸ **getAuthID**(): `Buffer`

_Defined in [index.ts:163](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L163)_

**Returns:** `Buffer`

---

<a id="getauthidstring"></a>

### getAuthIDString

▸ **getAuthIDString**(): `string`

_Defined in [index.ts:170](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L170)_

**Returns:** `string`

---

<a id="getprivatekey"></a>

### getPrivateKey

▸ **getPrivateKey**(): `Buffer`

_Defined in [index.ts:138](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L138)_

**Returns:** `Buffer`

---

<a id="getprivatekeystring"></a>

### getPrivateKeyString

▸ **getPrivateKeyString**(): `string`

_Defined in [index.ts:141](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L141)_

**Returns:** `string`

---

<a id="getpublickey"></a>

### getPublicKey

▸ **getPublicKey**(): `Buffer`

_Defined in [index.ts:149](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L149)_

**Returns:** `Buffer`

---

<a id="getpublickeystring"></a>

### getPublicKeyString

▸ **getPublicKeyString**(): `string`

_Defined in [index.ts:156](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L156)_

**Returns:** `string`

---

<a id="fromextendedprivatekey"></a>

### `<Static>` fromExtendedPrivateKey

▸ **fromExtendedPrivateKey**(extendedPrivateKey: _`string`_): [Wallet](wallet.md)

_Defined in [index.ts:98](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L98)_

**Parameters:**

| Name               | Type     |
| ------------------ | -------- |
| extendedPrivateKey | `string` |

**Returns:** [Wallet](wallet.md)

---

<a id="fromextendedpublickey"></a>

### `<Static>` fromExtendedPublicKey

▸ **fromExtendedPublicKey**(extendedPublicKey: _`string`_): [Wallet](wallet.md)

_Defined in [index.ts:79](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L79)_

**Parameters:**

| Name              | Type     |
| ----------------- | -------- |
| extendedPublicKey | `string` |

**Returns:** [Wallet](wallet.md)

---

<a id="fromprivatekey"></a>

### `<Static>` fromPrivateKey

▸ **fromPrivateKey**(privateKey: _`Buffer`_): [Wallet](wallet.md)

_Defined in [index.ts:91](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L91)_

**Parameters:**

| Name       | Type     |
| ---------- | -------- |
| privateKey | `Buffer` |

**Returns:** [Wallet](wallet.md)

---

<a id="frompublickey"></a>

### `<Static>` fromPublicKey

▸ **fromPublicKey**(publicKey: _`Buffer`_, nonStrict?: _`boolean`_): [Wallet](wallet.md)

_Defined in [index.ts:69](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L69)_

**Parameters:**

| Name                      | Type      | Default value |
| ------------------------- | --------- | ------------- |
| publicKey                 | `Buffer`  | -             |
| `Default value` nonStrict | `boolean` | false         |

**Returns:** [Wallet](wallet.md)

---

<a id="generate"></a>

### `<Static>` generate

▸ **generate**(): [Wallet](wallet.md)

_Defined in [index.ts:42](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L42)_

**Returns:** [Wallet](wallet.md)

---

<a id="generatevanityauthid"></a>

### `<Static>` generateVanityAuthID

▸ **generateVanityAuthID**(pattern: _`RegExp` \| `string`_): [Wallet](wallet.md)

_Defined in [index.ts:50](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/index.ts#L50)_

**Parameters:**

| Name    | Type                 |
| ------- | -------------------- |
| pattern | `RegExp` \| `string` |

**Returns:** [Wallet](wallet.md)

---
