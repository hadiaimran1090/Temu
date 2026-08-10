export type ProductPalette = 'sunset' | 'night' | 'amber' | 'mint' | 'ocean' | 'graphite'

export type ProductImageKey =
  | 'wallet'
  | 'smartwatch'
  | 'phone'
  | 'chair'
  | 'lamp'
  | 'toolkit'
  | 'shoes'
  | 'hairclipper'
  | 'sticker'

export interface Product {
  id: number
  title: string
  price: string
  oldPrice: string
  sold: string
  badge: string
  palette: ProductPalette
  imageKey: ProductImageKey
}