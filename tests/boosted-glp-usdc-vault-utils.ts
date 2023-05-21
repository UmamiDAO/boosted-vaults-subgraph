import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  Deposit,
  Deposit1,
  Paused,
  Transfer,
  Unpaused,
  Withdraw,
  WithdrawComplete,
  WithdrawInitiated
} from "../generated/BoostedGlpUsdcVault/BoostedGlpUsdcVault"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  amount: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return approvalEvent
}

export function createDepositEvent(
  _asset: Address,
  _account: Address,
  _amount: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("_asset", ethereum.Value.fromAddress(_asset))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return depositEvent
}

export function createDeposit1Event(
  caller: Address,
  owner: Address,
  assets: BigInt,
  shares: BigInt
): Deposit1 {
  let deposit1Event = changetype<Deposit1>(newMockEvent())

  deposit1Event.parameters = new Array()

  deposit1Event.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  deposit1Event.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  deposit1Event.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  deposit1Event.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return deposit1Event
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  amount: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return transferEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createWithdrawEvent(
  caller: Address,
  receiver: Address,
  owner: Address,
  assets: BigInt,
  shares: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return withdrawEvent
}

export function createWithdrawCompleteEvent(
  _asset: Address,
  _account: Address,
  _amount: BigInt
): WithdrawComplete {
  let withdrawCompleteEvent = changetype<WithdrawComplete>(newMockEvent())

  withdrawCompleteEvent.parameters = new Array()

  withdrawCompleteEvent.parameters.push(
    new ethereum.EventParam("_asset", ethereum.Value.fromAddress(_asset))
  )
  withdrawCompleteEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  )
  withdrawCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return withdrawCompleteEvent
}

export function createWithdrawInitiatedEvent(
  _asset: Address,
  _account: Address,
  _amount: BigInt,
  _duration: BigInt
): WithdrawInitiated {
  let withdrawInitiatedEvent = changetype<WithdrawInitiated>(newMockEvent())

  withdrawInitiatedEvent.parameters = new Array()

  withdrawInitiatedEvent.parameters.push(
    new ethereum.EventParam("_asset", ethereum.Value.fromAddress(_asset))
  )
  withdrawInitiatedEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  )
  withdrawInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )
  withdrawInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "_duration",
      ethereum.Value.fromUnsignedBigInt(_duration)
    )
  )

  return withdrawInitiatedEvent
}
