declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare interface CallableFunction {
  (...args: any[]): any;
}
