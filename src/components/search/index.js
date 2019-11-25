import React, { useState, useEffect } from 'react'
import { Flex, Box } from '@grid'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import SearchResults from './SearchResults'

import { Fetch } from '@lib/api'

import * as SearchService from '@features/search/services'

SearchPage.defaultProps = {
  data: {
    albums: [
      {
        id: '2Pz8VAMiGc9UW1rrbBRDuO',
        name: 'KILL THIS LOVE',
        images: [
          {
            url:
              'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
          },
        ],
      },
    ],
    playlists: [
      {
        id: '37i9dQZF1DX8kP0ioXjxIA',
        name: 'This Is BLACKPINK',
        images: [
          {
            url:
              'https://pl.scdn.co/images/pl/default/af1eb22fbb48deecfde3b244ffd683a81696a18d',
          },
        ],
      },
    ],
  },
}

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
              <SearchResults
                title="Albums"
                data={data.albums.items}
                route="album-detail"
              />
              <SearchResults
                title="Playlists"
                data={data.playlists.items}
                route="playlist-detail"
              />
            </React.Fragment>
          )
        }}
      </Fetch>
    </Flex>
  )
}

export default withPage({ restricted: true })(SearchPage)
