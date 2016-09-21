export interface Party {
  _id?: string;
  name: string;
  description?: string;
  owner?: string;
  public: boolean;
  invited?: string[];
  rsvps?: RSVP[];
  images?: string[];
}

interface RSVP {
  userId: string;
  response: string;
}
