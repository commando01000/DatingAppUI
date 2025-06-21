export interface Message {
  id: number;
  senderId: string;
  senderUsername: string;
  senderPhotoUrl: string;
  recipientId: string;
  recipientUsername: string;
  recipientPhotoUrl: string;
  content: string;
  isRead: boolean;
  dateRead: Date;
  messageSent: Date;
  senderDeleted: boolean;
  recipientDeleted: boolean;
}
