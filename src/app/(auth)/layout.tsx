import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <nav className="flex p-2 bg-blue-500">
        <Button>Home</Button>
        <Button>Settings</Button>
      </nav>
      {children}
    </div>
  );
};

export default AuthLayout;
