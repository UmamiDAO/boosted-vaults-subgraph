import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  BoostedGlpVault,
  Deposit as DepositEvent,
  Deposit1 as Deposit1Event,
  Transfer as TransferEvent,
  Withdraw as WithdrawEvent,
  WithdrawComplete as WithdrawCompleteEvent,
  WithdrawInitiated as WithdrawInitiatedEvent,
} from "../generated/BoostedGlpWethVault/BoostedGlpVault";
import {
  UserBoostedVaultBalanceTotal,
  VaultPricePerShare,
  VaultTVL,
  VaultTotalSupply,
  Transfer,
  WithdrawComplete,
  WithdrawInitiated,
  UserBoostedVaultBalance,
  UserBoostedBalanceEvent,
} from "../generated/schema";
import {
  BOOSTED_USDC_VAULT_ADDRESS,
  BOOSTED_WETH_VAULT_ADDRESS,
  BOOSTED_WBTC_VAULT_ADDRESS,
  BOOSTED_LINK_VAULT_ADDRESS,
  BOOSTED_UNI_VAULT_ADDRESS,
  ZERO_ADDRESS,
} from "./constants";

function getVaultTotalSupplyEntity(
  blockNumber: BigInt,
  timestamp: BigInt,
  vault: Address,
  event: string
): VaultTotalSupply {
  const vaultEntityId = `${blockNumber}:${timestamp}:${vault.toHexString()}`;
  const vaultPps = new VaultTotalSupply(vaultEntityId);

  vaultPps.block = blockNumber;
  vaultPps.timestamp = timestamp;
  vaultPps.vault = vault.toHexString();
  vaultPps.txHash = "";
  vaultPps.event = event;

  return vaultPps as VaultTotalSupply;
}

function getBoostedVaultPpsEntity(
  blockNumber: BigInt,
  timestamp: BigInt,
  vault: Address,
  event: string
): VaultPricePerShare {
  const vaultEntityId = `${blockNumber}:${timestamp}:${vault.toHexString()}`;
  const vaultPps = new VaultPricePerShare(vaultEntityId);

  vaultPps.block = blockNumber;
  vaultPps.timestamp = timestamp;
  vaultPps.vault = vault.toHexString();
  vaultPps.txHash = "";
  vaultPps.event = event;

  return vaultPps as VaultPricePerShare;
}

function getVaultTVLEntity(
  blockNumber: BigInt,
  timestamp: BigInt,
  vault: Address,
  event: string
): VaultTVL {
  const vaultEntityId = `${blockNumber}:${timestamp}:${vault.toHexString()}`;
  const vaultTvl = new VaultTVL(vaultEntityId);

  vaultTvl.block = blockNumber;
  vaultTvl.timestamp = timestamp;
  vaultTvl.vault = vault.toHexString();
  vaultTvl.txHash = "";
  vaultTvl.event = event;

  return vaultTvl as VaultTVL;
}

