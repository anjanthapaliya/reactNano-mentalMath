import React, { Component } from 'react';

class Game  extends Component{

  state = (() => {
    const generateQuestions = () => {
        const value1 = Math.floor(Math.random() * 100);
        const value2 = Math.floor(Math.random() * 100);
        const value3 = Math.floor(Math.random() * 100);
        const proposedAnswer = Math.floor(Math.random() * 3) + (value1 + value2 + value3);
        return [value1, value2, value3, proposedAnswer];
  	};
	this.generateQuestions = generateQuestions;    
    const [value1, value2, value3, proposedAnswer] = generateQuestions();
    
    return {
      value1,
      value2,
      value3,
      proposedAnswer
    }
  })();


  updateState = (newQuestionAnswerArray) => {
    this.setState(currState => ({
      value1: newQuestionAnswerArray[0],
      value2: newQuestionAnswerArray[1],
      value3: newQuestionAnswerArray[2],
      proposedAnswer: newQuestionAnswerArray[3]
    }));
  };

  playGame = event => {
    const newGameQASet = this.generateQuestions();
    this.updateState(newGameQASet);
    const answerWasCorrect = this.evaluateAnswer(event.target.name);
    this.props.handleAnswer(answerWasCorrect);
  };

  evaluateAnswer(givenAnswer) {
    const { value1, value2, value3, proposedAnswer } = this.state;
    const corrAnswer = value1 + value2 + value3;

    return (
      (corrAnswer === proposedAnswer && givenAnswer === 'true') ||
      (corrAnswer !== proposedAnswer && givenAnswer === 'false')
    );
  };

  render(){
   const { value1, value2, value3, proposedAnswer } = this.state;
   return (
    <div>
      <div className="equation">
       <p className="text">{`${value1} + ${value2} + ${value3} = ${proposedAnswer}`}</p>
      </div>
      <button onClick={this.playGame} name="true">True</button>
      <button onClick={this.playGame} name="false">False</button>  
	</div>
   )
  };
}          

export default Game;

