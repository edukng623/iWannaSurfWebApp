export class User {
  name: String
  admin: Boolean

  constructor(name: String){
    this.name = name;
  }

  setAdmin(admin: boolean){
    this.admin = admin;
  }
}