export function handleDeposit(event: DepositEvent): void {
  const eventName = "deposit";
  const usdcVault = BoostedGlpVault.bind(BOOSTED_USDC_VAULT_ADDRESS);
  const wethVault = BoostedGlpVault.bind(BOOSTED_WETH_VAULT_ADDRESS);
  const wbtcVault = BoostedGlpVault.bind(BOOSTED_WBTC_VAULT_ADDRESS);
  const linkVault = BoostedGlpVault.bind(BOOSTED_LINK_VAULT_ADDRESS);
  const uniVault = BoostedGlpVault.bind(BOOSTED_UNI_VAULT_ADDRESS);

  const pricePerShareUSDC = usdcVault.pps();
  const pricePerShareWETH = wethVault.pps();
  const pricePerShareWBTC = wbtcVault.pps();
  const pricePerShareLINK = linkVault.pps();
  const pricePerShareUNI = uniVault.pps();
  const tvlUSDC = usdcVault.totalAssets();
  const tvlWETH = wethVault.totalAssets();
  const tvlWBTC = wbtcVault.totalAssets();
  const tvlLINK = linkVault.totalAssets();
  const tvlUNI = uniVault.totalAssets();
  const supplyUSDC = usdcVault.totalSupply();
  const supplyWETH = wethVault.totalSupply();
  const supplyWBTC = wbtcVault.totalSupply();
  const supplyLINK = linkVault.totalSupply();
  const supplyUNI = uniVault.totalSupply();

  const userBalanceEvent = new UserBoostedBalanceEvent(
    `weth:deposit:${event.transaction.hash.toHex()}`
  );
  const invRatio = BigInt.fromString("1").div(pricePerShareWETH);
  userBalanceEvent.block = event.block.number;
  userBalanceEvent.timestamp = event.block.timestamp;
  userBalanceEvent.txHash = event.transaction.hash.toHexString();
  userBalanceEvent.event = eventName;
  userBalanceEvent.token = BOOSTED_WETH_VAULT_ADDRESS.toHexString();
  userBalanceEvent.user = event.params._account.toHexString();
  userBalanceEvent.assets = event.params._amount;
  userBalanceEvent.shares = event.params._amount.times(invRatio);
  userBalanceEvent.from = event.params._account.toHexString();
  userBalanceEvent.to = BOOSTED_WETH_VAULT_ADDRESS.toHexString();
  userBalanceEvent.save();

  const usdcPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_USDC_VAULT_ADDRESS,
    eventName
  );
  usdcPpsEntity.pricePerShare = pricePerShareUSDC;
  usdcPpsEntity.save();

  const wethPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WETH_VAULT_ADDRESS,
    eventName
  );
  wethPpsEntity.pricePerShare = pricePerShareWETH;
  wethPpsEntity.save();

  const wbtcPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WBTC_VAULT_ADDRESS,
    eventName
  );
  wbtcPpsEntity.pricePerShare = pricePerShareWBTC;
  wbtcPpsEntity.save();

  const linkPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_LINK_VAULT_ADDRESS,
    eventName
  );
  linkPpsEntity.pricePerShare = pricePerShareLINK;
  linkPpsEntity.save();

  const uniPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_UNI_VAULT_ADDRESS,
    eventName
  );
  uniPpsEntity.pricePerShare = pricePerShareUNI;
  uniPpsEntity.save();

  const usdcTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_USDC_VAULT_ADDRESS,
    eventName
  );
  usdcTvlEntity.tvl = tvlUSDC;
  usdcTvlEntity.save();

  const wethTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WETH_VAULT_ADDRESS,
    eventName
  );
  wethTvlEntity.tvl = tvlWETH;
  wethTvlEntity.save();

  const wbtcTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WBTC_VAULT_ADDRESS,
    eventName
  );
  wbtcTvlEntity.tvl = tvlWBTC;
  wbtcTvlEntity.save();

  const linkTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_LINK_VAULT_ADDRESS,
    eventName
  );
  linkTvlEntity.tvl = tvlLINK;
  linkTvlEntity.save();

  const uniTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_UNI_VAULT_ADDRESS,
    eventName
  );
  uniTvlEntity.tvl = tvlUNI;
  uniTvlEntity.save();

  const usdcSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_USDC_VAULT_ADDRESS,
    eventName
  );
  usdcSupplyEntity.totalSupply = supplyUSDC;
  usdcSupplyEntity.save();

  const wethSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WETH_VAULT_ADDRESS,
    eventName
  );
  wethSupplyEntity.totalSupply = supplyWETH;
  wethSupplyEntity.save();

  const wbtcSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WBTC_VAULT_ADDRESS,
    eventName
  );
  wbtcSupplyEntity.totalSupply = supplyWBTC;
  wbtcSupplyEntity.save();

  const linkSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_LINK_VAULT_ADDRESS,
    eventName
  );
  linkSupplyEntity.totalSupply = supplyLINK;
  linkSupplyEntity.save();

  const uniSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_UNI_VAULT_ADDRESS,
    eventName
  );
  uniSupplyEntity.totalSupply = supplyUNI;
  uniSupplyEntity.save();
}

