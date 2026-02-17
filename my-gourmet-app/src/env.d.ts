
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly HOTPEPPER_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
