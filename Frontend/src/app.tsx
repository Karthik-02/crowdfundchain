import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Sidebar } from "./components/sidebar";
import { Navbar } from "./components/navbar";
import { CreateCampaign } from "./pages/createCampaign";
import { Profile } from "./pages/profile";
import { CampaignDetails } from "./pages/campaignDetails";

export const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-gradient-to-r from-green-500 to-gray-900 text-gray-200 min-h-screen flex flex-row backdrop-filter backdrop-blur-lg">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
};
