
import { useState } from "react";
import { BackNavigationHeader } from "@/components/navigation/BackNavigationHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoleGuard } from "@/components/auth/RoleGuard";

export default function SystemSettings() {
  return (
    <RoleGuard allowedRoles="admin" fallback={<div>You do not have permission to access this page.</div>}>
      <div className="p-6">
        <BackNavigationHeader title="System Settings" />
        <div className="mt-6">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure global CRM system settings
          </p>
        </div>

        <Tabs defaultValue="general" className="mt-6">
          <TabsList className="grid grid-cols-4 w-full max-w-lg">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="integration">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <div className="grid gap-6 max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure basic system settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hospitalName">Hospital Name</Label>
                      <Input id="hospitalName" defaultValue="General Hospital" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Default Timezone</Label>
                      <Select defaultValue="utc-5">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                          <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                          <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                          <SelectItem value="utc+5-30">India Standard Time (UTC+5:30)</SelectItem>
                          <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                          <SelectItem value="utc+9">Japan Standard Time (UTC+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Select defaultValue="mm-dd-yyyy">
                        <SelectTrigger id="dateFormat">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                          <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeFormat">Time Format</Label>
                      <Select defaultValue="12h">
                        <SelectTrigger id="timeFormat">
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12 Hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24 Hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="defaultLanguage">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                        <SelectItem value="zh">Chinese (Simplified)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Behavior</CardTitle>
                  <CardDescription>
                    Configure how the system behaves
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Auto-assign Cases</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically assign new cases to available staff
                      </p>
                    </div>
                    <Switch id="auto-assign" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Case Auto-closure</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically close resolved cases after 7 days
                      </p>
                    </div>
                    <Switch id="auto-close" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Patient History</h4>
                      <p className="text-sm text-muted-foreground">
                        Display full patient history to all staff members
                      </p>
                    </div>
                    <Switch id="patient-history" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Enable Audit Logging</h4>
                      <p className="text-sm text-muted-foreground">
                        Log all system actions for audit purposes
                      </p>
                    </div>
                    <Switch id="audit-logging" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end mt-6">
                <Button>Save Changes</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integration" className="mt-6">
            <div className="grid gap-6 max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle>HIS Integration</CardTitle>
                  <CardDescription>
                    Configure Hospital Information System integration settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Enable HIS Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect to Hospital Information System
                      </p>
                    </div>
                    <Switch id="his-integration" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hisEndpoint">HIS API Endpoint</Label>
                    <Input id="hisEndpoint" defaultValue="https://his-api.hospital.com/v1" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hisUsername">API Username</Label>
                      <Input id="hisUsername" defaultValue="crm-service" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hisApiKey">API Key</Label>
                      <Input id="hisApiKey" type="password" value="••••••••••••••••" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="syncFrequency">Data Sync Frequency</Label>
                    <Select defaultValue="15">
                      <SelectTrigger id="syncFrequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Every 5 minutes</SelectItem>
                        <SelectItem value="15">Every 15 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every hour</SelectItem>
                        <SelectItem value="1440">Once daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Chatbot Integration</CardTitle>
                  <CardDescription>
                    Configure chatbot settings for patient interactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Enable Chatbot</h4>
                      <p className="text-sm text-muted-foreground">
                        Allow chatbot to handle basic inquiries
                      </p>
                    </div>
                    <Switch id="enable-chatbot" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chatbotEndpoint">Chatbot API Endpoint</Label>
                    <Input id="chatbotEndpoint" defaultValue="https://chatbot-api.hospital.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chatbotApiKey">API Key</Label>
                    <Input id="chatbotApiKey" type="password" value="••••••••••••••••" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="escalationThreshold">Human Escalation Threshold</Label>
                    <Select defaultValue="3">
                      <SelectTrigger id="escalationThreshold">
                        <SelectValue placeholder="Select threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">After 1 failed response</SelectItem>
                        <SelectItem value="2">After 2 failed responses</SelectItem>
                        <SelectItem value="3">After 3 failed responses</SelectItem>
                        <SelectItem value="4">After 4 failed responses</SelectItem>
                        <SelectItem value="5">After 5 failed responses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end mt-6">
                <Button>Save Integration Settings</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <div className="grid gap-6 max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Gateway</CardTitle>
                  <CardDescription>
                    Configure notification service settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emailService">Email Service</Label>
                    <Select defaultValue="smtp">
                      <SelectTrigger id="emailService">
                        <SelectValue placeholder="Select email service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smtp">SMTP Server</SelectItem>
                        <SelectItem value="sendgrid">SendGrid</SelectItem>
                        <SelectItem value="mailchimp">Mailchimp</SelectItem>
                        <SelectItem value="aws-ses">AWS SES</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">SMTP Server</Label>
                    <Input id="smtpServer" defaultValue="smtp.hospital.com" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpUsername">SMTP Username</Label>
                      <Input id="smtpUsername" defaultValue="notifications@hospital.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <Input id="smtpPassword" type="password" value="••••••••••••••••" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input id="smtpPort" defaultValue="587" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="encryption">Encryption</Label>
                      <Select defaultValue="tls">
                        <SelectTrigger id="encryption">
                          <SelectValue placeholder="Select encryption type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="tls">TLS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>SMS Configuration</CardTitle>
                  <CardDescription>
                    Configure SMS gateway settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smsProvider">SMS Provider</Label>
                    <Select defaultValue="twilio">
                      <SelectTrigger id="smsProvider">
                        <SelectValue placeholder="Select SMS provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="nexmo">Nexmo/Vonage</SelectItem>
                        <SelectItem value="aws-sns">AWS SNS</SelectItem>
                        <SelectItem value="infobip">InfoBip</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twilioAccountSid">Account SID</Label>
                    <Input id="twilioAccountSid" defaultValue="AC5******************************" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twilioAuthToken">Auth Token</Label>
                    <Input id="twilioAuthToken" type="password" value="••••••••••••••••" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twilioFromNumber">From Number</Label>
                    <Input id="twilioFromNumber" defaultValue="+1234567890" />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end mt-6">
                <Button>Save Notification Settings</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="grid gap-6 max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Configure system security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all admin users
                      </p>
                    </div>
                    <Switch id="require-2fa" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordPolicy">Password Policy</Label>
                    <Select defaultValue="strong">
                      <SelectTrigger id="passwordPolicy">
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                        <SelectItem value="medium">Medium (8+ chars, numbers, mixed case)</SelectItem>
                        <SelectItem value="strong">Strong (8+ chars, numbers, mixed case, special chars)</SelectItem>
                        <SelectItem value="custom">Custom Policy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry</Label>
                    <Select defaultValue="90">
                      <SelectTrigger id="passwordExpiry">
                        <SelectValue placeholder="Select expiry period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout</Label>
                    <Select defaultValue="30">
                      <SelectTrigger id="sessionTimeout">
                        <SelectValue placeholder="Select timeout period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                        <SelectItem value="480">8 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Data Privacy</CardTitle>
                  <CardDescription>
                    Configure data privacy and retention settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Data Anonymization</h4>
                      <p className="text-sm text-muted-foreground">
                        Anonymize sensitive data in exports and reports
                      </p>
                    </div>
                    <Switch id="data-anonymization" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataRetention">Data Retention Period</Label>
                    <Select defaultValue="365">
                      <SelectTrigger id="dataRetention">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="730">2 years</SelectItem>
                        <SelectItem value="1825">5 years</SelectItem>
                        <SelectItem value="forever">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">IP Address Logging</h4>
                      <p className="text-sm text-muted-foreground">
                        Log IP addresses for audit purposes
                      </p>
                    </div>
                    <Switch id="ip-logging" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">GDPR Compliance Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable additional features for GDPR compliance
                      </p>
                    </div>
                    <Switch id="gdpr-mode" />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end mt-6">
                <Button>Save Security Settings</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RoleGuard>
  );
}
