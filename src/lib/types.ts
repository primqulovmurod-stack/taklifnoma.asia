export interface InvitationContent {
  groomName: string;
  brideName: string;
  date: string;
  time: string;
  locationName: string;
  locationUrl: string;
  imageUrl: string;
  musicUrl: string;
}

export interface Invitation {
  id?: string;
  slug: string;
  is_paid: boolean;
  content: InvitationContent;
}
