import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  CompoundDistributeYield as CompoundDistributeYieldEvent,
  GlpRewardClaimed as GlpRewardClaimedEvent,
} from "../generated/AggregateVault/AggregateVaultHelper";
import {
  CloseRebalance,
  CollectVaultFees,
  OpenRebalance,
} from "../generated/AggregateVault/AggregateVault";
import {
  BOOSTED_LINK_VAULT_ADDRESS,
  BOOSTED_UNI_VAULT_ADDRESS,
  BOOSTED_USDC_VAULT_ADDRESS,
  BOOSTED_WBTC_VAULT_ADDRESS,
  BOOSTED_WETH_VAULT_ADDRESS,
} from "./constants";
import { VaultPricePerShare, VaultTVL } from "../generated/schema";
import { BoostedGlpVault } from "../generated/AggregateVault/BoostedGlpVault";

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

export function handleCollectVaultFees(event: CollectVaultFees): void {}

export function handleGlpRewardClaimed(event: GlpRewardClaimedEvent): void {
  const eventName = "claim";
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
}

export function handleCompoundDistributeYield(
  event: CompoundDistributeYieldEvent
): void {
  const eventName = "compound-yield";
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
}

export function handleOpenRebalance(event: OpenRebalance): void {
  const eventName = "open";
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
}

export function handleCloseRebalance(event: CloseRebalance): void {
  const eventName = "close";
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
}
