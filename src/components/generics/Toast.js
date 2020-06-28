import { toast } from "react-semantic-toasts";
export const showToast = (messageType, msg) => {
  toast({
    type: messageType,
    icon: "gamepad",
    title: "Pokedex",
    description: msg,
    animation: "bounce",
    time: 5000,
  });
};
