
import { useNavigate } from "react-router-dom";

export function useNavigation() {
  const navigate = useNavigate();

  const goToNewProspect = () => {
    navigate("/prospectos/nuevo");
  };

  const goToNotifications = () => {
    navigate("/notificaciones");
  };

  const goToProspects = (filter?: string) => {
    navigate("/prospectos", filter ? { state: { filter } } : undefined);
  };

  const goToCalendar = () => {
    navigate("/calendario");
  };

  return {
    goToNewProspect,
    goToNotifications,
    goToProspects,
    goToCalendar
  };
}
