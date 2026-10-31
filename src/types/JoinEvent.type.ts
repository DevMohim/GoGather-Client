export interface IJoinEvent {
  _id: Id;
  eventTitle: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  thumbnailImage: string;
  eventDescription: string;
  eventCreatorName: string;
  eventCreatorEmail: string;
  eventId: string;
  userId: string;
  name: string;
  email: string;
  image: string;
  joinDate : string;
}

export interface Id {
  $oid: string;
}
