// SELECTORS
export const isInitialising = profile => profile.isEmpty || !profile.isLoaded
export const isEmpty = profile => profile.isEmpty
export const isLoaded = profile => profile.isLoaded