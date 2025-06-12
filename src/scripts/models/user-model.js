class UserModel {
  constructor({ id = null, name = '', email = '', createdAt = null }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }

  static fromJson(json) {
    return new UserModel({
      id: json.id,
      name: json.name,
      email: json.email,
      createdAt: json.createdAt ? new Date(json.createdAt) : null,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt ? this.createdAt.toISOString() : null,
    };
  }
}

export default UserModel; 