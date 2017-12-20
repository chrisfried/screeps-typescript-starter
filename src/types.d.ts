// type shim for nodejs' `require()` syntax
declare const require: (module: string) => any;

interface Creep {
  memory: {
    role?: string,
    building?: boolean,
    fixing?: boolean,
    upgrading?: boolean,
    towerCooldown?: boolean
  }
}
