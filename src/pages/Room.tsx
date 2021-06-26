import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";

export function Room() {
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeAsk Logo" />
          {/* <div>codigo</div> */}
          <RoomCode/>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 questions</span>
        </div>

        <form>
          <textarea placeholder="What do you want to ask?" />
          <div className="form-footer">
            <span>
              <button>Login</button> to send a question.
            </span>
            <Button type="submit">Send Question</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
