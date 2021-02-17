export class User {
    public id: number = 0;
    public login: string = "";
    public password: string = "";


    constructor(id: number, name: string, password: string) {
       this.id = id;
       this.login = name;
       this.password = password;
    }
}