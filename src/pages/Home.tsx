import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
/* Image import  */
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
/* style Import */
import "../styles/auth.scss";
/* Components Import  */
import { Button } from "../components/Button";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') {
        return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
        alert("Room does not exist.")
        return;
    }

    const closingDate = (roomRef.val().closedAt)
    if (closingDate) {
      let stringClosingDate = closingDate.toString();
      var yearArray = stringClosingDate.match(/(\d{4})/g);
      var monthArray = stringClosingDate.match(/(?<=-)(\d{2})(?=-)/g);
      var dayArray = stringClosingDate.match(/(?<=-)(\d{2})(?=T)/g);
      alert(`Room already closed at ${dayArray[0]}/${monthArray[0]}/${yearArray[0]}`)
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Illustration showing questions and answers"
        />
        <strong>Create your own Q&amp;A room LIVE.</strong>
        <p>Answer your audience questions real-time.</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk Logo" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Google Logo" />
            Create your room with Google
          </button>
          <div className="separator">or enter a room</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Type a room code"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Enter Room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
