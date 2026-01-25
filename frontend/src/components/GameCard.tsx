import s from '../styles/Landing.module.css';

type GameCardProps = {
  imgUrl: string;
  text: string;
}

export default function GameCard({imgUrl, text}: GameCardProps){

  return (
    <div className={s.gamecard}>
      <img src={imgUrl} alt='game preview'/>
      <div className= {s.gamecard__overlay}>
        <span className={s.gamecard__label}>{text}</span>
      </div>
    </div>
  )
}