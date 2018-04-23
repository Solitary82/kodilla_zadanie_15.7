class Stopwatch extends React.Component {
    constructor(props) {
        super (props);
            this.state = {
                running: false,
                resultList: [],
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            };
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

    
    resetTimer() {
        this.reset();
        }

        
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    
    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    
    step() {
        if (!this.running) {
            return;
        } 
        this.calculate();
    }
    
    calculate() {
        
        const timeValues = {
            miliseconds: this.state.times.miliseconds,
            seconds: this.state.times.seconds,
            minutes: this.state.times.minutes
        };
        
        timeValues.miliseconds += 1;
        if (timeValues.miliseconds >= 100) {
            timeValues.seconds += 1;
            timeValues.miliseconds = 0;
        }
        if (timeValues.seconds >= 60) {
            timeValues.minutes += 1;
            timeValues.seconds = 0;
        }
        this.setState({times: timeValues});
    }
    
    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
    
    lap() {
        this.addTime(this.format(this.state.times));
    }

    addTime(time) {
        this.setState((prevState, props) => ({
            resultList: [...prevState.resultList, time]
        }));
    }

    clear() {
        this.setState({
            resultList: []
        });
    }
    
    render() {
        return(
            <div>
            <div className="stopwatch">
                <button onClick={e =>this.start(e)}>Start</button>
                <button onClick={e =>this.stop(e)}>Stop</button>
                <button onClick={e =>this.resetTimer(e)}>Reset</button>
                <button onClick={e =>this.lap(e)}>Lap</button>
                <button onClick={e =>this.clear(e)}>Clear Lap</button>
            </div>
                
            <div>{this.format(this.state.times)}</div>
                
                <ul className="results">
                    {this.state.resultList.map(item => <li key={item}>{item}</li>)}
                </ul>
            
            </div>
            )
        }
    }

function pad0(value) {
    const result = value.toString();
    if (result.length < 2) {
        return '0' + result;
    }
    return result;
}

ReactDOM.render(<Stopwatch/>, document.querySelector('.stopwatch'))