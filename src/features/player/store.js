import { observable, action } from 'mobx'
export default class PlayerStore {
  @observable
  nowPlaying = {
    playing: false,
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
    status: '',
    currentIndex: 0,
    tracks: [],
  }

  @action
  play(track) {
    const { previewUrl, name, artist, image } = track

    this.nowPlaying.playing = true
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
    this.play(this.queue.tracks[this.queue.currentIndex])
  }

  @action
  setProgress(playingData) {
    const { timeElapsed, progress, duration } = playingData
    this.nowPlaying.timeElapsed = timeElapsed
    this.nowPlaying.progress = progress
    this.nowPlaying.duration = duration
  }
}
