export interface Message {

  id: number;
  sender: string;
  receiver: string;
  timestamp: number;
  message: string;
  sentAt: Date;
  read : boolean;


  

}
