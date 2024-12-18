import * as React from "react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileInfo } from "./ProfileInfo";
import { TabSwitch } from "./TabSwitch";

export const Profile: React.FC = () => {
  const navItems = ["Create", "Explore", "Support"];
  const tabs = [
    { id: "dev", label: "Dev", icon: "🤖" },
    { id: "creator", label: "Creator", icon: "🎨" }
  ];

  return (
    <div className="flex overflow-hidden flex-col items-center bg-neutral-900 pb-[1126px] max-md:pb-24">
      <ProfileHeader
        logo="https://cdn.builder.io/api/v1/image/assets/TEMP/3fc4f37657a36803efe9334382dbe331a5cf2f011270d3967c973c183b4fd8f8?placeholderIfAbsent=true&apiKey=20766fa84f9a4404961ff5304dbabdcf"
        navItems={navItems}
      />
      <ProfileBanner
        profileImage="https://cdn.builder.io/api/v1/image/assets/TEMP/a9348147573fb7977292be44f99fb7b8b4f8e6723cd44d17eae6b91f27f191fd?placeholderIfAbsent=true&apiKey=20766fa84f9a4404961ff5304dbabdcf"
        bannerImage="https://cdn.builder.io/api/v1/image/assets/TEMP/7aa177dcfdaed3041daa49a0faaf5ce5189065d1b6932b8696e9a3706865cdc5?placeholderIfAbsent=true&apiKey=20766fa84f9a4404961ff5304dbabdcf"
        infoIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/08ccbf70829222abcc1c37734ac6a350fdd97d5bd2966d7e8316038667055dfa?placeholderIfAbsent=true&apiKey=20766fa84f9a4404961ff5304dbabdcf"
        infoText="This creator has yet claimed the profile"
      />
      <ProfileInfo
        avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/0b7f466cc0ffc79c7baf8734fcd1ec893fc514c926deb480a1d2bc8a2c776c05?placeholderIfAbsent=true&apiKey=20766fa84f9a4404961ff5304dbabdcf"
        verifiedIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/bdcb28ff383f99996ede178f13ee9f35d9a3d8f0d99dfae1a3a2aebf83964687?placeholderIfAbsent=true&apiKey=20766fa84f9a4404961ff5304dbabdcf"
        name="Elon Musk"
        username="@elonmusk"
        amount="$15,508"
        currency="233 SOL"
      />
      <TabSwitch
        activeTab="dev"
        tabs={tabs}
      />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c17589ca7910c556beeafa108d6344892dd43d3a1420f23b90c006d703ccc3f0?placeholderIfAbsent=true&apiKey=20766fa84f9a4404961ff5304dbabdcf"
        alt="Profile content"
        className="object-contain mt-11 max-w-full rounded-lg aspect-[2.67] w-[799px] max-md:mt-10"
      />
    </div>
  );
}
