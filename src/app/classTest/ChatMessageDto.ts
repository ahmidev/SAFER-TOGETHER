export class ChatMessageDto {
  sender_id: number;
  receiver_id: number;
  message: string;
  lecture: boolean;

  constructor(sender_id: number,receiver_id: number, message: string, lecture: boolean){
      this.sender_id = sender_id;
      this.receiver_id = receiver_id;
      this.message = message;
      this.lecture = lecture;
  }
}