export class User {

    id?: number;
    name: string;
    firstname: string;
    email: string;
    birthday: Date;
    password: string;
    admin: boolean = false;
    connected?: boolean;
    photo?: string;
    identityFile?: string;
    registrationDate?: Date;



    constructor(
         name: string, firstname: string,  email: string, birthday: Date,  password: string,    identityFile: string,   )  {
       
        this.name = name;
        this.firstname = firstname;
        this.email = email;
        this.birthday = birthday;
        this.password = password;
        this.identityFile = identityFile;
      
        }
}