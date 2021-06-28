import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
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
			closedAt: new Date(),
		});
		history.push("/");
	}

	async function handleDeleteQuestion(questionId: string) {
		if (window.confirm("Are you sure you want to delete this question?")) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
	}

	async function handleCheckQuestionAsAnswered(
		questionId: string,
		isAnswered: boolean
	) {
		if (isAnswered) {
			await database.ref(`rooms/${roomId}/questions/${questionId}/`).update({
				isAnswered: false,
			});
		} else {
			await database.ref(`rooms/${roomId}/questions/${questionId}/`).update({
				isAnswered: true,
			});
		}
	}

	async function handleHighlightQuestion(
		questionId: string,
		isHighlighted: boolean
	) {
		if (isHighlighted) {
			await database.ref(`rooms/${roomId}/questions/${questionId}/`).update({
				isHighlighted: false,
			});
		} else {
			await database.ref(`rooms/${roomId}/questions/${questionId}/`).update({
				isHighlighted: true,
			});
		}
	}

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="LetMeAsk Logo" />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							Close Room
						</Button>
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
								isAnswered={question.isAnswered}
								isHighlighted={question.isHighlighted}
							>
								{/* Children BEGIN */}
								<button
									type="button"
									onClick={() =>
										handleCheckQuestionAsAnswered(
											question.id,
											question.isAnswered
										)
									}
								>
									<img src={checkImg} alt="Check Question as answered" />
								</button>
								<button
									type="button"
									onClick={() =>
										handleHighlightQuestion(question.id, question.isHighlighted)
									}
								>
									<img src={answerImg} alt="Highlight Question" />
								</button>
								<button
									type="button"
									onClick={() => handleDeleteQuestion(question.id)}
								>
									<img src={deleteImg} alt="Remove Question" />
								</button>
								{/* Children END */}
							</Question>
						);
					})}
				</div>
			</main>
		</div>
	);
}
