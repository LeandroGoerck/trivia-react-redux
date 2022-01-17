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
      answer: '',
    };
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
    console.log(fetchQuestions.token);
  }

  nextClick = () => {
    const { index } = this.state;
    const { history } = this.props;
    const MAX_INDEX = 4;
    if (index === MAX_INDEX) {
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({ index: prevState.index + 1 }));
    }
    this.setState({ answer: '' });
  }

  answerClick = ({ target }) => {
    this.setState({ answer: target.value });
  }

  render() {
    const { questionsData } = this.props;
    const { index, answer } = this.state;
    console.log(questionsData);
    return (
      <div>
        <Header />
        {questionsData && <GameCard
          data={ questionsData[index] }
          answerClick={ this.answerClick }
        />}
        {answer && (
          <button
            type="submit"
            onClick={ this.nextClick }
            data-testid="btn-next"
          >
            Next
          </button>
        )}

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
