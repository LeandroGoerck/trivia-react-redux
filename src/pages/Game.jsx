import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { fetchQuestionsThunk } from '../store/actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    }
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
    console.log(fetchQuestions.token);
  }

  render() {
    const { questionsData } = this.props;
    const { index } = this.state;
    console.log(questionsData);
    return (
      <div>
        <Header />
        {questionsData && <GameCard data={ questionsData[index] } />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsData: state.gameReducer.questions.results,
});

const mapDispatchToProps = (dispatch) => (
  {
    fetchQuestions: () => dispatch(fetchQuestionsThunk()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
