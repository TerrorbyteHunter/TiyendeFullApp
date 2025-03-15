import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export function SessionTimeout() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const timeout = 30 * 60 * 1000; // 30 minutes

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setOpen(true), timeout);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Timeout</DialogTitle>
        </DialogHeader>
        <p>Your session has expired. Please login again.</p>
        <button onClick={logout}>Logout</button>
      </DialogContent>
    </Dialog>
  );
}