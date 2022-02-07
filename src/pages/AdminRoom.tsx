import { useNavigate, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import '../styles/room.scss';
import deleteImg from '../assets/images/delete.svg';
import { database } from '../services/firebase';

type RoomParams = {
    id: string
}


export function AdminRoom() {

    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);
    const navigator = useNavigate()

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });
        navigator("/");
    }

    async function handleDeleteQuestions(questionId: string) {
        if (window.confirm("Quer deletar essa pergunta mesmo?")) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                </div>

                <div className="questions-list">
                    {questions.map(question => {
                        return (
                            <Question key={question.id}
                                content={question.content}
                                author={question.author}>
                                <button
                                    type='button'
                                    onClick={() => handleDeleteQuestions(question.id)}                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}