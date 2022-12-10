/**
 * (More) Loosely validate a URL `string`.
 * A modified version of https://www.npmjs.com/package/is-url
 *
 * @param {String} string
 * @return {Boolean}
 */
export default function isUrl(string){
  if (typeof string !== 'string') {
    return false;
  }

  let protocolAndDomainRE = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
  let localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/
  let nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;

  let match = string.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  let everythingAfterProtocol = match[0] === "http" || match[0] === "https" ? match[1] : match[0];
  if (!everythingAfterProtocol) {
    return false;
  }

  return localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol);
}
