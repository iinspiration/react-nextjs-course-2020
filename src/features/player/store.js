import { observable, action } from 'mobx'
export default class PlayerStore {
  @observable
  nowPlaying = {
    playing: false,
    id: '',
    title: '',
    subTitle: '',
    image: '',
    url: '',
    timeElapsed: 0,
    progress: 0,
    duration: 0,
  }
  @observable
  queue = {
    status: 'normal',
    currentIndex: 0,
    tracks: [],
  }

  @observable
  volume = {
    muted: false,
    level: 0.3,
  }

  @observable
  player = null

  @action
  setVolumeLevel(level) {
    this.volume.level = level
    console.log('setVolumeLevel', level)
  }

  @action
  toggleMute() {
    this.volume.muted = !this.volume.muted
    if (this.volume.muted) {
      this.setVolumeLevel(0)
    } else {
      this.setVolumeLevel(0.3)
    }
    console.log('toggleMute')
  }

  @action
  setplayerIst(playerIst) {
    this.player = playerIst
    console.log('setplayerIst')
  }

  @action
  setQueueStatus(status) {
    this.queue.status = status
    console.log('setQueueStatus', status)
  }

  @action
  play(track) {
    const { id, previewUrl, name, artist, image } = track

    this.nowPlaying.playing = true
    this.nowPlaying.id = id
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl

    console.log('Now Playing:', track)
  }
  @action
  togglePlayState() {
    this.nowPlaying.playing = !this.nowPlaying.playing
    console.log('togglePlayState')
  }

  @action
  addToQueue(tracks) {
    this.queue.tracks = [...this.queue.tracks, ...tracks]
    console.log('addToQueue', tracks)
  }

  @action
  replaceQueue(tracks) {
    this.queue.tracks = [...tracks]
    console.log('replaceQueue', tracks)
    this.queue.currentIndex = 0
    this.play(this.queue.tracks[this.queue.currentIndex])
  }

  @action
  removeFromQueue(id) {
    this.queue.tracks = this.queue.tracks.filter(each => {
      return each.id !== id
    })
    console.log('removeFromQueue id', id)
    console.log('newQueue', this.queue.tracks)
  }

  @action
  setProgress(playingData) {
    const { timeElapsed, progress, duration } = playingData
    this.nowPlaying.timeElapsed = timeElapsed
    this.nowPlaying.progress = progress
    this.nowPlaying.duration = duration
  }

  @action
  setPlayIndex(index) {
    if (index <= this.queue.tracks.length && index >= 0) {
      this.queue.currentIndex = index
      this.play(this.queue.tracks[this.queue.currentIndex])
      console.log('setPlayIndex', index)
    }
  }
}
