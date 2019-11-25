import { fetchAPI } from '@lib/api'

export function getSearchResult(keyword, type, token) {
  return fetchAPI({
    path: `/search/`,
    token,
    params: {
      q: keyword,
      type,
    },
  })
}
