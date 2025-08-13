import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Button className="bg-blue-500 text-white hover:bg-blue-600">
        Get Started
      </Button>
    </div>
  );
}
