import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

export function RoomCode() {
  return (
    <button className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Room -Md5OmR-iiJP4W55W6RT</span>
    </button>
  )
}
