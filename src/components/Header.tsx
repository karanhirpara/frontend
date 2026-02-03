import { Search, MapPin, Heart, ClipboardList, Plus, User, ChevronDown, LogIn, LogOut, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useUser } from '@/contexts/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const { isAdmin, toggleAdmin, userEmail, isLoggedIn, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname === '/admin';

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          <span>eventbrite</span>
        </button>

        {/* Search Bar */}
      

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {/* Only show Create Event for admins */}
          {isAdmin && (
            <Button 
              variant="ghost" 
              className="hidden sm:flex items-center gap-2"
              onClick={() => navigate('/admin')}
            >
              <Plus className="h-4 w-4" />
              Create an event
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Heart className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:flex"
            onClick={() => navigate('/my-registrations')}
          >
            <ClipboardList className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                {isLoggedIn && (
                  <span className="hidden lg:inline text-sm max-w-[150px] truncate">
                    {userEmail}
                  </span>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {!isLoggedIn ? (
                <>
                  <DropdownMenuItem onClick={() => navigate('/auth')}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/auth')}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  {/* Admin Toggle */}
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={() => navigate('/')}>
                    Browse events
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      Manage my events
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>Get Help</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/my-registrations')}>
                    <ClipboardList className="mr-2 h-4 w-4" />
                    My Registrations
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    Liked
                  </DropdownMenuItem>
                  <DropdownMenuItem>Following</DropdownMenuItem>
                  <DropdownMenuItem>Interests</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
