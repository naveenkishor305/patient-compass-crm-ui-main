
import { useUser } from "@/contexts/UserContext";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import { useFadeInAnimation } from "@/hooks/useFadeInAnimation";

const Dashboard = () => {
  const { currentUser } = useUser();
  const isLoaded = useFadeInAnimation();
  
  return (
    <div className={`space-y-6 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <div className="glass-effect p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold tracking-tight animate-fade-in bg-gradient-primary text-transparent bg-clip-text">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {currentUser.name}</p>
      </div>
      <div className="animate-fade-in frost-panel p-4">
        <DashboardSelector currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Dashboard;
