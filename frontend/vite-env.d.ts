interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly PORT;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