export function handleDeposit1(event: Deposit1Event): void {
  const eventName = "deposit1";
  const usdcVault = BoostedGlpVault.bind(BOOSTED_USDC_VAULT_ADDRESS);
  const wethVault = BoostedGlpVault.bind(BOOSTED_WETH_VAULT_ADDRESS);
  const wbtcVault = BoostedGlpVault.bind(BOOSTED_WBTC_VAULT_ADDRESS);
  const linkVault = BoostedGlpVault.bind(BOOSTED_LINK_VAULT_ADDRESS);
  const uniVault = BoostedGlpVault.bind(BOOSTED_UNI_VAULT_ADDRESS);

  const pricePerShareUSDC = usdcVault.pps();
  const pricePerShareWETH = wethVault.pps();
  const pricePerShareWBTC = wbtcVault.pps();
  const pricePerShareLINK = linkVault.pps();
  const pricePerShareUNI = uniVault.pps();
  const tvlUSDC = usdcVault.totalAssets();
  const tvlWETH = wethVault.totalAssets();
  const tvlWBTC = wbtcVault.totalAssets();
  const tvlLINK = linkVault.totalAssets();
  const tvlUNI = uniVault.totalAssets();
  const supplyUSDC = usdcVault.totalSupply();
  const supplyWETH = wethVault.totalSupply();
  const supplyWBTC = wbtcVault.totalSupply();
  const supplyLINK = linkVault.totalSupply();
  const supplyUNI = uniVault.totalSupply();

  const userBalanceEvent = new UserBoostedBalanceEvent(
    `weth:deposit1:${event.transaction.hash.toHex()}`
  );

  userBalanceEvent.block = event.block.number;
  userBalanceEvent.timestamp = event.block.timestamp;
  userBalanceEvent.txHash = event.transaction.hash.toHexString();
  userBalanceEvent.event = eventName;
  userBalanceEvent.token = BOOSTED_WETH_VAULT_ADDRESS.toHexString();
  userBalanceEvent.user = event.params.owner.toHexString();
  userBalanceEvent.assets = event.params.assets;
  userBalanceEvent.shares = event.params.shares;
  userBalanceEvent.from = event.params.caller.toHexString();
  userBalanceEvent.to = BOOSTED_WETH_VAULT_ADDRESS.toHexString();
  userBalanceEvent.save();

  const usdcPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_USDC_VAULT_ADDRESS,
    eventName
  );
  usdcPpsEntity.pricePerShare = pricePerShareUSDC;
  usdcPpsEntity.save();

  const wethPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WETH_VAULT_ADDRESS,
    eventName
  );
  wethPpsEntity.pricePerShare = pricePerShareWETH;
  wethPpsEntity.save();

  const wbtcPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WBTC_VAULT_ADDRESS,
    eventName
  );
  wbtcPpsEntity.pricePerShare = pricePerShareWBTC;
  wbtcPpsEntity.save();

  const linkPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_LINK_VAULT_ADDRESS,
    eventName
  );
  linkPpsEntity.pricePerShare = pricePerShareLINK;
  linkPpsEntity.save();

  const uniPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_UNI_VAULT_ADDRESS,
    eventName
  );
  uniPpsEntity.pricePerShare = pricePerShareUNI;
  uniPpsEntity.save();

  const usdcTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_USDC_VAULT_ADDRESS,
    eventName
  );
  usdcTvlEntity.tvl = tvlUSDC;
  usdcTvlEntity.save();

  const wethTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WETH_VAULT_ADDRESS,
    eventName
  );
  wethTvlEntity.tvl = tvlWETH;
  wethTvlEntity.save();

  const wbtcTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WBTC_VAULT_ADDRESS,
    eventName
  );
  wbtcTvlEntity.tvl = tvlWBTC;
  wbtcTvlEntity.save();

  const linkTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_LINK_VAULT_ADDRESS,
    eventName
  );
  linkTvlEntity.tvl = tvlLINK;
  linkTvlEntity.save();

  const uniTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_UNI_VAULT_ADDRESS,
    eventName
  );
  uniTvlEntity.tvl = tvlUNI;
  uniTvlEntity.save();

  const usdcSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_USDC_VAULT_ADDRESS,
    eventName
  );
  usdcSupplyEntity.totalSupply = supplyUSDC;
  usdcSupplyEntity.save();

  const wethSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WETH_VAULT_ADDRESS,
    eventName
  );
  wethSupplyEntity.totalSupply = supplyWETH;
  wethSupplyEntity.save();

  const wbtcSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WBTC_VAULT_ADDRESS,
    eventName
  );
  wbtcSupplyEntity.totalSupply = supplyWBTC;
  wbtcSupplyEntity.save();

  const linkSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_LINK_VAULT_ADDRESS,
    eventName
  );
  linkSupplyEntity.totalSupply = supplyLINK;
  linkSupplyEntity.save();

  const uniSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_UNI_VAULT_ADDRESS,
    eventName
  );
  uniSupplyEntity.totalSupply = supplyUNI;
  uniSupplyEntity.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  const eventName = "withdraw";
  const usdcVault = BoostedGlpVault.bind(BOOSTED_USDC_VAULT_ADDRESS);
  const wethVault = BoostedGlpVault.bind(BOOSTED_WETH_VAULT_ADDRESS);
  const wbtcVault = BoostedGlpVault.bind(BOOSTED_WBTC_VAULT_ADDRESS);
  const linkVault = BoostedGlpVault.bind(BOOSTED_LINK_VAULT_ADDRESS);
  const uniVault = BoostedGlpVault.bind(BOOSTED_UNI_VAULT_ADDRESS);

  const pricePerShareUSDC = usdcVault.pps();
  const pricePerShareWETH = wethVault.pps();
  const pricePerShareWBTC = wbtcVault.pps();
  const pricePerShareLINK = linkVault.pps();
  const pricePerShareUNI = uniVault.pps();
  const tvlUSDC = usdcVault.totalAssets();
  const tvlWETH = wethVault.totalAssets();
  const tvlWBTC = wbtcVault.totalAssets();
  const tvlLINK = linkVault.totalAssets();
  const tvlUNI = uniVault.totalAssets();
  const supplyUSDC = usdcVault.totalSupply();
  const supplyWETH = wethVault.totalSupply();
  const supplyWBTC = wbtcVault.totalSupply();
  const supplyLINK = linkVault.totalSupply();
  const supplyUNI = uniVault.totalSupply();

  const userBalanceEvent = new UserBoostedBalanceEvent(
    `weth:withdraw:${event.transaction.hash.toHex()}`
  );

  userBalanceEvent.block = event.block.number;
  userBalanceEvent.timestamp = event.block.timestamp;
  userBalanceEvent.txHash = event.transaction.hash.toHexString();
  userBalanceEvent.event = eventName;
  userBalanceEvent.token = BOOSTED_WETH_VAULT_ADDRESS.toHexString();
  userBalanceEvent.user = event.params.owner.toHexString();
  userBalanceEvent.assets = event.params.assets;
  userBalanceEvent.shares = event.params.shares;
  userBalanceEvent.from = BOOSTED_WETH_VAULT_ADDRESS.toHexString();
  userBalanceEvent.to = event.params.receiver.toHexString();
  userBalanceEvent.save();

  const usdcPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_USDC_VAULT_ADDRESS,
    eventName
  );
  usdcPpsEntity.pricePerShare = pricePerShareUSDC;
  usdcPpsEntity.save();

  const wethPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WETH_VAULT_ADDRESS,
    eventName
  );
  wethPpsEntity.pricePerShare = pricePerShareWETH;
  wethPpsEntity.save();

  const wbtcPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WBTC_VAULT_ADDRESS,
    eventName
  );
  wbtcPpsEntity.pricePerShare = pricePerShareWBTC;
  wbtcPpsEntity.save();

  const linkPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_LINK_VAULT_ADDRESS,
    eventName
  );
  linkPpsEntity.pricePerShare = pricePerShareLINK;
  linkPpsEntity.save();

  const uniPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_UNI_VAULT_ADDRESS,
    eventName
  );
  uniPpsEntity.pricePerShare = pricePerShareUNI;
  uniPpsEntity.save();

  const usdcTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_USDC_VAULT_ADDRESS,
    eventName
  );
  usdcTvlEntity.tvl = tvlUSDC;
  usdcTvlEntity.save();

  const wethTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WETH_VAULT_ADDRESS,
    eventName
  );
  wethTvlEntity.tvl = tvlWETH;
  wethTvlEntity.save();

  const wbtcTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WBTC_VAULT_ADDRESS,
    eventName
  );
  wbtcTvlEntity.tvl = tvlWBTC;
  wbtcTvlEntity.save();

  const linkTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_LINK_VAULT_ADDRESS,
    eventName
  );
  linkTvlEntity.tvl = tvlLINK;
  linkTvlEntity.save();

  const uniTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_UNI_VAULT_ADDRESS,
    eventName
  );
  uniTvlEntity.tvl = tvlUNI;
  uniTvlEntity.save();

  const usdcSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_USDC_VAULT_ADDRESS,
    eventName
  );
  usdcSupplyEntity.totalSupply = supplyUSDC;
  usdcSupplyEntity.save();

  const wethSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WETH_VAULT_ADDRESS,
    eventName
  );
  wethSupplyEntity.totalSupply = supplyWETH;
  wethSupplyEntity.save();

  const wbtcSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WBTC_VAULT_ADDRESS,
    eventName
  );
  wbtcSupplyEntity.totalSupply = supplyWBTC;
  wbtcSupplyEntity.save();

  const linkSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_LINK_VAULT_ADDRESS,
    eventName
  );
  linkSupplyEntity.totalSupply = supplyLINK;
  linkSupplyEntity.save();

  const uniSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_UNI_VAULT_ADDRESS,
    eventName
  );
  uniSupplyEntity.totalSupply = supplyUNI;
  uniSupplyEntity.save();
}

