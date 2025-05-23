export enum BulkBroadcastJobStatus {
  PENDING = 1,
  PROCESSING,
  DONE
}

export enum BullJobType {
  BROADCAST = 1,
  FALLBACK = 2,
  FALLBACK_DISTRIBUTE = 3
}
