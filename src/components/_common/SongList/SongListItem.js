import React, { useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Flex, Box } from '@grid'
import colors from '@features/_ui/colors'
import { convertSecondsToMinutes } from '@features/player/utilities'
import { inject } from '@lib/store'

export default inject('playerStore')(SongListItem)

function SongListItem({ isPlaying, playerStore, track, type, index }) {
  const {
    queue: { tracks = [] },
    nowPlaying,
  } = playerStore
  const [hover, setHover] = useState(false)

  if (track.previewUrl === null) {
    return null
  }

  return (
    <Box
      width={1}
      css={{
        '&:hover': {
          background: colors.background.light,
        },
      }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}>
      <Flex
        flexWrap="wrap"
        css={{
          padding: '8px 20px',
        }}>
        <Box css={{ padding: '5px', alignSelf: 'center' }}>
          <button
            css={{
              backgroundColor: 'transparent',
              border: 'none',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
            }}
            onClick={() => {
              console.log('Play', track)
              if (type === 'queue') {
                console.log('play on index', index)
                playerStore.setPlayIndex(index)
              } else {
                playerStore.replaceQueue([
                  {
                    ...track,
                    previewUrl: track.preview_url,
                  },
                ])
              }
            }}>
            <Icon
              icon={
                nowPlaying.id === track.id ? 'pause' : hover ? 'play' : 'music'
              }
              css={{
                color: colors.link,
              }}
            />
          </button>
        </Box>
        <Box
          css={{
            flex: 1,
            padding: '5px',
          }}>
          <Flex
            flexWrap="wrap"
            css={{
              padding: '0px 20px 0px 0px',
            }}>
            <Box width={1} css={{ color: colors.link }}>
              {track.name}
            </Box>
            <Box width={1} css={{ fontSize: '0.9em', paddingTop: '10px' }}>
              {track.artist} • {track.album}
            </Box>
          </Flex>
        </Box>
        <Box
          css={{
            padding: '0px 10px',
            fontSize: '0.85em',
            color: colors.link,
          }}>
          {type === 'queue' ? (
            <button
              css={{
                backgroundColor: 'transparent',
                border: 'none',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
              }}
              onClick={() => {
                playerStore.removeFromQueue(track.id)
              }}>
              <Icon
                icon="times-circle"
                css={{
                  color: colors.link,
                }}
              />
            </button>
          ) : (
            <button
              css={{
                backgroundColor: 'transparent',
                border: 'none',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
              }}
              onClick={() => {
                console.log('addToQueue', track)
                const isDub = tracks.find(each => {
                  return each.previewUrl === track.preview_url
                })
                console.log('isDub', isDub)
                if (!isDub) {
                  playerStore.addToQueue([track])
                } else {
                  console.log('duplicate track')
                }
              }}>
              <Icon
                icon="plus-circle"
                css={{
                  color: colors.link,
                }}
              />
            </button>
          )}
        </Box>
        <Box
          css={{
            paddingTop: '5px',
            fontSize: '0.85em',
          }}>
          {convertSecondsToMinutes(track.durationMs / 1000)}
        </Box>
      </Flex>
    </Box>
  )
}
