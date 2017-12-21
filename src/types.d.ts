// type shim for nodejs' `require()` syntax
declare const require: (module: string) => any;

interface Creep {
  memory: {
    role?: string,
    building?: boolean,
    fixing?: boolean,
    upgrading?: boolean,
    towerCooldown?: boolean,
    room?: string,
    oldRoom?: string,
    exit?: FIND_EXIT_BOTTOM | FIND_EXIT_LEFT | FIND_EXIT_RIGHT | FIND_EXIT_TOP
  }
}
