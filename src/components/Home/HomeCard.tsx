const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.toLocaleDateString(undefined, { month: "short" });
  const day = date.toLocaleDateString(undefined, { day: "numeric" });
  const year = date.toLocaleDateString(undefined, { year: "numeric" });

  return `${day} ${month}, ${year}`;
};

interface HomeCardProps {
  launch: {
    links: { mission_patch: string };
    mission_name: string;
    rocket: { rocket_name: string };
    launch_success: boolean;
    launch_date_local: string;
  };
}

const HomeCard: React.FC<HomeCardProps> = ({ launch }) => {
  const { links, mission_name, rocket, launch_success, launch_date_local } =
    launch;

  const formattedLaunchDate = formatDate(launch_date_local);
  return (
    <div className="w-full max-w-[424px] mx-auto h-[392.4px] border border-[#CED4DA] rounded-[8px] text-center py-[32px]">
      <div className="flex justify-center mb-[32px]">
        <img
          className="w-32 h-32 object-cover"
          src={links.mission_patch}
          alt=""
        />
      </div>
      <p className="text-[#6C757D] my-[8px]">
        Launch Date: {formattedLaunchDate}
      </p>
      <h4 className="text-[24px] font-[500]">{mission_name}</h4>
      <p className="text-[#6C757D] my-[4px]">{rocket.rocket_name}</p>
      <p className="text-[#6C757D] mt-[32px]">Launch Status:</p>
      {launch_success ? (
        <button className="bg-[#198754] w-[50.6px] h-[20.4px] rounded-[4px] mt-[8px] text-[12px] font-bold text-white">
          Success
        </button>
      ) : (
        <button className="bg-[#DC3545] w-[50.6px] h-[20.4px] rounded-[4px] mt-[8px] text-[12px] font-bold text-white">
          Failed
        </button>
      )}
    </div>
  );
};

export default HomeCard;
