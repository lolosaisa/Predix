/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface PredixPredictionMarketInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "claimReward"
      | "createMarket"
      | "marketCount"
      | "placeBet"
      | "resolveMarket"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "BetPlaced" | "MarketCreated" | "MarketResolved"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "claimReward",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createMarket",
    values: [string, BigNumberish, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "marketCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "placeBet",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "resolveMarket",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "claimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMarket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "marketCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "placeBet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "resolveMarket",
    data: BytesLike
  ): Result;
}

export namespace BetPlacedEvent {
  export type InputTuple = [
    marketId: BigNumberish,
    optionIndex: BigNumberish,
    bettor: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    marketId: bigint,
    optionIndex: bigint,
    bettor: string,
    amount: bigint
  ];
  export interface OutputObject {
    marketId: bigint;
    optionIndex: bigint;
    bettor: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MarketCreatedEvent {
  export type InputTuple = [
    marketId: BigNumberish,
    question: string,
    pollId: BigNumberish,
    options: string[]
  ];
  export type OutputTuple = [
    marketId: bigint,
    question: string,
    pollId: bigint,
    options: string[]
  ];
  export interface OutputObject {
    marketId: bigint;
    question: string;
    pollId: bigint;
    options: string[];
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MarketResolvedEvent {
  export type InputTuple = [
    marketId: BigNumberish,
    winningOption: BigNumberish
  ];
  export type OutputTuple = [marketId: bigint, winningOption: bigint];
  export interface OutputObject {
    marketId: bigint;
    winningOption: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface PredixPredictionMarket extends BaseContract {
  connect(runner?: ContractRunner | null): PredixPredictionMarket;
  waitForDeployment(): Promise<this>;

  interface: PredixPredictionMarketInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  claimReward: TypedContractMethod<
    [_marketId: BigNumberish],
    [void],
    "nonpayable"
  >;

  createMarket: TypedContractMethod<
    [_question: string, _pollId: BigNumberish, _options: string[]],
    [void],
    "nonpayable"
  >;

  marketCount: TypedContractMethod<[], [bigint], "view">;

  placeBet: TypedContractMethod<
    [_marketId: BigNumberish, _optionIndex: BigNumberish],
    [void],
    "payable"
  >;

  resolveMarket: TypedContractMethod<
    [_marketId: BigNumberish, _winningOption: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "claimReward"
  ): TypedContractMethod<[_marketId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "createMarket"
  ): TypedContractMethod<
    [_question: string, _pollId: BigNumberish, _options: string[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "marketCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "placeBet"
  ): TypedContractMethod<
    [_marketId: BigNumberish, _optionIndex: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "resolveMarket"
  ): TypedContractMethod<
    [_marketId: BigNumberish, _winningOption: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "BetPlaced"
  ): TypedContractEvent<
    BetPlacedEvent.InputTuple,
    BetPlacedEvent.OutputTuple,
    BetPlacedEvent.OutputObject
  >;
  getEvent(
    key: "MarketCreated"
  ): TypedContractEvent<
    MarketCreatedEvent.InputTuple,
    MarketCreatedEvent.OutputTuple,
    MarketCreatedEvent.OutputObject
  >;
  getEvent(
    key: "MarketResolved"
  ): TypedContractEvent<
    MarketResolvedEvent.InputTuple,
    MarketResolvedEvent.OutputTuple,
    MarketResolvedEvent.OutputObject
  >;

  filters: {
    "BetPlaced(uint256,uint256,address,uint256)": TypedContractEvent<
      BetPlacedEvent.InputTuple,
      BetPlacedEvent.OutputTuple,
      BetPlacedEvent.OutputObject
    >;
    BetPlaced: TypedContractEvent<
      BetPlacedEvent.InputTuple,
      BetPlacedEvent.OutputTuple,
      BetPlacedEvent.OutputObject
    >;

    "MarketCreated(uint256,string,uint256,string[])": TypedContractEvent<
      MarketCreatedEvent.InputTuple,
      MarketCreatedEvent.OutputTuple,
      MarketCreatedEvent.OutputObject
    >;
    MarketCreated: TypedContractEvent<
      MarketCreatedEvent.InputTuple,
      MarketCreatedEvent.OutputTuple,
      MarketCreatedEvent.OutputObject
    >;

    "MarketResolved(uint256,uint256)": TypedContractEvent<
      MarketResolvedEvent.InputTuple,
      MarketResolvedEvent.OutputTuple,
      MarketResolvedEvent.OutputObject
    >;
    MarketResolved: TypedContractEvent<
      MarketResolvedEvent.InputTuple,
      MarketResolvedEvent.OutputTuple,
      MarketResolvedEvent.OutputObject
    >;
  };
}
