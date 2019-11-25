import * as API from './repository'

export function getSearchResult(keyword, type, token) {
  return API.getSearchResult(keyword, type, token)
}
