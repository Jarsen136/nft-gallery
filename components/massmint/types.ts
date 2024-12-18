import type { OpenSeaAttribute } from '@kodadot1/hyperdata'

export enum Status {
  Ok = 'Ok',
  Incomplete = 'Incomplete',
  Description = 'Description',
  Price = 'Price',
  Optional = 'Optional',
}

export type NFT = {
  id: number
  imageUrl: string
  name?: string
  file: File
  description?: string
  price?: number
  status?: Status
  tags?: OpenSeaAttribute[]
}

export type NFTToMint = {
  name: string
  file: File
  description?: string
  price?: number
  tags?: OpenSeaAttribute[]
}

export type NFTS = { [id: string]: NFT }
