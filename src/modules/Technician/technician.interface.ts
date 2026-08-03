export type TUpdateTechnicianProfile = {
  bio?: string;
  experience?: number;
  location?: string;
  profileImg?: string;
};

export interface TUpdateAvailability {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}

export interface TUpdateBookingStatus {
  status:
    | "ACCEPTED"
    | "DECLINED"
    | "IN_PROGRESS"
    | "COMPLETED";
}