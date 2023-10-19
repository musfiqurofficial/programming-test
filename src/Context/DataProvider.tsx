import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext<SpaceXLaunch[]>([]);

type SpaceXLaunch = {
  flight_number: number;
  mission_name: string;
  mission_id: string[];
  upcoming: boolean;
  launch_year: string;
  launch_date_unix: number;
  launch_date_utc: string;
  launch_date_local: string;
  is_tentative: boolean;
  tentative_max_precision: string;
  tbd: boolean;
  launch_window: number;
  rocket: {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
    first_stage: {
      cores: {
        core_serial: string;
        flight: number;
        block: string | null;
        gridfins: boolean;
        legs: boolean;
        reused: boolean;
        land_success: boolean | null;
        landing_intent: boolean;
        landing_type: string | null;
        landing_vehicle: string | null;
      }[];
    };
    second_stage: {
      block: number;
      payloads: {
        payload_id: string;
        norad_id: string[];
        reused: boolean;
        customers: string[];
        nationality: string;
        manufacturer: string;
        payload_type: string;
        payload_mass_kg: number;
        payload_mass_lbs: number;
        orbit: string;
        orbit_params: {
          reference_system: string;
          regime: string;
          longitude: number | null;
          semi_major_axis_km: number | null;
          eccentricity: number | null;
          periapsis_km: number;
          apoapsis_km: number;
          inclination_deg: number;
          period_min: number | null;
          lifespan_years: number | null;
          epoch: number | null;
          mean_motion: number | null;
          raan: number | null;
          arg_of_pericenter: number | null;
          mean_anomaly: number | null;
        };
      }[];
    };
    fairings: {
      reused: boolean;
      recovery_attempt: boolean;
      recovered: boolean;
      ship: string | null;
    };
  };
  ships: string[];
  telemetry: {
    flight_club: string | null;
  };
  launch_site: {
    site_id: string;
    site_name: string;
    site_name_long: string;
  };
  launch_success: boolean;
  launch_failure_details: {
    time: number;
    altitude: number | null;
    reason: string;
  };
  links: {
    mission_patch: string;
    mission_patch_small: string;
    reddit_campaign: string | null;
    reddit_launch: string | null;
    reddit_recovery: string | null;
    reddit_media: string | null;
    presskit: string | null;
    article_link: string;
    wikipedia: string;
    video_link: string;
    youtube_id: string;
    flickr_images: string[];
  };
  details: string;
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  timeline: {
    webcast_liftoff: number;
  };
  crew: null;
};
const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [spaceXData, setSpaceXData] = useState<SpaceXLaunch[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SpaceXLaunch[]>(
          "https://api.spacexdata.com/v3/launches"
        );
        setSpaceXData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={ spaceXData }>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
