import { Badge, Card, CardBody, CardHeader, Table, type TableColumn } from '@/components/ui';
import { PageHeader } from '@/layouts/PageHeader';
import { StatGrid, type Stat } from '../shared/StatCard';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  due: string;
  status: 'Pending' | 'Submitted' | 'Late';
}

const stats: Stat[] = [
  { label: 'Attendance', value: '96%', trend: { text: '+2%', tone: 'success' } },
  { label: 'Average grade', value: 'A-' },
  { label: 'Due this week', value: '3', trend: { text: '1 late', tone: 'danger' } },
  { label: 'Courses', value: '7' },
];

const assignments: Assignment[] = [
  { id: 1, title: 'Algebra worksheet 4', subject: 'Mathematics', due: 'Nov 11', status: 'Pending' },
  { id: 2, title: 'Lab report: Osmosis', subject: 'Biology', due: 'Nov 08', status: 'Late' },
  { id: 3, title: 'Essay: Climate change', subject: 'English', due: 'Nov 05', status: 'Submitted' },
];

const statusTone = { Pending: 'warning', Submitted: 'success', Late: 'danger' } as const;

const columns: TableColumn<Assignment>[] = [
  { key: 'title', header: 'Assignment' },
  { key: 'subject', header: 'Subject' },
  { key: 'due', header: 'Due' },
  { key: 'status', header: 'Status', render: (a) => <Badge tone={statusTone[a.status]}>{a.status}</Badge> },
];

export default function StudentDashboard() {
  return (
    <>
      <PageHeader title="Welcome back, Ali" description="Here's what's happening with your studies today." />
      <div className="space-y-6">
        <StatGrid stats={stats} />
        <Card>
          <CardHeader title="Upcoming assignments" description="Placeholder data" />
          <CardBody className="p-0">
            <Table columns={columns} data={assignments} rowKey={(a) => a.id} className="rounded-none border-0" />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
