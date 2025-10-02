import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "gradient";
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "glass",
  hover = false,
}) => {
  const variantClasses = {
    default: "bg-gray-800 border border-gray-700",
    glass: "bg-gray-800/60 backdrop-blur-lg border border-gray-700/50",
    gradient:
      "bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={
        hover ? { y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" } : {}
      }
      className={`rounded-2xl shadow-2xl ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
