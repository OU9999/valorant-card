interface StatusContent {
  locale: string;
  content: string;
}

interface StatusUpdate {
  id: number;
  author: string;
  publish: boolean;
  publish_locations: string[];
  translations: StatusContent[];
  created_at: string;
  updated_at: string;
}

interface StatusIncident {
  id: number;
  maintenance_status: string | null;
  incident_severity: string | null;
  titles: StatusContent[];
  updates: StatusUpdate[];
  created_at: string;
  archive_at: string | null;
  updated_at: string | null;
  platforms: string[];
}

interface PlatformStatus {
  id: string;
  name: string;
  locales: string[];
  maintenances: StatusIncident[];
  incidents: StatusIncident[];
}

export type { StatusContent, StatusUpdate, StatusIncident, PlatformStatus };
