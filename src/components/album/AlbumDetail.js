import React from 'react'
import { Flex, Box } from '@grid'
import withPage from '@lib/page/withPage'
import { useMember } from '@lib/auth'
import { Fetch } from '@lib/api'
import * as AlbumService from '@features/album/services'
import DetailPageHeader from '@components/_common/DetailPageHeader'
import SongList from '@common/SongList'

AlbumDetailPage.defaultProps = {
  dataw: {
    title: 'KILL THIS LOVE',
    subTitle: 'BLACKPINK',
    bottomLine: '2019 • 5 Tracks',
    image: 'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
    tracks: [
      {
        name: 'Kill This Love',
        artist: 'BLACKPINK',
        album: 'KILL THIS LOVE',
        image:
          'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
        previewUrl:
          'https://p.scdn.co/mp3-preview/554bf24c1e0cccc09000c6fce75f08d30dc91967?cid=e4abb1ea8fdf4926a463960abd146fcb',
        durationMs: 189052,
      },
      {
        name: "Don't Know What To Do",
        artist: 'BLACKPINK',
        album: 'KILL THIS LOVE',
        image:
          'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
        previewUrl:
          'https://p.scdn.co/mp3-preview/9303f5daa53b082b9b09a78925fcbde3ad6668dc?cid=e4abb1ea8fdf4926a463960abd146fcb',
        durationMs: 201081,
      },
      {
        name: 'DDU-DU DDU-DU (Remix)',
        artist: 'BLACKPINK',
        album: 'KILL THIS LOVE',
        image:
          'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
        previewUrl:
          'https://p.scdn.co/mp3-preview/05cc17469ea45e8d928251e472e85c22226d60da?cid=e4abb1ea8fdf4926a463960abd146fcb',
        durationMs: 201225,
      },
    ],
  },
}

function AlbumDetailPage(props) {
  console.log('AlbumDetailPage', props)
  const {
    router: {
      query: { id },
    },
  } = props
  const { token } = useMember()

  if (token === null) {
    return null
  }

  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Fetch service={() => AlbumService.getAlbumById(id, { token })}>
        {props => {
          const { data } = props
          // console.log('props', props)
          const tracks = data.tracks.items.map(track => {
            return {
              ...track,
              artist: track.artists
                .map(artist => {
                  return artist.name
                })
                .join(),
              album: data.name,
              image: data.images[0].url,
              durationMs: track.duration_ms,
              previewUrl: track.preview_url,
            }
          })
          return (
            <React.Fragment>
              <Box width={1 / 3}>
                <DetailPageHeader
                  tracks={tracks}
                  data={{
                    image: data.images[0].url,
                    title: data.name,
                    subTitle: data.label,
                    bottomLine: '',
                  }}
                />
              </Box>
              <Box width={2 / 3}>
                <SongList tracks={tracks} />
              </Box>
            </React.Fragment>
          )
        }}
      </Fetch>
    </Flex>
  )
}

export default withPage()(AlbumDetailPage)
