import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Input, Select } from '@/components/ui';
import { areaList, type AreaKey } from '@/config/navigation';

const roleOptions = areaList.map((a) => ({ value: a.key, label: a.label }));

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<AreaKey>('student');
  const [loading, setLoading] = useState(false);

  // No backend yet: simulate sign-in and route to the chosen area.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate(`/${role}`), 600);
  };

  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <h1 className="text-xl font-semibold text-neutral-900">Sign in</h1>
        <p className="mt-1 text-sm text-neutral-500">Welcome back. Choose a role to explore the demo.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input label="Email" type="email" placeholder="you@school.edu" autoComplete="email" required />
          <Input label="Password" type="password" placeholder="••••••••" autoComplete="current-password" required />
          <Select
            label="Sign in as"
            options={roleOptions}
            value={role}
            onChange={(e) => setRole(e.target.value as AreaKey)}
          />
          <Button type="submit" fullWidth loading={loading}>
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          New here?{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700">
            Create an account
          </Link>
        </p>
        <p className="mt-2 text-center text-sm">
          <Link to="/demo" className="font-medium text-neutral-500 hover:text-neutral-700">
            View component demo →
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
