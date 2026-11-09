import { Badge, Card, type BadgeTone } from '@/components/ui';

export interface Stat {
  label: string;
  value: string;
  trend?: { text: string; tone: BadgeTone };
}

export function StatCard({ label, value, trend }: Stat) {
  return (
    <Card className="p-5">
      <p className="text-sm text-neutral-500">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-2xl font-semibold text-neutral-900">{value}</p>
        {trend && <Badge tone={trend.tone}>{trend.text}</Badge>}
      </div>
    </Card>
  );
}

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}
