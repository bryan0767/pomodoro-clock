import React from 'react';
import './App.css'

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session:25,
      break: 5,
      lengthMin: 0,
      lengthSec: 0,
      counting: false,
      time: setInterval(this.count,1000)
    }
  }

componentDidMount() {
  const sessionUp = document.getElementById('session-increment')
  sessionUp.addEventListener('click', this.AdjustLength)
  const sessionDown = document.getElementById('session-decrement')
  sessionDown.addEventListener('click', this.AdjustLength)
  const breakUp = document.getElementById('break-increment')
  breakUp.addEventListener('click', this.AdjustLength)
  const breakDown = document.getElementById('break-decrement')
  breakDown.addEventListener('click', this.AdjustLength)
  const reset = document.getElementById('reset')
  reset.addEventListener('click',this.reset)
  const start_stop = document.getElementById('start_stop')
  start_stop.addEventListener('click', this.start)
  window.addEventListener('load',this.set)
}

start = () => {
  const label = document.getElementById('timer-label')

  if(this.state.session === 0 && this.state.break != 0) {
    label.innerHTML = 'Break'
    this.setState({
      lengthMin: this.state.break,
      lengthSec: 0,
      counting:true
    })
  }
  else if(this.state.counting === false) {
    this.setState({
      counting: true
    })
  } else if (this.state.counting === true) {
    this.setState({
      counting: false
    })
  }
}

set = () => {
  const label = document.getElementById('timer-label')

    if(label.innerHTML === 'Session') {
      this.setState({
        lengthMin:this.state.session
      })
    } else if (label.innerHTML === 'Break') {
      this.setState({
        lengthMin:this.state.break
      })
    }
}

count = () => {
  const beep = document.getElementById('beep')

  const label = document.getElementById('timer-label')
  const clock = document.querySelector('.Clock')

  if(this.state.counting === false) return;

  else if (this.state.counting === true) {
        this.setState({
          lengthSec: this.state.lengthSec - 1
          })
          //start nested if statement

          // changes innerhtml to break once session is over

           if (this.state.lengthMin <= 0 &&
              this.state.lengthSec <= -1  &&
              label.innerHTML === 'Session') {
              beep.play()
              label.innerHTML = 'Break'
              this.setState({
                lengthMin:this.state.break,
                lengthSec:0
              })
              this.color()
          }
            // changes innerhtml to session once break is over

          else if (this.state.lengthMin <= 0 &&
              this.state.lengthSec <= -1 &&
              label.innerHTML === 'Break') {
              beep.play()
              label.innerHTML = 'Session'
              this.setState({
                lengthMin:this.state.session,
                lengthSec:0
              })
              this.color()
          }

          // changes seconds to 59

         else if(this.state.lengthSec <= -1 &&
                  label.innerHTML === 'Session' &&
                this.state.lengthMin > 0) {
            this.setState({
              lengthSec:59,
              lengthMin: this.state.lengthMin - 1,
            })
            this.color()
          } else if(this.state.lengthSec <= -1 &&
                    label.innerHTML === 'Break' &&
                  this.state.lengthMin >  0) {
              this.setState({
                lengthSec:59,
                lengthMin: this.state.lengthMin - 1,
              })
              this.color()
            }
          //ends nested if statement
        }
      }

reset = (e) => {
  const beep = document.getElementById('beep')
  const label = document.getElementById('timer-label')
    label.innerHTML = 'Session'
    beep.pause()
    beep.currentTime = 0
    this.setState({
      session:25,
      break:5,
      lengthMin:25,
      lengthSec:0,
      counting:false
      })
      this.color()
    }

