import { SmartContract, useAddress, useConnect, useContract, useContractWrite, useDisconnect } from "@thirdweb-dev/react";
import { BaseContract, BigNumber, ethers } from "ethers";
import { ReactNode, SetStateAction, createContext, useState } from "react";

type CampaignThirdweb = {
    owner: string
    title: string
    description: string
    target: BigNumber
    deadline: BigNumber
    amountCollected: BigNumber
    image: string
}

type ParsedCampaign = {
    owner: string
    title: string
    description: string
    target: string
    deadline: number
    amountCollected: string
    image: string
    pId: string
}

type ParsedDonation = {
    donator: string
    donation: string
}

export type StateContextType = {
    address: string | undefined
    contract: SmartContract<BaseContract> | undefined
    connect: any
    disconnect: () => Promise<void>
    createCampaign: (form: CampaignForm) => Promise<void>
    getCampaigns: () => Promise<ParsedCampaign[]>
    getUserCampaigns: () => Promise<ParsedCampaign[]>
    donate: (pId: string, amount: string) => Promise<any>
    getDonations: (pId: string) => Promise<ParsedDonation[]>
    searchCampaign: string
    setSearchCampaign: (search: SetStateAction<string>) => void
}

export const StateContext = createContext({} as StateContextType)

type StateContextProviderProps = {
    children: ReactNode
}

type CampaignForm = {
    name: string
    title: string
    description: string
    target: BigNumber
    deadline: string
    image: string
}

export function StateContextProvider({ children }: StateContextProviderProps) {
    const { contract } = useContract('0x21F28d31F30E30fC37296ffa52ae82e3D25cB167')
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign')

    const address = useAddress()
    const connect = useConnect()
    const disconnect = useDisconnect()

    const publishCampaign = async (form: CampaignForm) => {
        try {
            const data = await createCampaign({
                args: [
                    address, //form
                    form.title,
                    form.description,
                    form.target,
                    new Date(form.deadline).getTime(),//deadline
                    form.image
                ]
            })
            console.log("contract call success", data)
        } catch (err) {
            console.log("contract call failure", err)
        }
    }

    const getCampaigns = async () => {
        try {
            const campaigns = await contract?.call('getCampaigns') as CampaignThirdweb[]

            const parsedCampaigns = campaigns.map((campaign, id) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                image: campaign.image,
                pId: "" + id
            }))

            return parsedCampaigns;
        } catch (err) {
            return []
        }
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns()

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address)

        return filteredCampaigns;
    }

    const donate = async (pId: string, amount: string) => {
        const data = await contract?.call('donateToCampaign', [
            pId], {
            value: ethers.utils.parseEther(amount)
        })

        return data;
    }

    const getDonations = async (pId: string) => {
        const donations = await contract?.call('getDonators', [pId])
        const numberOfDonations = donations[0].length

        const parseDonations = []

        for (let i = 0; i < numberOfDonations; i++) {
            parseDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parseDonations
    }

    const [searchCampaign, setSearchCampaign] = useState('')

    return (
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            disconnect,
            createCampaign: publishCampaign,
            getCampaigns,
            getUserCampaigns,
            donate,
            getDonations,
            searchCampaign,
            setSearchCampaign
        }}>
            {children}
        </StateContext.Provider>
    )
}
