export const generateKey = (prefix, suffix) =>
  `${prefix}--${suffix ? suffix : Math.random(10000)}`
