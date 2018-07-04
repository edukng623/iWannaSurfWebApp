export class User {
  name: String;
  email: String;
  subscriptions: String[];
  notifications: any[] = [];
  password: String;
  admin: Boolean;
  _id: String;

  static valueOf(data): User {
    return {
      name: data.username,
      email: data.email,
      subscriptions: data.subscriptions,
      password: data.password,
      admin: data.admin,
      notifications: data.notifications || [],
      _id: data._id,
      setAdmin: (val) => {}
    };
  }

  constructor(name: String) {
    this.name = name;
  }

  setAdmin(admin: boolean) {
    this.admin = admin;
  }
}
