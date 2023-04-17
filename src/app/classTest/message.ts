import { User } from "./user";

export class Message {
  id!: number;
  sender!: User;
  receiver!: User;
  message!: string;
}