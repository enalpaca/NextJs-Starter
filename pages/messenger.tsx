import PrimaryAppBar from "components/AppBar"
import SideBar from "components/SideBar";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { auth, db, provider, signInWithPopup } from "src/firebase/firebaseConfigs";
import Conversation from "components/Conversation";
import Grid from '@mui/material/Grid';

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
        <div>
            <PrimaryAppBar></PrimaryAppBar>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                <Grid item xs={3}>
                    <SideBar></SideBar>
                </Grid>
                <Grid item xs={9}>
                    dsfsdf
                </Grid>
            </Grid>
        </div>


        // <div className="container">
        //     <div className="container">
        //         <PrimaryAppBar></PrimaryAppBar>
        //     </div>
        //     <div className="container">
        //         {fullname}
        //         {user ? (
        //             <>
        //                 <nav id="sign_out">
        //                     <h2>Chat With Friends</h2>
        //                     <button onClick={signOut}>Sign Out</button>
        //                 </nav>
        //             </>
        //         ) : (
        //             <StyledContainer>
        //                 <StyledLoginContainer>
        //                     <section id="sign_in">
        //                         <h1>Welcome to Chat Room</h1>
        //                         <button onClick={signInWithGoogle}>Sign In With Google</button>
        //                     </section>
        //                 </StyledLoginContainer>
        //             </StyledContainer>
        //         )}
        //         {user ? (
        //             <Conversation db={db} user={user} name={"Erick"}>
        //             </Conversation>
        //         ) :
        //             (
        //                 <div></div>
        //             )}
        //     </div>

        // </div>
    );
} 