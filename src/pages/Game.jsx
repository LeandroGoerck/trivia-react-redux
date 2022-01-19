import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { fetchQuestionsThunk, updateScore } from '../store/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: '',
      answerOptions: [],
      questionNumber: 0,
      time: 30,
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

    // const { time } = this.state;
    // setInterval(() => { this.setState(() => ({ time: time - 1 })); }, oneSecond);
  }

  nextClick = () => {
    const finished = 4;
    const { history, score } = this.props;
    const { questionNumber } = this.state;

    if (questionNumber === finished) {
      history.push('/feedback');
    } else {
      this.setState({
        answered: '',
        correctAnswers: '',
        incorrectsAnswers: '',
        isAnswered: false,
        questionNumber: questionNumber + 1,
        time: 30,
      }, () => this.shuffleArray());
    }
    localStorage.setItem('score', JSON.stringify(score));
    this.setBtnTimer();
  };

  selectAnswer = ({ target }) => {
    this.setState({
      answered: target.value,
      correctAnswers: '3px solid rgb(6, 240, 15)',
      incorrectsAnswers: '3px solid rgb(255, 0, 0)',
      isAnswered: true,
    });
    const { questionNumber, time } = this.state;
    const { questionsData, updtScore, score } = this.props;
    const { difficulty } = questionsData[questionNumber];
    console.log(difficulty);
    const TEN = 10;
    const scoreValue = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    // let score = 0;
    if (target.value === questionsData[questionNumber].correct_answer) {
      updtScore(score + TEN + (time * scoreValue[difficulty]));
      // this.setState({ score: score + TEN + (time * scoreValue[difficulty]) }, () => updtScore(this.state.score));
    }
    localStorage.setItem('score', JSON.stringify(score));
  };

  setBtnTimer = () => {
    const oneSecond = 1000;
    const { answered } = this.state;
    const timeCowntdown = setInterval(() => {
      const { time } = this.state;
      if (time >= 1
        && answered === '') {
        this.setState({
          time: time - 1,
        });
        console.log(time);
      }
      if (time === 0) {
        this.setState({ isAnswered: true });
      }
    }, oneSecond);
    if (answered !== '') {
      clearInterval(timeCowntdown);
    }
  };

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
    const { questionsData, score } = this.props;
    const {
      answered,
      answerOptions,
      correctAnswers,
      incorrectsAnswers,
      isAnswered,
      questionNumber,
      time,
      // score,
    } = this.state;

    return (
      <div>
        <Header score={ score } />
        <span>
          {'Tempo: '}
          {time}
        </span>
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
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestionsThunk()),
  updtScore: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  history: PropType.shape().isRequired,
  fetchQuestions: PropType.func.isRequired,
  questionsData: PropType.arrayOf(Object).isRequired,
  updtScore: PropType.func.isRequired,
  score: PropType.number.isRequired,
};
