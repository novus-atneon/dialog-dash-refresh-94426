import { useState } from "react";
import { Star } from "lucide-react";

interface RatingCellProps {
  competencyId: string;
  employeeId: string;
}

export const RatingCell = ({ competencyId, employeeId }: RatingCellProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  // Mock initial ratings for demo (only for employee 1, competencies 1-4)
  const initialRating =
    employeeId === "1" && parseInt(competencyId) <= 4 ? 4 : 0;
  const displayRating = rating || initialRating;

  const handleStarClick = (star: number, isHalf: boolean) => {
    const newRating = isHalf ? star - 0.5 : star;
    setRating(newRating);
  };

  const handleMouseEnter = (star: number, isLeftHalf: boolean) => {
    const hoverValue = isLeftHalf ? star - 0.5 : star;
    setHover(hoverValue);
  };

  return (
    <div className="w-48 p-4 border-l flex items-center justify-center">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const currentRating = hover || displayRating;
          const isFullyFilled = star <= currentRating;
          const isHalfFilled = star - 0.5 === currentRating;
          
          return (
            <button
              key={star}
              className="relative transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded"
              onMouseLeave={() => setHover(0)}
            >
              <Star
                className={`w-5 h-5 transition-colors ${
                  isFullyFilled
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
              {isHalfFilled && (
                <Star
                  className="w-5 h-5 transition-colors fill-yellow-400 text-yellow-400 absolute top-0 left-0"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                />
              )}
              <div className="absolute inset-0 flex">
                <div 
                  className="w-1/2 h-full cursor-pointer" 
                  onMouseEnter={() => handleMouseEnter(star, true)}
                  onClick={() => handleStarClick(star, true)}
                />
                <div 
                  className="w-1/2 h-full cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(star, false)}
                  onClick={() => handleStarClick(star, false)}
                />
              </div>
            </button>
          );
        })}
      </div>
      {displayRating > 0 && (
        <span className="ml-2 text-sm font-semibold text-muted-foreground">
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
