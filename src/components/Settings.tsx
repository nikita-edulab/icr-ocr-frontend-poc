import { Save, Upload, Database, Bell, Shield, User } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

export function Settings() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-500">Manage system configuration and preferences</p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* General Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900">General Settings</h3>
              <p className="text-sm text-gray-500">Basic system configuration</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="institution">Institution Name</Label>
              <Input 
                id="institution" 
                type="text" 
                defaultValue="University of Excellence" 
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="archive-path">Archive Base Path</Label>
              <Input 
                id="archive-path" 
                type="text" 
                defaultValue="/university-records" 
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="results-per-page">Results Per Page</Label>
              <Input 
                id="results-per-page" 
                type="number" 
                defaultValue="10" 
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* OCR Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-900">OCR Settings</h3>
              <p className="text-sm text-gray-500">Configure OCR processing</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-process new uploads</Label>
                <p className="text-sm text-gray-500">Automatically run OCR on newly uploaded PDFs</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>High quality mode</Label>
                <p className="text-sm text-gray-500">Use enhanced OCR algorithms (slower)</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div>
              <Label htmlFor="confidence">Minimum Confidence Threshold</Label>
              <Input 
                id="confidence" 
                type="number" 
                defaultValue="85" 
                min="0"
                max="100"
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                OCR results below this confidence will be flagged for review
              </p>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-500">Manage notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email notifications</Label>
                <p className="text-sm text-gray-500">Receive email updates on processing status</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Verification alerts</Label>
                <p className="text-sm text-gray-500">Alert when documents need verification</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Processing complete</Label>
                <p className="text-sm text-gray-500">Notify when OCR processing finishes</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Security</h3>
              <p className="text-sm text-gray-500">Access control and security settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Require authentication</Label>
                <p className="text-sm text-gray-500">Users must log in to access the system</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Enable audit logging</Label>
                <p className="text-sm text-gray-500">Track all user actions and changes</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div>
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input 
                id="session-timeout" 
                type="number" 
                defaultValue="30" 
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">
            Reset to Defaults
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
