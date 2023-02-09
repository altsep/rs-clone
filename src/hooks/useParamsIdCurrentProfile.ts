import { useParams } from 'react-router-dom';
import useUsers from './useUsers';

export default function useParamsIdCurrentProfile() {
  const { id: idCurrentProfileString } = useParams();

  return { idCurrentProfile: Number(idCurrentProfileString) };
}
