'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {
            running: false,
            resultList: [],
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        }
    }, {
        key: 'resetTimer',
        value: function resetTimer() {
            this.reset();
        }
    }, {
        key: 'format',
        value: function format(times) {
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.running) {
                this.running = true;
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.running) {
                return;
            }
            this.calculate();
        }
    }, {
        key: 'calculate',
        value: function calculate() {

            var timeValues = {
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
            this.setState({ times: timeValues });
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.running = false;
            clearInterval(this.watch);
        }
    }, {
        key: 'lap',
        value: function lap() {
            this.addTime(this.format(this.state.times));
        }
    }, {
        key: 'addTime',
        value: function addTime(time) {
            this.setState(function (prevState, props) {
                return {
                    resultList: [].concat(_toConsumableArray(prevState.resultList), [time])
                };
            });
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.setState({
                resultList: []
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'stopwatch' },
                    React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return _this3.start(e);
                            } },
                        'Start'
                    ),
                    React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return _this3.stop(e);
                            } },
                        'Stop'
                    ),
                    React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return _this3.resetTimer(e);
                            } },
                        'Reset'
                    ),
                    React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return _this3.lap(e);
                            } },
                        'Lap'
                    ),
                    React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return _this3.clear(e);
                            } },
                        'Clear Lap'
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    this.format(this.state.times)
                ),
                React.createElement(
                    'ul',
                    { className: 'results' },
                    this.state.resultList.map(function (item) {
                        return React.createElement(
                            'li',
                            { key: item },
                            item
                        );
                    })
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        return '0' + result;
    }
    return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.querySelector('.stopwatch'));
