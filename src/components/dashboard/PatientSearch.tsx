
import { UserPlus } from "lucide-react";

export const PatientSearch = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search patients by name or CRN..."
        className="w-full h-12 pl-10 pr-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <UserPlus className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};
