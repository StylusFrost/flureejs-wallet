[flureejs-wallet](../README.md) > [FlureeHDKey](../classes/flureehdkey.md)

# Class: FlureeHDKey

## Hierarchy

**FlureeHDKey**

## Index

### Constructors

- [constructor](flureehdkey.md#constructor)

### Properties

- [\_hdkey](flureehdkey.md#_hdkey)

### Methods

- [deriveChild](flureehdkey.md#derivechild)
- [derivePath](flureehdkey.md#derivepath)
- [getWallet](flureehdkey.md#getwallet)
- [privateExtendedKey](flureehdkey.md#privateextendedkey)
- [publicExtendedKey](flureehdkey.md#publicextendedkey)
- [fromExtendedKey](flureehdkey.md#fromextendedkey)
- [fromMasterSeed](flureehdkey.md#frommasterseed)

---

## Constructors

<a id="constructor"></a>

### constructor

⊕ **new FlureeHDKey**(\_hdkey: _`any`_): [FlureeHDKey](flureehdkey.md)

_Defined in [hdkey.ts:21](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/hdkey.ts#L21)_

**Parameters:**

| Name               | Type  |
| ------------------ | ----- |
| `Optional` \_hdkey | `any` |

**Returns:** [FlureeHDKey](flureehdkey.md)

---

## Properties

<a id="_hdkey"></a>

### ` <Private>``<Optional> ` \_hdkey

**● \_hdkey**: _`any`_

_Defined in [hdkey.ts:23](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/hdkey.ts#L23)_

---

## Methods

<a id="derivechild"></a>

### deriveChild

▸ **deriveChild**(index: _`number`_): [FlureeHDKey](flureehdkey.md)

_Defined in [hdkey.ts:52](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/hdkey.ts#L52)_

**Parameters:**

| Name  | Type     |
| ----- | -------- |
| index | `number` |

**Returns:** [FlureeHDKey](flureehdkey.md)

---

<a id="derivepath"></a>

### derivePath

▸ **derivePath**(path: _`string`_): [FlureeHDKey](flureehdkey.md)

_Defined in [hdkey.ts:45](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/hdkey.ts#L45)_

**Parameters:**

| Name | Type     |
| ---- | -------- |
| path | `string` |

**Returns:** [FlureeHDKey](flureehdkey.md)

---

<a id="getwallet"></a>

### getWallet

▸ **getWallet**(): [Wallet](wallet.md)

_Defined in [hdkey.ts:59](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/hdkey.ts#L59)_

**Returns:** [Wallet](wallet.md)

---

<a id="privateextendedkey"></a>

### privateExtendedKey

▸ **privateExtendedKey**(): `Buffer`

_Defined in [hdkey.ts:28](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/hdkey.ts#L28)_

**Returns:** `Buffer`

---

<a id="publicextendedkey"></a>

### publicExtendedKey

▸ **publicExtendedKey**(): `Buffer`

_Defined in [hdkey.ts:38](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/hdkey.ts#L38)_

**Returns:** `Buffer`

---

<a id="fromextendedkey"></a>

### `<Static>` fromExtendedKey

▸ **fromExtendedKey**(base58Key: _`string`_): [FlureeHDKey](flureehdkey.md)

_Defined in [hdkey.ts:19](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/hdkey.ts#L19)_

**Parameters:**

| Name      | Type     |
| --------- | -------- |
| base58Key | `string` |

**Returns:** [FlureeHDKey](flureehdkey.md)

---

<a id="frommasterseed"></a>

### `<Static>` fromMasterSeed

▸ **fromMasterSeed**(seedBuffer: _`Buffer`_): [FlureeHDKey](flureehdkey.md)

_Defined in [hdkey.ts:12](https://github.com/StylusFrost/flureejs-wallet/blob/1f6ae6d/src/hdkey.ts#L12)_

**Parameters:**

| Name       | Type     |
| ---------- | -------- |
| seedBuffer | `Buffer` |

**Returns:** [FlureeHDKey](flureehdkey.md)

---
