
import { useNavigate } from "react-router-dom";

export function useNavigation() {
  const navigate = useNavigate();

  const goToNewProspect = () => {
    navigate("/prospectos/nuevo");
  };

  const goToNotifications = () => {
    navigate("/notificaciones");
  };

  const goToProspects = () => {
    navigate("/prospectos");
  };

  return {
    goToNewProspect,
    goToNotifications,
    goToProspects
  };
}
