declare module 'glob' {
  interface GlobOptions {
    cwd?: string;
    root?: string;
    dot?: boolean;
    nomount?: boolean;
    mark?: boolean;
    nosort?: boolean;
    stat?: boolean;
    silent?: boolean;
    strict?: boolean;
    cache?: boolean;
    statCache?: boolean;
    symlinks?: boolean;
    sync?: boolean;
    nounique?: boolean;
    nonull?: boolean;
    debug?: boolean;
    nobrace?: boolean;
    noglobstar?: boolean;
    noext?: boolean;
    nocase?: boolean;
    matchBase?: boolean;
    nodir?: boolean;
    ignore?: string | string[];
    follow?: boolean;
    realpath?: boolean;
    absolute?: boolean;
    fs?: any;
  }

  interface Glob {
    (pattern: string, options?: GlobOptions, callback?: (err: Error | null, matches: string[]) => void): void;
    sync(pattern: string, options?: GlobOptions): string[];
  }

  const glob: Glob;
  export = glob;
}

