export {}

declare global {
  interface Window {
    KanjiCanvas: {
      init: (id: string) => void
      erase: (id: string) => void
      deleteLast: (id: string) => void
      recognize: (id: string) => string
      erase: (id: string) => void
    }
  }
}
