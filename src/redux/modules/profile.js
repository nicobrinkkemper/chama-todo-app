// SELECTORS
export const isProfile = profile => profile !== null && profile.hasOwnProperty('email')
export const selectUid = profile => profile.providerData[0].uid
export const isInitialising = profile => profile.isEmpty || !profile.isLoaded