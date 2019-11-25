import React, { useState } from 'react'
import { Flex, Box } from '@grid'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import SearchResults from './SearchResults'

import { Fetch } from '@lib/api'

import * as SearchService from '@features/search/services'

function SearchPage({ data }) {
  const [keyword, setKeyword] = useState([])
  const { token } = useMember()

  if (token === null) {
    return null
  }

  const onKeywordChange = e => {
    setKeyword(e.target.value)
  }

  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Box width={1}>
        <input
          type="text"
          value={keyword}
          placeholder="Search for artists, albums or playlists..."
          css={{
            padding: '15px 20px',
            borderRadius: '40px',
            border: 'none',
            width: '500px',
          }}
          onChange={onKeywordChange}
        />
      </Box>

      <Fetch
        service={() =>
          SearchService.getSearchResult(
            keyword,
            'playlist,album,track,artist',
            token,
          )
        }>
        {props => {
          const { data } = props
          console.log('data', data)
          return (
            <React.Fragment>
              {data.albums.items.length ? (
                <SearchResults
                  title="Albums"
                  data={data.albums.items}
                  route="album-detail"
                />
              ) : null}
              {data.playlists.items.length ? (
                <SearchResults
                  title="Playlists"
                  data={data.playlists.items}
                  route="playlist-detail"
                />
              ) : null}
            </React.Fragment>
          )
        }}
      </Fetch>
    </Flex>
  )
}

export default withPage({ restricted: true })(SearchPage)
