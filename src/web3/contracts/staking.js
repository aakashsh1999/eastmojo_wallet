export const stakeAddress = "0x1B3A628c06173EfDe7799BD25f71607b0f03430b";

export const stakeAbi = [
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "uint256", name: "_stakeID", type: "uint256" }],
    name: "calculateReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencyWithdrawalFees",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_userAddress", type: "address" },
    ],
    name: "getUserReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserStakeIDs",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeIDs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "stakeIdOfUser",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "_timePeriod", type: "uint256" },
    ],
    name: "stakeToken",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakedAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "stakes",
    outputs: [
      { internalType: "uint256", name: "stakeID", type: "uint256" },
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "uint256", name: "stakeAmount", type: "uint256" },
      { internalType: "uint256", name: "numberOfDays", type: "uint256" },
      { internalType: "uint256", name: "stakeTimeStart", type: "uint256" },
      { internalType: "uint256", name: "stakeTimeEnd", type: "uint256" },
      { internalType: "bool", name: "unstaked", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_stakeID", type: "uint256" }],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_emergencyWithdrawalFees",
        type: "uint256",
      },
    ],
    name: "updateEmergencyWIthdrawalFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_oneeightyDaysRewardPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_oneeightyyDaysRewardPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_threesixtyDaysRewardPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_threesixtyyDaysRewardPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_fivefortyDaysRewardPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_fivefortyyDaysRewardPercentage",
        type: "uint256",
      },
    ],
    name: "updateRewardPercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userRewardAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
