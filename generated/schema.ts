// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Deposit extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Deposit entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Deposit must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Deposit", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Deposit | null {
    return changetype<Deposit | null>(store.get("Deposit", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get _asset(): Bytes {
    let value = this.get("_asset");
    return value!.toBytes();
  }

  set _asset(value: Bytes) {
    this.set("_asset", Value.fromBytes(value));
  }

  get _account(): Bytes {
    let value = this.get("_account");
    return value!.toBytes();
  }

  set _account(value: Bytes) {
    this.set("_account", Value.fromBytes(value));
  }

  get _amount(): BigInt {
    let value = this.get("_amount");
    return value!.toBigInt();
  }

  set _amount(value: BigInt) {
    this.set("_amount", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class Deposit1 extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Deposit1 entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Deposit1 must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Deposit1", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Deposit1 | null {
    return changetype<Deposit1 | null>(store.get("Deposit1", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get caller(): Bytes {
    let value = this.get("caller");
    return value!.toBytes();
  }

  set caller(value: Bytes) {
    this.set("caller", Value.fromBytes(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get assets(): BigInt {
    let value = this.get("assets");
    return value!.toBigInt();
  }

  set assets(value: BigInt) {
    this.set("assets", Value.fromBigInt(value));
  }

  get shares(): BigInt {
    let value = this.get("shares");
    return value!.toBigInt();
  }

  set shares(value: BigInt) {
    this.set("shares", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class Transfer extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transfer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Transfer must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Transfer", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Transfer | null {
    return changetype<Transfer | null>(store.get("Transfer", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value!.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value!.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class Withdraw extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Withdraw entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Withdraw must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Withdraw", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Withdraw | null {
    return changetype<Withdraw | null>(store.get("Withdraw", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get caller(): Bytes {
    let value = this.get("caller");
    return value!.toBytes();
  }

  set caller(value: Bytes) {
    this.set("caller", Value.fromBytes(value));
  }

  get receiver(): Bytes {
    let value = this.get("receiver");
    return value!.toBytes();
  }

  set receiver(value: Bytes) {
    this.set("receiver", Value.fromBytes(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get assets(): BigInt {
    let value = this.get("assets");
    return value!.toBigInt();
  }

  set assets(value: BigInt) {
    this.set("assets", Value.fromBigInt(value));
  }

  get shares(): BigInt {
    let value = this.get("shares");
    return value!.toBigInt();
  }

  set shares(value: BigInt) {
    this.set("shares", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class VaultPricePerShare extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save VaultPricePerShare entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type VaultPricePerShare must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("VaultPricePerShare", id.toString(), this);
    }
  }

  static load(id: string): VaultPricePerShare | null {
    return changetype<VaultPricePerShare | null>(
      store.get("VaultPricePerShare", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get event(): string {
    let value = this.get("event");
    return value!.toString();
  }

  set event(value: string) {
    this.set("event", Value.fromString(value));
  }

  get txHash(): string {
    let value = this.get("txHash");
    return value!.toString();
  }

  set txHash(value: string) {
    this.set("txHash", Value.fromString(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value!.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get pricePerShare(): BigInt {
    let value = this.get("pricePerShare");
    return value!.toBigInt();
  }

  set pricePerShare(value: BigInt) {
    this.set("pricePerShare", Value.fromBigInt(value));
  }
}

export class VaultTVL extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save VaultTVL entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type VaultTVL must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("VaultTVL", id.toString(), this);
    }
  }

  static load(id: string): VaultTVL | null {
    return changetype<VaultTVL | null>(store.get("VaultTVL", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get event(): string {
    let value = this.get("event");
    return value!.toString();
  }

  set event(value: string) {
    this.set("event", Value.fromString(value));
  }

  get txHash(): string {
    let value = this.get("txHash");
    return value!.toString();
  }

  set txHash(value: string) {
    this.set("txHash", Value.fromString(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value!.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get tvl(): BigInt {
    let value = this.get("tvl");
    return value!.toBigInt();
  }

  set tvl(value: BigInt) {
    this.set("tvl", Value.fromBigInt(value));
  }
}

export class VaultTotalSupply extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save VaultTotalSupply entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type VaultTotalSupply must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("VaultTotalSupply", id.toString(), this);
    }
  }

  static load(id: string): VaultTotalSupply | null {
    return changetype<VaultTotalSupply | null>(
      store.get("VaultTotalSupply", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get event(): string {
    let value = this.get("event");
    return value!.toString();
  }

  set event(value: string) {
    this.set("event", Value.fromString(value));
  }

  get txHash(): string {
    let value = this.get("txHash");
    return value!.toString();
  }

  set txHash(value: string) {
    this.set("txHash", Value.fromString(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value!.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value!.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }
}

export class WithdrawComplete extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save WithdrawComplete entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type WithdrawComplete must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("WithdrawComplete", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): WithdrawComplete | null {
    return changetype<WithdrawComplete | null>(
      store.get("WithdrawComplete", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get _asset(): Bytes {
    let value = this.get("_asset");
    return value!.toBytes();
  }

  set _asset(value: Bytes) {
    this.set("_asset", Value.fromBytes(value));
  }

  get _account(): Bytes {
    let value = this.get("_account");
    return value!.toBytes();
  }

  set _account(value: Bytes) {
    this.set("_account", Value.fromBytes(value));
  }

  get _amount(): BigInt {
    let value = this.get("_amount");
    return value!.toBigInt();
  }

  set _amount(value: BigInt) {
    this.set("_amount", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class WithdrawInitiated extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save WithdrawInitiated entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type WithdrawInitiated must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("WithdrawInitiated", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): WithdrawInitiated | null {
    return changetype<WithdrawInitiated | null>(
      store.get("WithdrawInitiated", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get _asset(): Bytes {
    let value = this.get("_asset");
    return value!.toBytes();
  }

  set _asset(value: Bytes) {
    this.set("_asset", Value.fromBytes(value));
  }

  get _account(): Bytes {
    let value = this.get("_account");
    return value!.toBytes();
  }

  set _account(value: Bytes) {
    this.set("_account", Value.fromBytes(value));
  }

  get _amount(): BigInt {
    let value = this.get("_amount");
    return value!.toBigInt();
  }

  set _amount(value: BigInt) {
    this.set("_amount", Value.fromBigInt(value));
  }

  get _duration(): BigInt {
    let value = this.get("_duration");
    return value!.toBigInt();
  }

  set _duration(value: BigInt) {
    this.set("_duration", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class UserBoostedBalanceEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save UserBoostedBalanceEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UserBoostedBalanceEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("UserBoostedBalanceEvent", id.toString(), this);
    }
  }

  static load(id: string): UserBoostedBalanceEvent | null {
    return changetype<UserBoostedBalanceEvent | null>(
      store.get("UserBoostedBalanceEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get txHash(): string {
    let value = this.get("txHash");
    return value!.toString();
  }

  set txHash(value: string) {
    this.set("txHash", Value.fromString(value));
  }

  get event(): string {
    let value = this.get("event");
    return value!.toString();
  }

  set event(value: string) {
    this.set("event", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get from(): string {
    let value = this.get("from");
    return value!.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value!.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }
}

export class UserBoostedVaultBalanceTotal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save UserBoostedVaultBalanceTotal entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UserBoostedVaultBalanceTotal must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("UserBoostedVaultBalanceTotal", id.toString(), this);
    }
  }

  static load(id: string): UserBoostedVaultBalanceTotal | null {
    return changetype<UserBoostedVaultBalanceTotal | null>(
      store.get("UserBoostedVaultBalanceTotal", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get usdc(): BigInt {
    let value = this.get("usdc");
    return value!.toBigInt();
  }

  set usdc(value: BigInt) {
    this.set("usdc", Value.fromBigInt(value));
  }

  get weth(): BigInt {
    let value = this.get("weth");
    return value!.toBigInt();
  }

  set weth(value: BigInt) {
    this.set("weth", Value.fromBigInt(value));
  }

  get wbtc(): BigInt {
    let value = this.get("wbtc");
    return value!.toBigInt();
  }

  set wbtc(value: BigInt) {
    this.set("wbtc", Value.fromBigInt(value));
  }

  get link(): BigInt {
    let value = this.get("link");
    return value!.toBigInt();
  }

  set link(value: BigInt) {
    this.set("link", Value.fromBigInt(value));
  }

  get uni(): BigInt {
    let value = this.get("uni");
    return value!.toBigInt();
  }

  set uni(value: BigInt) {
    this.set("uni", Value.fromBigInt(value));
  }
}

export class UserBoostedVaultBalance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save UserBoostedVaultBalance entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UserBoostedVaultBalance must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("UserBoostedVaultBalance", id.toString(), this);
    }
  }

  static load(id: string): UserBoostedVaultBalance | null {
    return changetype<UserBoostedVaultBalance | null>(
      store.get("UserBoostedVaultBalance", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get txHash(): string {
    let value = this.get("txHash");
    return value!.toString();
  }

  set txHash(value: string) {
    this.set("txHash", Value.fromString(value));
  }

  get event(): string {
    let value = this.get("event");
    return value!.toString();
  }

  set event(value: string) {
    this.set("event", Value.fromString(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value!.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }
}
