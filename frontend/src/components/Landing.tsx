import s from '../styles/Landing.module.css';
import GameCard from './GameCard';
import goImage from '../assets/go.svg';
import sudokuImage from '../assets/sudoku.png';

export default function Landing(){
  return (
    <>
    <div className={s.header__actions}> 
      <button>
        Login
      </button>
      <button>
        Sign-up
      </button>
    </div>

    <h1>Hybrid</h1>
    <p>A place to chill and play games</p>

    <h4>Soon to be available games:</h4>

    <div className={s.carousel}>
      <GameCard imgUrl={goImage} text={'Go'}/>
      <GameCard imgUrl={sudokuImage} text={'Sudoku'}/>
    </div>
    </>
  )
}