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
            }
        );
    }

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
            setNewMessage('')
            // scroll down the chat
            dummySpace.current.scrollIntoView({ behavor: "smooth" });
        } catch (error) {
            console.log(error)
        }

    };


    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Subscribe to query with onSnapshot
        const unsubscribe = getMessages(setMessages);
        return unsubscribe;

        // Detach listener
        // return unsubscribe;
    }, []);

    // const fetchMessage = async () => {
    //     let data = []
    //     try {
    //         const messageRef = collection(db, "messages");
    //         const qs = query(messageRef, orderBy("createdAt", "desc"), limit(10)) as any;
    //         const querySnapshot = await getDocs(qs) as any;
    //         data = querySnapshot.docs.map((doc: any) => ({
    //             ...doc.data(),
    //             id: doc.id,
    //         }));
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         console.log(data);
    //         return data;
    //     }
    // }
    // const showMessages = () => {
    //     // If front-end is loading messages behind the scenes, display messages retrieved from Next SSR (passed down from [id].tsx)
    //     if (messagesLoading) {
    //         return messages.map(message => (
    //             <Message key={message.id} message={message} />
    //         ))
    //     }

    //     // If front-end has finished loading messages, so now we have messagesSnapshot
    //     if (messagesSnapshot) {
    //         return messagesSnapshot.docs.map(message => (
    //             <Message key={message.id} message={transformMessage(message)} />
    //         ))
    //     }

    //     return null
    // }
    // useEffect(() => {
    //     fetchMessage().then((data: any) => {
    //         setMessages(data.reverse());//đảo mảng 
    //     })
    // }, [db]);
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

function limitToLast(arg0: number): import("@firebase/firestore").QueryConstraint {
    throw new Error("Function not implemented.");
}
function limitToFirst(arg0: number): import("@firebase/firestore").QueryConstraint {
    throw new Error("Function not implemented.");
}

