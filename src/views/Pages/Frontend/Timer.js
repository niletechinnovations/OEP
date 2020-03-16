import React, { Component } from 'react'

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hours:'00',
            minuts:'00',
            second:'00',
            seconds:'00',
            isOn:false
         };
      }
    
      tick() {
        
        let d = Number(this.state.seconds);
        
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        if(s<10)
            s='0'+s;
        if(m<10)
            m='0'+m;
        if(h<10)
            h='0'+h;
       /*  console.log('Hour:'+ h)
        console.log('Minut:'+ m)
        console.log('Second:'+ s) */        
        this.setState(state => ({
          hours:h,
          minuts:m,
          second:s,          
          seconds: Number(state.seconds) + 1
        }));
        this.props.updateTime(this.state.seconds);
      }
    
      componentDidMount() {
          this.setState({seconds: Number(this.props.totalFormFillingTime)});
          setTimeout(() => this.tick(),1000);
          
      }
    
      componentWillUnmount() {
        clearInterval(this.interval);
      }
    /* Start timer */
    startTimer = () => {
          
          if(!this.state.isOn)
          {
            this.props.updateStartTime(this.state.seconds);
            this.setState({isOn:true})
            this.interval = setInterval(() => this.tick(), 1000);
          }
    }
    /* Pause timer */
    stopTimer = () => {
          if(this.state.isOn){
            this.setState({isOn:false})
            this.props.updateEndTime(this.state.seconds);            
            clearInterval(this.interval);
          }
    }
    
    render() {
        if(this.props.autoTimerStart)
          this.startTimer();
        return (
            <div className="startTimer-info">
                <h2>Timer:-</h2>
                <div className="timerRow"> <div className="timeCount timeHours">{this.state.hours} </div>: <div className="timeCount timeMinutes">{this.state.minuts} </div>: <div className="timeCount timeSeconds">{this.state.second}</div> </div>
                
            </div>
        )
    }
}
