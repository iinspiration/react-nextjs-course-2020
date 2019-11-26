import React from 'react'
import ReactPlayer from 'react-player'
import { inject } from '@lib/store'

function Player({ playerStore }) {
  const { url, playing } = playerStore.nowPlaying
  console.log('Player url', url)
  console.log('Player playing', playing)
  return (
    <ReactPlayer
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={0.8}
      muted={false}
      onProgress={data => {
        // console.log('onProgress', data)
        playerStore.setProgress({
          timeElapsed: data.playedSeconds,
          progress: data.played,
          duration: data.loadedSeconds,
        })
      }}
      onEnded={() => {
        console.log('onEnded')
      }}
    />
  )
}

export default inject('playerStore')(Player)
