import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { fetchQuestionsThunk } from '../store/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: '',
      answerOptions: [],
      questionNumber: 0,
      time: 30,
      score: 0,
      correctAnswers: '',
      incorrectsAnswers: '',
      isAnswered: false,
    };
  }

  componentDidMount() {
    const { fetchQuestions, questionsData } = this.props;
    fetchQuestions();
    if (questionsData) { this.shuffleArray(); }
    this.setBtnTimer();
  }

  nextClick = () => {
    const finished = 4;
    const { history } = this.props;
    const { questionNumber, score } = this.state;

    if (questionNumber === finished) {
      history.push('/feedback');
    } else {
      this.setState({
        answered: '',
        correctAnswers: '',
        incorrectsAnswers: '',
        isAnswered: false,
        questionNumber: questionNumber + 1,
      }, () => this.shuffleArray());
    }

    this.setBtnTimer();
  };

  selectAnswer = ({ target }) => {
    this.setState({
      answered: target.value,
      correctAnswers: '3px solid rgb(6, 240, 15)',
      incorrectsAnswers: '3px solid rgb(255, 0, 0)',
    });
  };

  setBtnTimer = () => {
    const time = 30000;
    setTimeout(() => {
      this.setState({ isAnswered: true });
    }, time);
  }

  shuffleArray = () => {
    const randomNumber = 0.5;
    const { questionsData } = this.props;
    const { questionNumber } = this.state;
    const answers = [
      ...questionsData[questionNumber].incorrect_answers,
      questionsData[questionNumber].correct_answer,
    ];

    if (questionsData[questionNumber].type === 'multiple') {
      // Conseguimos a lógica de embaralhar as respostar nesse link:
      // https://stackoverflow.com/questions/52497270/how-do-i-randomly-shuffle-an-array-containing-strings-of-names
      const answerOptions = answers.sort(() => randomNumber - Math.random());
      this.setState({ answerOptions });
    } else {
      this.setState({ answerOptions: [answers[0], answers[1]] });
    }
  };

  render() {
    const { questionsData } = this.props;
    const {
      answered,
      answerOptions,
      correctAnswers,
      incorrectsAnswers,
      isAnswered,
      questionNumber,
    } = this.state;

    return (
      <div>
        <Header />

        {
          questionsData && (
            <GameCard
              answerOptions={ answerOptions }
              correctAnswers={ correctAnswers }
              incorrectsAnswers={ incorrectsAnswers }
              isAnswered={ isAnswered }
              questionData={ questionsData[questionNumber] }
              selectAnswer={ this.selectAnswer }
              shuffleArray={ this.shuffleArray }
            />
          )
        }

        {
          answered !== '' || isAnswered === true
            ? (
              <button
                data-testid="btn-next"
                onClick={ this.nextClick }
                type="button"
              >
                Next
              </button>
            )
            : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsData: state.gameReducer.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestionsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  history: PropType.shape().isRequired,
  fetchQuestions: PropType.func.isRequired,
  questionsData: PropType.arrayOf(Object).isRequired,
};
