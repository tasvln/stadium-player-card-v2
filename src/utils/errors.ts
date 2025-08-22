export function cleanErrors(e: any) {
  // Suppress error message if user rejected tx request (code 4001)
  if (e?.code === 4001 || e?.code === 'ACTION_REJECTED') {
    return undefined
  }

  if (e?.code === -3200 || e?.code === 'INSUFFICIENT_FUNDS') {
    return 'Insufficient funds'
  }

  return e?.message
}
