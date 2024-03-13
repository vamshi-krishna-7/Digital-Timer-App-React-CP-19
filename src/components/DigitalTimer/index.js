// Write your code here

import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimit: 25,
    isTimerRunning: false,
    minutes: 25,
    seconds: 0,
  }

  onReset = () => {
    this.setState({
      isTimerRunning: false,
      minutes: 25,
      seconds: 0,
      timerLimit: 25,
    })
    clearInterval(this.timerId)
  }

  onStartingTimer = () => {
    const {isTimerRunning, timerLimit, seconds} = this.state
    let {minutes} = this.state

    if (minutes === 0) {
      minutes = timerLimit
    }

    if (!isTimerRunning) {
      let totalSeconds = minutes * 60 + seconds

      this.setState({isTimerRunning: !isTimerRunning})

      this.timerId = setInterval(() => {
        totalSeconds -= 1

        const min = Math.floor(totalSeconds / 60)
        const sec = totalSeconds % 60

        this.setState({minutes: min, seconds: sec})
        if (min === 0 && sec === 0) {
          clearInterval(this.timerId)
          this.setState({isTimerRunning: false})
        }
      }, 1000)
    } else {
      clearInterval(this.timerId)
      this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
      minutes: prevState.timerLimit + 1,
    }))
  }

  onDecrement = () => {
    const {timerLimit} = this.state
    let newTimerLimit = timerLimit

    if (timerLimit > 1) {
      newTimerLimit -= 1
    }
    this.setState({timerLimit: newTimerLimit, minutes: newTimerLimit})
  }

  render() {
    const {timerLimit, isTimerRunning, minutes, seconds} = this.state

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    const timerStatus = isTimerRunning ? 'Running' : 'Paused'
    const startPauseBtnText = isTimerRunning ? 'Pause' : 'Start'
    const startPauseIcon = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const playPauseIconAlt = isTimerRunning ? 'pause icon' : 'play icon'

    const isBtnDisabled = seconds > 0

    return (
      <div className="app-container">
        <h1 className="digital-head">Digital Timer</h1>
        <div className="timer-container">
          <div className="img-container">
            <div className="white-container">
              <h1 className="timer-text">
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>
          <div className="timer-controls-container">
            <div className="start-reset-container">
              <div className="start-reset-item">
                <button
                  className="start-reset-button start-reset-text"
                  type="button"
                  onClick={this.onStartingTimer}
                >
                  <img
                    src={startPauseIcon}
                    className="timer-control-icon"
                    alt={playPauseIconAlt}
                  />
                  <p>{startPauseBtnText}</p>
                </button>
              </div>
              <div className="start-reset-item">
                <button
                  className="start-reset-button start-reset-text"
                  type="button"
                >
                  <img
                    className="timer-control-icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    onClick={this.onReset}
                  />
                  <p>Reset</p>
                </button>
              </div>
            </div>
            <p className="timer-limit-text">Set Timer Limit</p>
            <div className="limit-control-container">
              <button
                className="plus-minus-button"
                type="button"
                onClick={this.onDecrement}
                disabled={isBtnDisabled}
              >
                -
              </button>
              <p className="limit-number">{timerLimit}</p>
              <button
                className="plus-minus-button"
                type="button"
                onClick={this.onIncrement}
                disabled={isBtnDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
