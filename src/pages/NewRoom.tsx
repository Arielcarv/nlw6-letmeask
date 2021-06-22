import { Link } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
/* Image import  */
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
/* style Import */
import '../styles/auth.scss';
/* Components */
import { Button } from '../components/Button';

export function NewRoom() {
   // const { user } = useAuth();

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Illustration showing questions and answers" />
                <strong>Create your own Q&amp;A room LIVE.</strong>
                <p>Answer your audience questions real-time.</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk Logo" />
                    <h2>Create a New Room</h2>
                    <form action="">
                        <input
                            type="text"
                            placeholder="Room Name"
                        />
                        <Button type="submit">
                            Create Room
                        </Button>
                    </form>
                    <p>
                        Do you want to enter an existing room? <Link to="/">Click Here</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}