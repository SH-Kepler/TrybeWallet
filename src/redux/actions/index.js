// Coloque aqui suas actions
export function userAction(act) {
  return {
    type: 'USER',
    act,
  };
}

export function walletAction(act) {
  return {
    type: 'WALLET',
    act,
  };
}
