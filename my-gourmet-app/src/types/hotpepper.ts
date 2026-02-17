
export interface HotpepperResults {
  results: {
    api_version?: string
    results_available?: number
    results_returned?: string
    results_start?: number
    shop: HotpepperShop[]
  }
}

export interface HotpepperShop {
  id: string
  name: string
  address?: string
  access?: string
  genre?: { name?: string; code?: string; catch?: string }
  photo?: {
    mobile?: { l?: string; s?: string }
    pc?: { l?: string; s?: string; m?: string }
  }
  lat?: number
  lng?: number
  // 必要に応じてフィールド追加
}

export interface WishItem {
  id: string
  name: string
  address?: string
  genre?: string
  photo?: string
  memo?: string
}
