import PrimaryAppBar from "components/AppBar"
import SideBar from "components/SideBar";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { auth, db, provider, signInWithPopup } from "src/firebase/firebaseConfigs";
import Conversation from "components/Conversation";
import { useRouter } from "next/router";


const StyledContainer = styled.div`
	height: 100vh;
	display: grid;
	place-items: center;
	background-color: whitesmoke;
`
const StyledLoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 100px;
	background-color: white;
	border-radius: 5px;
	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`
const signInWithGoogle = async () => {
    // const provider = new auth.GoogleAuthProvider();
    auth.useDeviceLanguage();

    try {
        const { user } = await signInWithPopup(auth, provider);

        return { uid: user.uid, displayName: user.displayName };
    } catch (error) {
        console.log(error);
    }
};

const signOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.log(error);
    }
};

export default function Home() {
    const [user, setUser] = useState(() => auth.currentUser);
    const router = useRouter();

    if (user) {
        router.push('/messenger')
    }
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);
    return (
        <div className="container">

            <div className="container">
                {user ? (
                    <>
                        <nav id="sign_out">

                            <button onClick={signOut}>Sign Out</button>
                        </nav>
                    </>
                ) : (
                    <StyledContainer>
                        <StyledLoginContainer>
                            <section id="sign_in">
                                <h1>Welcome to Chat Room</h1>
                                <button onClick={signInWithGoogle}>Sign In With Google</button>
                            </section>
                        </StyledLoginContainer>
                    </StyledContainer>
                )}
            </div>
        </div>
    )
}





