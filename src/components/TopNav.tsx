import { Bell, User, Search, LogOut } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useKeycloakAuth } from '../contexts/KeycloakContext';

export function TopNav() {
  const {logout, keycloak } = useKeycloakAuth();

  const handleLogout = () => {
    logout();
  };

  // Get user info from token if available
  const userInfo = keycloak?.tokenParsed as { 
    preferred_username?: string;
    email?: string;
    name?: string;
  } | undefined;

  const displayName = userInfo?.name || userInfo?.preferred_username || 'Admin User';
  const displayEmail = userInfo?.email || 'administrator@uni.edu';

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
      {/* Search Bar 
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search PDFs, SLR codes, student names..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>*/}

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/*<Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            3
          </Badge>
        </Button>*/}

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-md">
              <div className="text-right text-sm">
                <div className="text-gray-900">{displayName}</div>
                <div className="text-xs text-gray-500">{displayEmail}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{displayEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer" >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
