import PlusIcon from "@/assets/PlusIcon.svg?react";
import DotsThreeCircle from "@/assets/DotsThreeCircle.svg?react";

export const ActionsRenderer = () => (
  <div className="h-8 w-32 inline-flex justify-center items-center gap-8">
    <div className="w-12 h-7 p-1 bg-blue-700 rounded-3xl flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative overflow-hidden">
        <PlusIcon className="h-6 w-6" />
      </div>
    </div>
    <div className="w-8 h-8 relative overflow-hidden">
      <DotsThreeCircle className="h-8 w-8" />
    </div>
  </div>
);
