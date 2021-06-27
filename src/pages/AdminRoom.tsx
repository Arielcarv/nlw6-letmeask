import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import { useParams } from "react-router";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import "../styles/room.scss";
import { database } from "../services/firebase";
import { useHistory } from "react-router-dom";

type RoomParameters = {
	id: string;
};

export function AdminRoom() {
	// const { user } = useAuth();
  const history = useHistory();
	const roomParameters = useParams<RoomParameters>();
	const roomId = roomParameters.id;
	const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({ 
      closedAt: new Date('2015-03-04T00:00:00.000Z'),
    })
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="LetMeAsk Logo" />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom} >Close Room</Button>
					</div>
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>Room {title}</h1>
					{questions.length > 0 && <span>{questions.length} question(s)</span>}
				</div>

				<div className="question-list">
					{questions.map((question) => {
						return (
							<Question
								key={question.id}
								content={question.content}
								author={question.author}
							>
								<button
									type="button"
									onClick={() => handleDeleteQuestion(question.id)}
								>
									<img src={deleteImg} alt="Remove Question" />
								</button>
							</Question>
						);
					})}
				</div>
			</main>
		</div>
	);
}
