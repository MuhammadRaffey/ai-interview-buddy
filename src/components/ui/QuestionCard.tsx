import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Card from "./Card";

interface QuestionCardProps {
  question: string;
  index: number;
  onClick: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card hover variant="default">
        <div className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {index + 1}
            </span>
            <p className="text-gray-200 flex-1 leading-relaxed">{question}</p>
          </div>
          <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="flex-shrink-0 text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-400/10"
            aria-label="View Answer"
          >
            <ArrowRight size={24} />
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;
