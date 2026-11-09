import { Button, Card, EmptyState } from '@/components/ui';
import { PageHeader } from '@/layouts/PageHeader';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

/** Generic stand-in for area pages that haven't been built yet. */
export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <Card>
        <EmptyState
          title={`${title} is coming soon`}
          description="This page is a placeholder. Content and data will be wired up in a later milestone."
          action={<Button variant="secondary">Notify me</Button>}
        />
      </Card>
    </>
  );
}
