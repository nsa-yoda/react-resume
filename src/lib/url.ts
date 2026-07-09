export default function isUrl(string) {
  if (typeof string !== 'string') {
    return false
  }

  const protocolAndDomainRE =
    /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
  const localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/
  const nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/

  const match = string.match(protocolAndDomainRE)
  if (!match) {
    return false
  }

  const everythingAfterProtocol =
    match[0] === 'http' || match[0] === 'https' ? match[1] : match[0]
  if (!everythingAfterProtocol) {
    return false
  }

  return (
    localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol)
  )
}
