import { useBoards } from '../context/BoardContext.jsx';
import './Avatar.css';

export default function Avatar({ memberId, size = 28 }) {
  const { members } = useBoards();
  const member = members.find((item) => item.id === memberId);
  if (!member) return null;

  return (
    <span
      className="avatar"
      title={member.name}
      style={{ width: size, height: size, background: member.color, fontSize: size * 0.38 }}
    >
      {member.initials}
    </span>
  );
}
