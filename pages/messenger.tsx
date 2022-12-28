import { useEffect, useState } from "react";
import { auth, provider, signInWithPopup } from "src/firebase/firebaseConfigs";

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

    const fname = 'abc'
    const lname = 'fff'
    const name = ''
    const fullname = `Xin chào ${user?.displayName ? user?.displayName : ""}!`//interpolation + short hand if else
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
            {fullname}
            {user ? (
                <>
                    <nav id="sign_out">
                        <h2>Chat With Friends</h2>
                        <button onClick={signOut}>Sign Out</button>
                    </nav>
                </>
            ) : (
                <section id="sign_in">
                    <h1>Welcome to Chat Room</h1>
                    <button onClick={signInWithGoogle}>Sign In With Google</button>
                </section>
            )}
        </div>
    );
}