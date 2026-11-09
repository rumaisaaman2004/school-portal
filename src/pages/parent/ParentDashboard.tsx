import { Badge, Card, CardBody, CardHeader } from '@/components/ui';
import { PageHeader } from '@/layouts/PageHeader';
import { StatGrid, type Stat } from '../shared/StatCard';

const stats: Stat[] = [
  { label: 'Linked children', value: '2' },
  { label: 'Avg. attendance', value: '94%', trend: { text: '-1%', tone: 'warning' } },
  { label: 'Outstanding fees', value: 'Rs 12,500', trend: { text: 'Due Nov 15', tone: 'danger' } },
  { label: 'Unread messages', value: '4', trend: { text: 'New', tone: 'info' } },
];

const children = [
  { name: 'Ali Khan', grade: 'Grade 10', status: 'Present today', tone: 'success' as const },
  { name: 'Hina Khan', grade: 'Grade 6', status: 'Absent today', tone: 'danger' as const },
];

export default function ParentDashboard() {
  return (
    <>
      <PageHeader title="Hello, Sara" description="Keep track of your children's progress." />
      <div className="space-y-6">
        <StatGrid stats={stats} />
        <Card>
          <CardHeader title="Your children" description="Placeholder data" />
          <CardBody>
            <ul className="divide-y divide-neutral-100">
              {children.map((c) => (
                <li key={c.name} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-medium text-neutral-900">{c.name}</p>
                    <p className="text-sm text-neutral-500">{c.grade}</p>
                  </div>
                  <Badge tone={c.tone} dot>
                    {c.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
