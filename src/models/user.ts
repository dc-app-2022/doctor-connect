export type UserRole = "PT" | "HCP" | "HCC";
export type UserGender = "MALE" | "FEMALE" | "NA";
export type UserAddress = {
  add_line1: string;
  add_line2: string;
  add_line3: string;
  state: string;
  city: string;
  zip: number | string;
};

export type HCPbio = {
  title?: "Md" | "Dr." | "Prof." | "Asst. Prof." | "Mrs." | "Mr.";
  display_name?: string;
  highest_degree?: string;
  summary?: string;
  designation?: string;
  total_experience?: number;
};

export type HCCbio = {
  display_name?: string;
  summary?: string;
};

export type GeoLocation = {
  lat: number | string;
  lng: number | string;
};

export type DiagnosisHistory = { summary: string; description: string };
export interface ApplicationUser {
  uid?: string;
  email: string;
  role?: UserRole;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  age?: number;
  gender?: UserGender;
  phone?: number | string;
  address?: UserAddress;
  diagnosis_history?: DiagnosisHistory[] | null;
  specialities?: string[] | undefined | null;
  bio: HCPbio | HCCbio;
  geolocation: GeoLocation;
}

export type AppUser = ApplicationUser | null;
