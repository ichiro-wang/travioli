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

export class EmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Account with the email ${email} already exists`);
  }
}

export class UsernameAlreadyExistsError extends Error {
  constructor(username: string) {
    super(`Account with the username @${username} already exists`);
  }
}
