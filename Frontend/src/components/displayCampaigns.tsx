import { useNavigate } from "react-router-dom"
import { loader } from "../assets"
import { FundCard } from "./fundCard"

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

type DisplayCampaignsProps = {
    title: string
    isLoading: boolean
    campaigns: ParsedCampaign[]
}

export function DisplayCampaigns({
    title,
    isLoading,
    campaigns,
}: DisplayCampaignsProps) {
    const navigate = useNavigate()

    function handleNavigate(campaign: ParsedCampaign) {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    }

    return (
        <div>
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>
            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {isLoading && (
                    <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
                )}
                {!isLoading && campaigns.length === 0 && (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                        You have not created any campaigns yet.
                    </p>
                )}
                {!isLoading && campaigns.length > 0 && campaigns.map((campaign, index) => (
                    <FundCard key={campaign.pId}
                        {...campaign}
                        handleClick={() => handleNavigate(campaign)}
                    />
                ))}
            </div>
        </div>
    )
}