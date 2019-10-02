import React, { Component } from 'react';
import styled from 'styled-components';
import questions from './utils/questions';
import houses from './utils/houses';

const Div = styled.div`
  background-image: url('img/scroll2.png');
  background-repeat: no-repeat;
  background-size: 900px 700px;
  background-position: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;

  .title {
    margin-top: -50px;
    font-size: 56px;
  }

  img {
    width: 130px;
    height: 130px;
    transition: transform 0.3s;

    &:hover {
      cursor: pointer;
      transform: scale(1.07);
    }
  }

  .question {
    margin-top: -25px;
    margin-bottom: 30px;
    font-size: 60px;
    max-width: 600px;
  }

  .option {
    font-size: 40px;
    margin: 10px 0;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  }

  .result {
    font-size: 60px;
  }
`;

class App extends Component {
  state = {
    answers: [],
    questions: [...questions],
    currentQuestion: {},
    end: false
  };

  begin = () => {
    this.setState(prev => ({
      currentQuestion: prev.questions.pop()
    }));
  };

  next = e => {
    if (this.state.questions.length) {
      e.persist();
      this.setState(prev => ({
        answers: [
          ...prev.answers,
          Object.keys(prev.currentQuestion.Options).find(
            key => prev.currentQuestion.Options[key] === e.target.innerHTML
          )
        ]
      }));
      this.setState(prev => ({
        currentQuestion: prev.questions.pop()
      }));
    } else {
      this.setState({ end: true, currentQuestion: [] });
    }
  };

  mostOccuring = arr => {
    let counts = arr.reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {});
    let maxCount = Math.max(...Object.values(counts));
    let mostFrequent = Object.keys(counts).filter(k => counts[k] === maxCount);
    return mostFrequent;
  };

  render() {
    return (
      <Div>
        {Object.entries(this.state.questions).length === 6 && (
          <>
            <h1 className="title">Welcome to Hogwarts School of Wizadry</h1>
            <h3>Click on the hat to begin sorting.</h3>
            <img src="img/hat2.png" onClick={this.begin} />
          </>
        )}

        {Object.entries(this.state.currentQuestion).length !== 0 && (
          <>
            <div className="question">
              {this.state.currentQuestion.Question}
            </div>
            {Object.keys(this.state.currentQuestion.Options).map(
              (option, idx) => (
                <>
                  <div className="option" onClick={e => this.next(e)} key={idx}>
                    {this.state.currentQuestion.Options[option]}
                  </div>
                </>
              )
            )}
          </>
        )}

        {this.state.end && (
          <div className="result">
            Congratulations, you are a{' '}
            {this.mostOccuring(this.state.answers)[0]}
            <br />
            <img src={houses[this.mostOccuring(this.state.answers)[0]]} />
          </div>
        )}
      </Div>
    );
  }
}

export default App;
