export class UserNotFoundError extends Error {
  constructor() {
    super("User not found");
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
  }
}

export class UserNotAuthorizedError extends Error {
  constructor() {
    super("User not authorized. Please log in");
  }
}

export class EmailAlreadyExistsError extends Error {
  public email: string;

  constructor(email: string) {
    super(`Account with the email ${email} already exists`);
    this.email = email;
  }
}

export class UsernameAlreadyExistsError extends Error {
  public username: string;

  constructor(username: string) {
    super(`Account with the username @${username} already exists`);
    this.username = username;
  }
}

export class EmailNotVerifiedError extends Error {
  public email: string;

  constructor(email: string) {
    super(
      "Email not verified, please check your inbox for a verification link"
    );
    this.email = email;
  }
}
