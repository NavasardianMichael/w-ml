declare module '*.mp3' {
  const src: any
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}
declare module '*.webp' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
