import React, { Component } from 'react';
import styled from 'styled-components';

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
`;

class App extends Component {
  render() {
    return (
      <Div>
        <h1 className="title">Welcome to Hogwarts</h1>
        <h3>Click on the hat to begin sorting.</h3>
        <img src="img/hat2.png" />
      </Div>
    );
  }
}

export default App;
