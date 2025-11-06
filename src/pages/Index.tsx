import { FeedbackMatrix } from "@/components/FeedbackMatrix";

interface IndexProps {
  is360View: boolean;
}

const Index = ({ is360View }: IndexProps) => {
  return <FeedbackMatrix is360View={is360View} />;
};

export default Index;
