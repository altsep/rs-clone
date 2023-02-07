import { useParams } from 'react-router-dom';

export default function useParamsIdCurrentProfile() {
  const { id: idCurrentProfileString } = useParams();

  return { idCurrentProfile: Number(idCurrentProfileString) };
}
