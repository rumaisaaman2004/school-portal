import { Badge, Button, Card, CardBody, CardHeader, Table, type TableColumn } from '@/components/ui';
import { PageHeader } from '@/layouts/PageHeader';
import { StatGrid, type Stat } from '../shared/StatCard';

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: 'Student' | 'Parent' | 'Teacher';
  active: boolean;
}

const stats: Stat[] = [
  { label: 'Students', value: '1,248', trend: { text: '+32', tone: 'success' } },
  { label: 'Parents', value: '986' },
  { label: 'Teachers', value: '74' },
  { label: 'Fee collection', value: '82%', trend: { text: 'On track', tone: 'info' } },
];

const users: UserRow[] = [
  { id: 1, name: 'Ali Khan', email: 'ali@example.com', role: 'Student', active: true },
  { id: 2, name: 'Sara Khan', email: 'sara@example.com', role: 'Parent', active: true },
  { id: 3, name: 'Imran Shah', email: 'imran@example.com', role: 'Teacher', active: false },
];

const columns: TableColumn<UserRow>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', render: (u) => <Badge tone="primary">{u.role}</Badge> },
  {
    key: 'active',
    header: 'Status',
    render: (u) => (
      <Badge tone={u.active ? 'success' : 'neutral'} dot>
        {u.active ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
];

export default function AdminDashboard() {
  return (
    <>
      <PageHeader
        title="Admin dashboard"
        description="School-wide overview."
        actions={<Button>Add user</Button>}
      />
      <div className="space-y-6">
        <StatGrid stats={stats} />
        <Card>
          <CardHeader title="Recent users" description="Placeholder data" />
          <CardBody className="p-0">
            <Table columns={columns} data={users} rowKey={(u) => u.id} className="rounded-none border-0" />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
