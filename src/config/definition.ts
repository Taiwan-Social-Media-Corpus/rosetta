export namespace Definition {
  export enum Cookies {
    authToken = 'lope-auth-tk',
    authTokenSig = 'lope-auth-tk.sig',
    csrfToken = 'lcsrl',
  }
  export enum Header {
    csrfToken = 'x-csrf-token',
  }
}
