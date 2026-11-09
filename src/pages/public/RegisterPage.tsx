import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Input, Select } from '@/components/ui';
import { areaList, type AreaKey } from '@/config/navigation';
import { useToast } from '@/hooks/useToast';

const roleOptions = areaList.filter((a) => a.key !== 'admin').map((a) => ({ value: a.key, label: a.label }));

export default function RegisterPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<AreaKey | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ tone: 'success', title: 'Account created', description: 'You can now sign in.' });
      navigate('/login');
    }, 600);
  };

  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <h1 className="text-xl font-semibold text-neutral-900">Create an account</h1>
        <p className="mt-1 text-sm text-neutral-500">Join your school's portal in a minute.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="First name" autoComplete="given-name" required />
            <Input label="Last name" autoComplete="family-name" required />
          </div>
          <Input label="Email" type="email" placeholder="you@school.edu" autoComplete="email" required />
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            hint="At least 8 characters."
            minLength={8}
            required
          />
          <Select
            label="I am a"
            placeholder="Select a role"
            options={roleOptions}
            value={role}
            onChange={(e) => setRole(e.target.value as AreaKey)}
            required
          />
          <Button type="submit" fullWidth loading={loading}>
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
            Sign in
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
