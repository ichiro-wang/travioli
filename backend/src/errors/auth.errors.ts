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
  constructor(email: string) {
    super(`Account with the email ${email} already exists`);
  }
}

export class UsernameAlreadyExistsError extends Error {
  constructor(username: string) {
    super(`Account with the username @${username} already exists`);
  }
}

export class EmailNotVerifiedError extends Error {
  constructor() {
    super(
      "Email not verified, please check your inbox for a verification link"
    );
  }
}
