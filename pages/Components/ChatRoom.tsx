import { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { formatRelative } from "date-fns";
import firestore, { collection, addDoc, getDocs, serverTimestamp, limit, orderBy, query } from "firebase/firestore";
import { async } from "@firebase/util";

export default function ChatRoom(props: any) {

    const db = props.db;
    const { uid, displayName, photoURL } = props.user;

    const dummySpace = useRef() as any;

    const [newMessage, setNewMessage] = useState("");
    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();

            // db.collection("messages").add({
            //     text: newMessage,
            //     createdAt: db.FieldValue.serverTimestamp(),
            //     uid,
            //     displayName,
            //     photoURL,
            // });
            const doc = await addDoc(collection(db, "messages"), {
                text: newMessage,
                createdAt: serverTimestamp(),
                uid,
                displayName,
                photoURL,
            });

            // scroll down the chat
            dummySpace.current.scrollIntoView({ behavor: "smooth" });
        } catch (error) {
            console.log(error)
        }

    };

    const [messages, setMessages] = useState([]);

    const fetchMessage = async () => {
        let data = []
        try {
            const messageRef = collection(db, "messages");
            const qs = query(messageRef, orderBy("createdAt"), limit(100)) as any;
            const querySnapshot = await getDocs(qs) as any;
            data = querySnapshot.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
        } catch (error) {
            console.log(error);
        } finally {
            console.log(data);
            return data;
        }
    }

    useEffect(() => {
        fetchMessage().then((data: any) => {
            setMessages(data);
        })
    }, [db]);
    return (
        <main id="chat_room">
            <section ref={dummySpace}></section>
            <ul>
                {messages.map((message: any) => (
                    <li key={message.id} className={message.uid === uid ? "sent" : "received"}>
                        <section>
                            {/* display user image */}
                            {message.photoURL ? (
                                <img
                                    src={message.photoURL}
                                    alt="Avatar"
                                    width={45}
                                    height={45}
                                />
                            ) : null}
                        </section>

                        <section>
                            {/* display message text */}
                            <p>{message.text}</p>

                            {/* display user name */}
                            {message.displayName ? <span>{message.displayName}</span> : null}
                            <br />
                            {/* display message date and time */}
                            {message.createdAt?.seconds ? (
                                <span>
                                    {formatRelative(
                                        new Date(message.createdAt.seconds * 1000),
                                        new Date()
                                    )}
                                </span>
                            ) : null}
                        </section>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button type="submit" disabled={!newMessage}>
                    Send
                </button>
            </form>

        </main>
    );
}