color = () => {
  const clock = document.querySelector('.Clock')
  const label = document.getElementById('timer-label')


  if (this.state.lengthMin === 0) {
    clock.style.color = '#c58181'
    clock.style.boxShadow = '#c75f5f 2px 2px 18px'
    document.body.style.background = 'linear-gradient(hsla(0, 5%, 55%, 0.7),#c58181)';
  } else if(label.innerHTML === 'Break' &&
            this.state.lengthMin > 0) {
    clock.style.color = '#ffe69a'
       clock.style.boxShadow = '2px 2px 18px #ffe69a'
       document.body.style.background = 'linear-gradient(hsla(0, 5%, 55%, 0.7),#ffe69a)';
  } else if (label.innerHTML === 'Session' &&
          this.state.lengthMin > 0) {
    clock.style.color = '#adfeff'
    clock.style.boxShadow = '2px 2px 18px hsla(171, 37%, 37%, 0.8)'
    document.body.style.background = 'linear-gradient(hsla(0, 5%, 55%, 0.7),hsla(183, 15%, 29%, 0.8))';
  }
}

AdjustLength = (e) => {
  const label = document.getElementById('timer-label')


  if(this.state.counting === true) return;

  // if time is on session, the clock display equals
  // session time plus

  else if (e.path[0].id === "session-increment"
      && label.innerHTML === 'Session'
    && this.state.session < 60 ) {
    this.setState({
      session: this.state.session + 1,
    })
    this.setState({
      lengthMin:this.state.session
    })
    this.color()
    }

  // if time is on break and session up, only change
  // length in session box

    else if (e.path[0].id === "session-increment"
       && label.innerHTML === 'Break'
     && this.state.session < 60 ) {
     this.setState({
       session: this.state.session + 1,
     })
    }

  // if time is on session, the clock display equals
  // session time minus

    else if (e.path[0].id === "session-decrement"
               && label.innerHTML === 'Session'
              && this.state.session != 1 ) {
       this.setState({
         session: this.state.session - 1,
       })
       this.setState({
         lengthMin:this.state.session
       })
       this.color()
     }

  // if timer is on break only be able to decrement
  // length in session box

     else if (e.path[0].id === "session-decrement"
          && label.innerHTML === 'Break'
          && this.state.session != 1) {
        this.setState({
          session: this.state.session - 1,
        })
      }

    // if timer is on session, break is only allowed
    // to increment its length in break box

      else if (e.path[0].id === "break-increment"
            && label.innerHTML === 'Session'
            && this.state.break < 60
          ) {
      this.setState({
        break: this.state.break + 1
      })}

    // if time is on break and break up, change
    // length in timer box and break box

      else if (e.path[0].id === "break-increment"
           && label.innerHTML === 'Break'
         && this.state.session < 60 ) {
         this.setState({
           break: this.state.break + 1,
         })
         this.setState({
           lengthMin:this.state.break
         })
         this.color()
       }


    // if timer is on session, break is only allowed
    // to decrement its length in break box

      else if (e.path[0].id === "break-decrement"
                && label.innerHTML === 'Session'
                && this.state.break != 1) {
                  this.setState({
                    break: this.state.break - 1,
                  })
                }

    // if time is on break and break down, change
    // length in timer box and break box

      else if (e.path[0].id === "break-decrement"
              && label.innerHTML === 'Break'
              && this.state.break != 1) {
                this.setState({
                  break: this.state.break - 1,
                })
                this.setState({
                  lengthMin:this.state.break
                })
              }
              this.color()
        }

render() {
    return (

      <div className="Clock">

      <div className ='timer'>
      <div id ='timer-label'>Session</div>
      <div id ='start_stop'>Start/Stop</div>
      <div id ='reset'>Reset</div>
      <div id ='time-left'>{this.state.lengthMin}:{this.state.lengthSec < 10 ? '0' : ''}{this.state.lengthSec}</div>
      </div>

      <div className = 'session'>
      <div id = 'session-label'>Session</div>
      <div id = 'session-increment'>+</div>
      <div id = 'session-length'>{this.state.session}</div>
      <div id = 'session-decrement'>-</div>
      </div>

      <div className = 'break'>
      <div id = 'break-label'>Break</div>
      <div id = 'break-increment'>+</div>
      <div id ='break-length'>{this.state.break}</div>
      <div id = 'break-decrement'>-</div>

      </div>

      <audio id='beep' src ='https://goo.gl/65cBl1' />

      </div>
    );
  }
}

export default Clock;
