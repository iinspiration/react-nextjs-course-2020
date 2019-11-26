import React from 'react'
import { Flex, Box } from '@grid'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import colors from '@features/_ui/colors'

import { inject } from '@lib/store'

function ButtonControl({ icon, circle = false, active = false, onClick }) {
  const css = {
    background: 'transparent',
    padding: '7px 8px 11px 10px',
    margin: '0 10px',
    width: '34px',
    height: '34px',
    cursor: 'pointer',
    ...(circle === true
      ? { border: `1px solid ${colors.link}`, borderRadius: '50%' }
      : { border: 'none' }),
  }

  return (
    <button onClick={onClick} css={css}>
      <Icon
        icon={icon}
        css={{
          color: active ? 'green' : colors.link,
          width: '10px',
        }}
      />
    </button>
  )
}

function ControlPanel({ playerStore }) {
  const { playing } = playerStore.nowPlaying
  const { queue } = playerStore
  const {
    queue: { status },
  } = playerStore
  return (
    <Flex>
      <Box>
        <ButtonControl
          icon="random"
          active={status === 'random'}
          onClick={() => {
            playerStore.setQueueStatus(
              status !== 'random' ? 'random' : 'normal',
            )
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="step-backward"
          onClick={() => {
            playerStore.setPlayIndex(queue.currentIndex - 1)
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon={playing ? 'pause' : 'play'}
          circle={true}
          onClick={() => {
            playerStore.togglePlayState()
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="step-forward"
          onClick={() => {
            const nextIndex = queue.currentIndex + 1
            if (queue.status === 'random') {
              playerStore.setPlayIndex(
                Math.floor(Math.random() * Math.floor(queue.tracks.length)),
              )
            } else if (queue.status === 'repeat') {
              if (queue.currentIndex === queue.tracks.length - 1) {
                playerStore.setPlayIndex(0)
              } else {
                playerStore.setPlayIndex(nextIndex)
              }
            } else {
              playerStore.setPlayIndex(nextIndex)
            }
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="redo-alt"
          active={status === 'repeat'}
          onClick={() => {
            playerStore.setQueueStatus(
              status !== 'repeat' ? 'repeat' : 'normal',
            )
          }}
        />
      </Box>
    </Flex>
  )
}

export default inject('playerStore')(ControlPanel)
