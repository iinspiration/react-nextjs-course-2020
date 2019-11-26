import React, { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { inject } from '@lib/store'

function Player({ playerStore }) {
  const { url, playing } = playerStore.nowPlaying
  const { queue, volume } = playerStore
  const playerInstance = useRef(null)
  console.log('Player url', url)
  console.log('Player playing', playing)
  useEffect(() => {
    playerStore.setplayerIst(playerInstance)
  })
  return (
    <ReactPlayer
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={volume.level}
      muted={false}
      ref={playerInstance}
      onProgress={data => {
        // console.log('onProgress', data)
        playerStore.setProgress({
          timeElapsed: data.playedSeconds,
          progress: data.played,
          duration: data.loadedSeconds,
        })
      }}
      onEnded={() => {
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
          playerStore.togglePlayState()
        }

        console.log('onEnded')
      }}
    />
  )
}

export default inject('playerStore')(Player)
