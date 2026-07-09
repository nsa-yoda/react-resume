import configData from '../config.json'

export const config = (path, defaultValue) => {
  const keys = path.split('.')
  let result = configData

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    if (result[key] !== undefined) {
      result = result[key]
    } else {
      return defaultValue
    }
  }

  return result
}
