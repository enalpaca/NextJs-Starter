import { useEffect, useRef, useState } from "react";
import { formatRelative } from "date-fns";
import { collection, addDoc, getDocs, serverTimestamp, limit, orderBy, query, onSnapshot } from "firebase/firestore";


export default function ChatRoom(props: any) {

    const db = props.db;
    const { uid, displayName, photoURL } = props.user;

    const dummySpace = useRef() as any;

    const [newMessage, setNewMessage] = useState("");

    function getMessages(callback) {
        return onSnapshot(
            query(
                collection(db, "messages"),
                orderBy("createdAt", "desc"),
                limit(10)
            ),
            (querySnapshot) => {
                const messages = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                callback(messages.reverse());
                scrollToBottom();
            }
        );
    }

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();

            const doc = await addDoc(collection(db, "messages"), {
                text: newMessage,
                createdAt: serverTimestamp(),
                uid,
                displayName,
                photoURL,
            });
            setNewMessage('')
            // scroll down the chat

        } catch (error) {
            console.log(error)
        }

    };


    const endOfMessagesRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = getMessages(setMessages);
        return unsubscribe;
    }, []);


    return (
        <main id="chat_room">
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

                        <section >
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
                            <div style={{ marginBottom: "30px" }} ref={endOfMessagesRef}> </div>
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

function limitToLast(arg0: number): import("@firebase/firestore").QueryConstraint {
    throw new Error("Function not implemented.");
}
function limitToFirst(arg0: number): import("@firebase/firestore").QueryConstraint {
    throw new Error("Function not implemented.");
}

