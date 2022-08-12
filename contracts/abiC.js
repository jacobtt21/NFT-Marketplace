export const abiC = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "addContributor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "profile",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bio",
				"type": "string"
			}
		],
		"name": "createCommunity",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "delist",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCommunities",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "cname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cPic",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bio",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "contributors",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "allow",
						"type": "bool"
					}
				],
				"internalType": "struct oustroCommunity.Community[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "getCommByName",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "cname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cPic",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bio",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "contributors",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "allow",
						"type": "bool"
					}
				],
				"internalType": "struct oustroCommunity.Community",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];