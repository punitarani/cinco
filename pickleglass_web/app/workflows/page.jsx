import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Workflow, Play, Settings, Archive } from 'lucide-react';

const mockWorkflows = [
  {
    id: 1,
    name: 'New Patient Intake',
    description: 'Automated workflow for processing new patient registrations',
    status: 'active',
    lastRun: '2024-01-15T10:30:00Z',
    runs: 42,
  },
  {
    id: 2,
    name: 'Claims Processing',
    description: 'Automated claims validation and submission workflow',
    status: 'active',
    lastRun: '2024-01-15T09:15:00Z',
    runs: 128,
  },
  {
    id: 3,
    name: 'Insurance Verification',
    description: 'Daily insurance eligibility verification for scheduled patients',
    status: 'paused',
    lastRun: '2024-01-10T08:00:00Z',
    runs: 67,
  },
  {
    id: 4,
    name: 'Appointment Reminders',
    description: 'Automated SMS and email reminders for upcoming appointments',
    status: 'active',
    lastRun: '2024-01-15T07:30:00Z',
    runs: 234,
  },
];

export default function WorkflowsPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Automate your practice operations</p>
        </div>
        <Button>
          <Workflow className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockWorkflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Workflow className="h-5 w-5" />
                    {workflow.name}
                  </CardTitle>
                  <CardDescription className="mt-2">{workflow.description}</CardDescription>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  workflow.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {workflow.status}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Total Runs</div>
                    <div className="font-medium">{workflow.runs}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Last Run</div>
                    <div className="font-medium">
                      {new Date(workflow.lastRun).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Play className="h-4 w-4 mr-1" />
                    Run
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    <Archive className="h-4 w-4 mr-1" />
                    Archive
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Templates</CardTitle>
          <CardDescription>Start with pre-built workflow templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
              <h3 className="font-medium">Patient Check-in</h3>
              <p className="text-sm text-muted-foreground mt-1">Automate patient arrival and check-in process</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
              <h3 className="font-medium">Prior Authorization</h3>
              <p className="text-sm text-muted-foreground mt-1">Streamline prior authorization requests</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
              <h3 className="font-medium">Lab Results</h3>
              <p className="text-sm text-muted-foreground mt-1">Process and notify patients of lab results</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
