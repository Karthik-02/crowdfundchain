## Justification for using Blockchain

- **Transparency:** Blockchain offers transparency by allowing all transactions and campaign details to be recorded on an immutable public ledger. Donors can verify where their contributions are going and how funds are being utilized, enhancing trust in the platform.

- **Security:** Smart contracts deployed on a blockchain are highly secure due to cryptographic principles. Funds are stored and managed by the contract itself, reducing the risk of fraud or mismanagement by intermediaries.

- **Decentralization:** Blockchain-based crowdfunding eliminates the need for centralized intermediaries, such as banks or crowdfunding platforms, which can be prone to censorship or control. Instead, transactions are directly between donors and campaign owners, promoting peer-to-peer interactions.

- **Global Accessibility:** Blockchain enables global participation in crowdfunding campaigns. Anyone with an internet connection can access the platform, regardless of geographic location or financial background, fostering inclusivity and democratizing access to funding.
  
- **Immutable Records:** Once recorded on the blockchain, data cannot be altered or tampered with, providing an auditable trail of all transactions and campaign details. This feature enhances accountability and reduces the risk of data manipulation or corruption.
  
- **Automatic Execution:** Smart contracts on the blockchain can automatically execute predefined actions based on specified conditions. In the context of crowdfunding, this could include releasing funds to campaign owners when certain milestones are met or refunding donations if campaign goals are not reached by the deadline.

- **Reduced Costs:** By eliminating intermediaries and automating processes, blockchain-based crowdfunding can reduce transaction fees and administrative costs associated with traditional crowdfunding platforms or financial institutions.


## Getting Started (Backend)

Create a project using this example:

```bash
npx thirdweb create --contract --template hardhat-javascript-starter
```

You can start editing the page by modifying `contracts/Contract.sol`.

To add functionality to your contracts, you can use the `@thirdweb-dev/contracts` package which provides base contracts and extensions to inherit. The package is already installed with this project. Head to our [Contracts Extensions Docs](https://portal.thirdweb.com/contractkit) to learn more.

## Building the project

After any changes to the contract, run:

```bash
npm run build
# or
yarn build
```

to compile your contracts. This will also detect the [Contracts Extensions Docs](https://portal.thirdweb.com/contractkit) detected on your contract.

## Deploying Contracts

When you're ready to deploy your contracts, just run one of the following command to deploy you're contracts:

```bash
npm run deploy
# or
yarn deploy
```

## Releasing Contracts

If you want to release a version of your contracts publicly, you can use one of the followings command:

```bash
npm run release
# or
yarn release
```

## Deployed Contract in Thirdweb.js

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        bool isActive;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.isActive = true;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        require(campaigns[_id].isActive, "Campaign is not active.");
        require(block.timestamp < campaigns[_id].deadline, "Campaign deadline has passed.");

        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        campaign.amountCollected += amount;

        if (campaign.amountCollected >= campaign.target) {
            campaign.isActive = false;
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() view public returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}

```

## Screenshots
![image](https://github.com/Karthik-02/crowdfundchain/assets/81423983/016ab60d-5fa0-47fb-9863-20e342bf10e3)

![image](https://github.com/Karthik-02/crowdfundchain/assets/81423983/7e08930b-2bcf-43b5-aa9c-502c4cfed4ce)

![image](https://github.com/Karthik-02/crowdfundchain/assets/81423983/4e433ce5-d59b-459c-9df0-b379f25ac486)

![image](https://github.com/Karthik-02/crowdfundchain/assets/81423983/fb2e4483-0921-4122-b894-29180d43d82d)

![image](https://github.com/Karthik-02/crowdfundchain/assets/81423983/36f516d4-7879-4d99-aff4-48b910ad839f)


## Appendix
You can also create contract on your own and deploy it using the above given steps in screenshots. After deploying them,
you can add your deployed contract address in the thirdweb.js to the *index.tsx* file in the **Frontend/contexts** folder
by modifying the below line.

```javascript
  const { contract } = useContract('0x21F28d31F30E30fC37296ffa52ae82e3D25cB167')
```
