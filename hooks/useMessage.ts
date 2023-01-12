import { collection, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '@src/firebase/firebaseConfigs';
import { AppUser, Conversation } from '../pages'
// import { getRecipientEmail } from '../utils/getRecipientEmail'

export const useMessage = () => {
    const [loggedInUser, _loading, _error] = useAuthState(auth)

    // get recipient email
    // const recipientEmail = getRecipientEmail(conversationUsers, loggedInUser)

    // get recipient avatar
    const queryGetRecipient = query(
        collection(db, 'conversations'),
        where('users', 'array-contains', loggedInUser?.email || '') //ne emty
    )
    const [recipientsSnapshot, __loading, __error] =
        useCollection(queryGetRecipient)

    // recipientSnapshot?.docs could be an empty array, leading to docs[0] being undefined
    // so we have to force "?" after docs[0] because there is no data() on "undefined"
    const conversations = recipientsSnapshot?.docs?.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        }
    })

    return {
        conversations,
        // recipientEmail
    }
}