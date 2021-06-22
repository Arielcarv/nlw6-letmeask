import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
/* Image import  */
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
/* style Import */
import '../styles/auth.scss';
/* Components Import  */
import {Button} from '../components/Button';

export function Home() {
    const history = useHistory();
    const { user,  signInWithGoogle } = useAuth();
    
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    }

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
                    <button className="create-room" onClick={handleCreateRoom} >
                        <img src={googleIconImg} alt="Google Logo" />
                        Create your room with Google
                    </button>
                    <div className="separator">or enter a room</div>
                    <form action="">
                        <input
                            type="text"
                            placeholder="Type a room code"
                        />
                        <Button type="submit">
                            Enter Room
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}