export class EmailSendError extends Error {
  constructor() {
    super("Email send failed");
  }
}