export function handleWithdrawComplete(event: WithdrawCompleteEvent): void {
  let entity = new WithdrawComplete(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._asset = event.params._asset;
  entity._account = event.params._account;
  entity._amount = event.params._amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWithdrawInitiated(event: WithdrawInitiatedEvent): void {
  let entity = new WithdrawInitiated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._asset = event.params._asset;
  entity._account = event.params._account;
  entity._amount = event.params._amount;
  entity._duration = event.params._duration;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const eventName = "init-withdraw";
  const usdcVault = BoostedGlpVault.bind(BOOSTED_USDC_VAULT_ADDRESS);
  const wethVault = BoostedGlpVault.bind(BOOSTED_WETH_VAULT_ADDRESS);
  const wbtcVault = BoostedGlpVault.bind(BOOSTED_WBTC_VAULT_ADDRESS);
  const linkVault = BoostedGlpVault.bind(BOOSTED_LINK_VAULT_ADDRESS);
  const uniVault = BoostedGlpVault.bind(BOOSTED_UNI_VAULT_ADDRESS);

  const pricePerShareUSDC = usdcVault.pps();
  const pricePerShareWETH = wethVault.pps();
  const pricePerShareWBTC = wbtcVault.pps();
  const pricePerShareLINK = linkVault.pps();
  const pricePerShareUNI = uniVault.pps();
  const tvlUSDC = usdcVault.totalAssets();
  const tvlWETH = wethVault.totalAssets();
  const tvlWBTC = wbtcVault.totalAssets();
  const tvlLINK = linkVault.totalAssets();
  const tvlUNI = uniVault.totalAssets();
  const supplyUSDC = usdcVault.totalSupply();
  const supplyWETH = wethVault.totalSupply();
  const supplyWBTC = wbtcVault.totalSupply();
  const supplyLINK = linkVault.totalSupply();
  const supplyUNI = uniVault.totalSupply();

  const usdcPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_USDC_VAULT_ADDRESS,
    eventName
  );
  usdcPpsEntity.pricePerShare = pricePerShareUSDC;
  usdcPpsEntity.save();

  const wethPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WETH_VAULT_ADDRESS,
    eventName
  );
  wethPpsEntity.pricePerShare = pricePerShareWETH;
  wethPpsEntity.save();

  const wbtcPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WBTC_VAULT_ADDRESS,
    eventName
  );
  wbtcPpsEntity.pricePerShare = pricePerShareWBTC;
  wbtcPpsEntity.save();

  const linkPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_LINK_VAULT_ADDRESS,
    eventName
  );
  linkPpsEntity.pricePerShare = pricePerShareLINK;
  linkPpsEntity.save();

  const uniPpsEntity = getBoostedVaultPpsEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_UNI_VAULT_ADDRESS,
    eventName
  );
  uniPpsEntity.pricePerShare = pricePerShareUNI;
  uniPpsEntity.save();

  const usdcTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_USDC_VAULT_ADDRESS,
    eventName
  );
  usdcTvlEntity.tvl = tvlUSDC;
  usdcTvlEntity.save();

  const wethTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WETH_VAULT_ADDRESS,
    eventName
  );
  wethTvlEntity.tvl = tvlWETH;
  wethTvlEntity.save();

  const wbtcTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WBTC_VAULT_ADDRESS,
    eventName
  );
  wbtcTvlEntity.tvl = tvlWBTC;
  wbtcTvlEntity.save();

  const linkTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_LINK_VAULT_ADDRESS,
    eventName
  );
  linkTvlEntity.tvl = tvlLINK;
  linkTvlEntity.save();

  const uniTvlEntity = getVaultTVLEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_UNI_VAULT_ADDRESS,
    eventName
  );
  uniTvlEntity.tvl = tvlUNI;
  uniTvlEntity.save();

  const usdcSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_USDC_VAULT_ADDRESS,
    eventName
  );
  usdcSupplyEntity.totalSupply = supplyUSDC;
  usdcSupplyEntity.save();

  const wethSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WETH_VAULT_ADDRESS,
    eventName
  );
  wethSupplyEntity.totalSupply = supplyWETH;
  wethSupplyEntity.save();

  const wbtcSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_WBTC_VAULT_ADDRESS,
    eventName
  );
  wbtcSupplyEntity.totalSupply = supplyWBTC;
  wbtcSupplyEntity.save();

  const linkSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_LINK_VAULT_ADDRESS,
    eventName
  );
  linkSupplyEntity.totalSupply = supplyLINK;
  linkSupplyEntity.save();

  const uniSupplyEntity = getVaultTotalSupplyEntity(
    event.block.number,
    event.block.timestamp,
    BOOSTED_UNI_VAULT_ADDRESS,
    eventName
  );
  uniSupplyEntity.totalSupply = supplyUNI;
  uniSupplyEntity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const amount = event.params.amount;

  const from = event.params.from.toHexString();
  const to = event.params.to.toHexString();

  // Any event not listed below is considered a transfer
  let balanceEvent = "transfer";
  // User deposited into the vault
  if (from == ZERO_ADDRESS) {
    balanceEvent = "deposit";
  }
  // User withdrew into the vault
  if (to == ZERO_ADDRESS) {
    balanceEvent = "withdraw";
  }

  // ZERO_ADDRESS = deposit event, don't register ZERO_ADDRESS's balance
  if (from != ZERO_ADDRESS) {
    const idFromTotal = `totalVault:boosted-weth:${from}`;
    let fromTotal = UserBoostedVaultBalanceTotal.load(idFromTotal);
    if (fromTotal == null) {
      fromTotal = new UserBoostedVaultBalanceTotal(idFromTotal);
      fromTotal.usdc = BigInt.zero();
      fromTotal.weth = amount;
      fromTotal.wbtc = BigInt.zero();
      fromTotal.uni = BigInt.zero();
      fromTotal.link = BigInt.zero();
    } else {
      fromTotal.weth = fromTotal.weth.minus(amount);
    }
    fromTotal.save();

    const fromHistoricalBalance = new UserBoostedVaultBalance(
      `${event.block.number}:boosted-weth:${from}`
    );
    fromHistoricalBalance.block = event.block.number;
    fromHistoricalBalance.timestamp = event.block.timestamp;
    fromHistoricalBalance.txHash = event.transaction.hash.toHex();
    fromHistoricalBalance.vault = BOOSTED_WETH_VAULT_ADDRESS.toHexString();
    fromHistoricalBalance.user = from;
    fromHistoricalBalance.value = fromTotal.weth;
    fromHistoricalBalance.event = balanceEvent;

    fromHistoricalBalance.save();
  }

  // ZERO_ADDRESS = withdraw event, don't register ZERO_ADDRESS's balance
  if (to != ZERO_ADDRESS) {
    const idToTotal = `totalVault:boosted-weth:${to}`;
    let toTotal = UserBoostedVaultBalanceTotal.load(idToTotal);
    if (toTotal == null) {
      toTotal = new UserBoostedVaultBalanceTotal(idToTotal);
      toTotal.usdc = BigInt.zero();
      toTotal.weth = amount;
      toTotal.wbtc = BigInt.zero();
      toTotal.uni = BigInt.zero();
      toTotal.link = BigInt.zero();
    } else {
      toTotal.weth = toTotal.weth.plus(amount);
    }
    toTotal.save();

    const toHistoricalBalance = new UserBoostedVaultBalance(
      `${event.block.number}:boosted-weth:${to}`
    );
    toHistoricalBalance.block = event.block.number;
    toHistoricalBalance.timestamp = event.block.timestamp;
    toHistoricalBalance.txHash = event.transaction.hash.toHex();
    toHistoricalBalance.vault = BOOSTED_WETH_VAULT_ADDRESS.toHexString();
    toHistoricalBalance.user = to;
    toHistoricalBalance.value = toTotal.weth;
    toHistoricalBalance.event = balanceEvent;

    toHistoricalBalance.save();
  }
}
