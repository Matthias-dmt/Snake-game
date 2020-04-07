import React, { Component } from 'react';
import Snake from './Snake';
import Apple from './Apple';

const getRandomCoordinates = () => {
  let min = Math.ceil(1);
  let max = Math.floor(100);

  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  
  return [x, y];
}


const initialState = {
    intervId: null,
    speed: 200,
    direction: 'RIGHT',
    food: getRandomCoordinates(),
    snakeDots: [
      [48, 48],
      [48, 50],
      [48, 52]
    ]
  };



class App extends Component {

  state = initialState;
  

  componentDidMount() {
    let intervId = setInterval(this.moveSnack, this.state.speed);
    this.setState({intervId});
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    e.preventDefault();

    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  moveSnack = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }

    dots.push(head);
    dots.shift();
    this.setState({snakeDots : dots});
  }

  checkIfOutOfBorders = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length -1];

    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0 ) {
      this.onGameOver();
    }
  }

  checkIfCollapsed = () => {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];

    snake.pop();
    snake.forEach(dot => {
      if( head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    
    if(head[0] >= food[0] && head[0] <= food[0] && head[1] >= food[1] && head[1] <= food[1]) {
      this.setState({ food : getRandomCoordinates()})
      this.enLargeSnack();
      this.increaseSpeed(this.state.snakeDots.length);
    }
  }

  enLargeSnack () {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({snakeDots : newSnake});
  }

  increaseSpeed = (lenght) => {
    switch (lenght) {
      case lenght > 10:
        this.setState({ speed :+ 10});
        break;
      case lenght > 30:
        this.setState({ speed :+ 40});
        break;
      case lenght > 50:
        this.setState({ speed :+ 50});
        break;
    }
  }

  onGameOver = () => {
    clearInterval(this.state.intervId);
    alert(`You loose. Snake lenght is ${this.state.snakeDots.length}`);
    this.setState(initialState);
  }

  render() {
    return (
      <div className="body">
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots} />
          <Apple snakeFood={this.state.food} />
        </div>
      </div>
    );
  }
}
console.log(App.checkIfEat);
export default App;
