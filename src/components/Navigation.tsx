import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/firebase/BaseConfig";
import { useEffect, useState } from "react";

const Navigation = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/*Logo*/}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
                <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Warima
                </span>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#assets" className="text-foreground hover:text-primary transition-colors">
                  Assets
                </a>
                <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
                <a href="#governance" className="text-foreground hover:text-primary transition-colors">
                  Governance
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <span className="hidden sm:inline">Welcome, {user.displayName}</span>
                    <Avatar>
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <>
                    <Button variant="ghost" className="hidden sm:inline-flex">
                      Connect Wallet
                    </Button>
                    <Button 
                      variant="default"
                      onClick={handleLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Join Warima"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
    </nav>
  );
};

export default Navigation;
