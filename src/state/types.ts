import { Toast } from 'components/ToastListener/types'

export interface ToastsState {
  data: Toast[]
}

// presale
export interface PresaleConfig {
  stage: number,
  rate: number,
  bonus: number,
  cap: number
}

export interface PresaleInfo {
  started: boolean,
  closed: boolean,
  totalSold: number,
  soldAmount: number,
  openTime: number,
  endTime: number,
  curStage: number,
  rate: number,
  stages: PresaleConfig[]
}

export interface PresaleState {
  data: PresaleInfo
}

// Block
export interface BlockState {
  currentBlock: number
  initialBlock: number
}

// Global state

export interface State {
  presale: PresaleState
  toasts: ToastsState
  block: BlockState
}
