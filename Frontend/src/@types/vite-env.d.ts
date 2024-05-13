/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TEMPLATE_CLIENT_ID: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }