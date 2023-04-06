export class User {

    id?: number;
    lastname: string;
    firstname: string;
    email: string;
    birthday: Date;
    password: string;
    admin: boolean = false;
    connected?: boolean;
    photo?: string;
    identity?: string;
    registrationDate?: Date;



    constructor(
         name: string, firstname: string,  email: string, birthday: Date,  password: string,    identityFile: string,   )  {
       
       
      
        this.lastname = name;
        this.firstname = firstname;
        this.email = email;
        this.birthday = birthday;
        this.password = password;
       
        this.identity = identityFile;
      
        }
}