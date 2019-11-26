import React from 'react'
import { Flex, Box } from '@grid'
import { flowRight as compose } from 'lodash'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import colors from '@features/_ui/colors'
import { inject } from '@lib/store'

import SongList from '@common/SongList'

function QueuePage(props) {
  const { token } = useMember()
  const { tracks } = props.playerStore.queue

  if (token === null) {
    return null
  }

  console.log('queue', tracks)

  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Box width={1}>
        <h1
          css={{
            color: colors.link,
            fontSize: '2em',
            padding: '50px 10px 10px',
          }}>
          Queue
        </h1>
      </Box>
      <Box width={1}>
        <SongList tracks={tracks} type={'queue'} />
      </Box>
    </Flex>
  )
}

export default compose(
  withPage({ restricted: true }),
  inject('playerStore'),
)(QueuePage)
