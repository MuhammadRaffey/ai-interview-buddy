import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

interface AlertProps {
  type: "success" | "error" | "info" | "warning";
  message: string;
  show: boolean;
}

const Alert: React.FC<AlertProps> = ({ type, message, show }) => {
  const config = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500",
      textColor: "text-green-300",
      iconColor: "text-green-400",
    },
    error: {
      icon: XCircle,
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500",
      textColor: "text-red-300",
      iconColor: "text-red-400",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500",
      textColor: "text-blue-300",
      iconColor: "text-blue-400",
    },
    warning: {
      icon: AlertCircle,
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-300",
      iconColor: "text-yellow-400",
    },
  };

  const {
    icon: Icon,
    bgColor,
    borderColor,
    textColor,
    iconColor,
  } = config[type];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`${bgColor} ${borderColor} border rounded-lg p-4 flex items-center gap-3`}
        >
          <Icon className={iconColor} size={24} />
          <p className={`${textColor} flex-1`}>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
