export namespace Definition {
  export enum Cookies {
    authToken = 'lope-auth-tk',
    authTokenSig = 'lope-auth-tk.sig',
    csrf = 'lcsrl',
  }
  export enum Header {
    csrfToken = 'x-csrf-token',
    cookie = 'cookie',
    setCookie = 'Set-Cookie',
  }
}
