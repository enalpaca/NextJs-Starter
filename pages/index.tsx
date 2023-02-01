import styles from "../styles/Home.module.css";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <span>With default Theme:</span>
      </div>
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Switch {...label} disabled defaultChecked />
    </div>
  );
}
import { Timestamp } from 'firebase/firestore'

export interface Conversation {
  users: string[]
}

export interface AppUser {
  email: string
  lastSeen: Timestamp
  photoURL: string
}

export interface IMessage {
  id: string
  conversation_id: string
  text: string
  sent_at: string
  user: string
}