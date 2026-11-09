import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  EmptyState,
  Input,
  Modal,
  Select,
  Spinner,
  Table,
  Toast,
  type BadgeTone,
  type BadgeVariant,
  type ButtonSize,
  type ButtonVariant,
  type CardVariant,
  type ModalSize,
  type TableColumn,
  type ToastTone,
} from '@/components/ui';
import { CalendarIcon, UsersIcon } from '@/components/icons';
import { areaList } from '@/config/navigation';
import { useToast } from '@/hooks/useToast';
import { Brand } from '@/layouts/Brand';

/* ------------------------------------------------------------------ */
/* Demo data                                                           */
/* ------------------------------------------------------------------ */

const buttonVariants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger'];
const buttonSizes: ButtonSize[] = ['sm', 'md', 'lg'];
const badgeTones: BadgeTone[] = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'];
const badgeVariants: BadgeVariant[] = ['soft', 'solid', 'outline'];
const cardVariants: CardVariant[] = ['default', 'outlined', 'elevated'];
const modalSizes: ModalSize[] = ['sm', 'md', 'lg'];
const toastTones: ToastTone[] = ['success', 'error', 'warning', 'info'];

const gradeOptions = [
  { value: '9', label: 'Grade 9' },
  { value: '10', label: 'Grade 10' },
  { value: '11', label: 'Grade 11' },
  { value: '12', label: 'Grade 12 (full)', disabled: true },
];

interface Student {
  id: number;
  name: string;
  grade: string;
  score: number;
  status: 'Passed' | 'Review' | 'Failed';
}

const students: Student[] = [
  { id: 1, name: 'Ali Khan', grade: 'Grade 10', score: 92, status: 'Passed' },
  { id: 2, name: 'Hina Malik', grade: 'Grade 10', score: 74, status: 'Review' },
  { id: 3, name: 'Usman Tariq', grade: 'Grade 9', score: 48, status: 'Failed' },
  { id: 4, name: 'Ayesha Noor', grade: 'Grade 11', score: 88, status: 'Passed' },
];

const statusTone: Record<Student['status'], BadgeTone> = {
  Passed: 'success',
  Review: 'warning',
  Failed: 'danger',
};

const columns: TableColumn<Student>[] = [
  { key: 'name', header: 'Name' },
  { key: 'grade', header: 'Grade' },
  { key: 'score', header: 'Score', align: 'right' },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    render: (s) => <Badge tone={statusTone[s.status]}>{s.status}</Badge>,
  },
];

const toastCopy: Record<ToastTone, { title: string; description: string }> = {
  success: { title: 'Saved', description: 'Your changes have been saved.' },
  error: { title: 'Something went wrong', description: 'Please try again in a moment.' },
  warning: { title: 'Fee due soon', description: 'Invoice #1042 is due in 3 days.' },
  info: { title: 'New message', description: 'Ms. Ahmed replied to your question.' },
};

const sections = [
  { id: 'buttons', label: 'Button' },
  { id: 'inputs', label: 'Input' },
  { id: 'selects', label: 'Select' },
  { id: 'cards', label: 'Card' },
  { id: 'badges', label: 'Badge' },
  { id: 'spinners', label: 'Spinner' },
  { id: 'modals', label: 'Modal' },
  { id: 'toasts', label: 'Toast' },
  { id: 'tables', label: 'Table' },
  { id: 'empty', label: 'EmptyState' },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-surface">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Brand to="/demo" />
          <nav className="flex items-center gap-1 text-sm" aria-label="Areas">
            {areaList.map((a) => (
              <Link
                key={a.key}
                to={a.basePath}
                className="rounded-md px-2 py-1.5 font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 sm:px-3"
              >
                {a.label}
              </Link>
            ))}
          </nav>
        </div>
        <nav
          aria-label="Components"
          className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 text-sm sm:px-6"
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full px-3 py-1 text-neutral-600 hover:bg-primary-50 hover:text-primary-700"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 lg:py-12">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Component library</h1>
          <p className="mt-2 text-neutral-500">Every reusable UI component and its variants.</p>
        </div>

        <ButtonsDemo />
        <InputsDemo />
        <SelectsDemo />
        <CardsDemo />
        <BadgesDemo />
        <SpinnersDemo />
        <ModalsDemo />
        <ToastsDemo />
        <TablesDemo />
        <EmptyStatesDemo />
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Layout helpers                                                      */
/* ------------------------------------------------------------------ */

function Section({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <Card>
        <CardHeader title={title} description={description} />
        <CardBody className="space-y-6">{children}</CardBody>
      </Card>
    </section>
  );
}

function Group({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className="min-w-0">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">{label}</p>
      <div className={className ?? 'flex flex-wrap items-center gap-3'}>{children}</div>
    </div>
  );
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function ButtonsDemo() {
  return (
    <Section id="buttons" title="Button" description="5 variants × 3 sizes, plus loading, disabled, icon and full-width states.">
      <Group label="Variants">
        {buttonVariants.map((v) => (
          <Button key={v} variant={v}>
            {capitalize(v)}
          </Button>
        ))}
      </Group>
      <Group label="Sizes">
        {buttonSizes.map((s) => (
          <Button key={s} size={s}>
            Size {s}
          </Button>
        ))}
      </Group>
      <Group label="States">
        <Button loading>Saving</Button>
        <Button variant="outline" loading>
          Loading
        </Button>
        <Button disabled>Disabled</Button>
        <Button variant="secondary" leftIcon={<CalendarIcon className="h-4 w-4" />}>
          Left icon
        </Button>
        <Button variant="outline" rightIcon={<UsersIcon className="h-4 w-4" />}>
          Right icon
        </Button>
      </Group>
      <Group label="Full width" className="block">
        <Button fullWidth>Full-width button</Button>
      </Group>
    </Section>
  );
}

function InputsDemo() {
  return (
    <Section id="inputs" title="Input" description="Text fields with label, hint, error, required and disabled states.">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Input label="Default" placeholder="Type something…" />
        <Input label="With hint" placeholder="you@school.edu" type="email" hint="We'll never share your email." />
        <Input label="Required" placeholder="Full name" required />
        <Input label="With error" defaultValue="abc" error="Must be at least 8 characters." />
        <Input label="Disabled" defaultValue="Read only value" disabled />
        <Input label="Password" type="password" defaultValue="secret123" />
        <Input label="Number" type="number" placeholder="0" />
        <Input label="Date" type="date" />
      </div>
    </Section>
  );
}

function SelectsDemo() {
  const [grade, setGrade] = useState('');
  return (
    <Section id="selects" title="Select" description="Native select with placeholder, hint, error and disabled options.">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Select
          label="With placeholder"
          placeholder="Choose a grade"
          options={gradeOptions}
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          hint={grade ? `Selected: Grade ${grade}` : 'Grade 12 is disabled.'}
        />
        <Select label="Default value" options={gradeOptions} defaultValue="10" />
        <Select
          label="With error"
          placeholder="Choose a grade"
          options={gradeOptions}
          defaultValue=""
          error="Please select a grade."
        />
        <Select label="Disabled" options={gradeOptions} defaultValue="9" disabled />
      </div>
    </Section>
  );
}

function CardsDemo() {
  return (
    <Section id="cards" title="Card" description="3 surface variants and composable header / body / footer slots.">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {cardVariants.map((v) => (
          <Card key={v} variant={v} className="p-5">
            <p className="font-semibold text-neutral-900">{capitalize(v)}</p>
            <p className="mt-1 text-sm text-neutral-500">Card variant “{v}”.</p>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader
          title="Composed card"
          description="Header with description and action"
          action={<Badge tone="success">Active</Badge>}
        />
        <CardBody>
          <p className="text-sm text-neutral-600">
            Body content goes here. Cards are the main container for grouped content across all areas.
          </p>
        </CardBody>
        <CardFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </Section>
  );
}

function BadgesDemo() {
  return (
    <Section id="badges" title="Badge" description="6 tones × 3 variants, with optional status dot.">
      {badgeVariants.map((variant) => (
        <Group key={variant} label={variant}>
          {badgeTones.map((tone) => (
            <Badge key={tone} tone={tone} variant={variant}>
              {capitalize(tone)}
            </Badge>
          ))}
        </Group>
      ))}
      <Group label="With dot">
        {badgeTones.map((tone) => (
          <Badge key={tone} tone={tone} dot>
            {capitalize(tone)}
          </Badge>
        ))}
      </Group>
    </Section>
  );
}

function SpinnersDemo() {
  return (
    <Section id="spinners" title="Spinner" description="3 sizes; inherits colour from text colour.">
      <Group label="Sizes" className="flex flex-wrap items-center gap-6 text-primary-600">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </Group>
      <Group label="Colours" className="flex flex-wrap items-center gap-6">
        <Spinner className="text-neutral-500" />
        <Spinner className="text-success-600" />
        <Spinner className="text-warning-500" />
        <Spinner className="text-danger-600" />
        <span className="inline-flex rounded-lg bg-primary-600 p-2 text-white">
          <Spinner size="sm" />
        </span>
      </Group>
    </Section>
  );
}

type OpenModal = { kind: 'size'; size: ModalSize } | { kind: 'confirm' } | { kind: 'locked' } | null;

function ModalsDemo() {
  const [open, setOpen] = useState<OpenModal>(null);
  const close = () => setOpen(null);
  const { toast } = useToast();

  return (
    <Section id="modals" title="Modal" description="Accessible dialog: Esc / backdrop to close, sheet-style on mobile.">
      <Group label="Sizes">
        {modalSizes.map((size) => (
          <Button key={size} variant="outline" onClick={() => setOpen({ kind: 'size', size })}>
            Open {size} modal
          </Button>
        ))}
      </Group>
      <Group label="Patterns">
        <Button variant="danger" onClick={() => setOpen({ kind: 'confirm' })}>
          Destructive confirm
        </Button>
        <Button variant="secondary" onClick={() => setOpen({ kind: 'locked' })}>
          Non-dismissible
        </Button>
      </Group>

      <Modal
        open={open?.kind === 'size'}
        onClose={close}
        size={open?.kind === 'size' ? open.size : 'md'}
        title="Edit profile"
        description="Update the student's basic details."
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button onClick={close}>Save changes</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Full name" defaultValue="Ali Khan" />
          <Select label="Grade" options={gradeOptions} defaultValue="10" />
        </div>
      </Modal>

      <Modal
        open={open?.kind === 'confirm'}
        onClose={close}
        size="sm"
        title="Delete student?"
        description="This permanently removes the record. This action cannot be undone."
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                close();
                toast({ tone: 'success', title: 'Student deleted' });
              }}
            >
              Delete
            </Button>
          </>
        }
      />

      <Modal
        open={open?.kind === 'locked'}
        onClose={close}
        dismissible={false}
        title="Terms updated"
        description="Clicking the backdrop won't close this one — use a button or Esc."
        footer={<Button onClick={close}>I understand</Button>}
      />
    </Section>
  );
}

function ToastsDemo() {
  const { toast } = useToast();
  return (
    <Section id="toasts" title="Toast" description="4 tones. Trigger live toasts via useToast(), or preview them statically.">
      <Group label="Trigger">
        {toastTones.map((tone) => (
          <Button key={tone} variant="outline" onClick={() => toast({ tone, ...toastCopy[tone] })}>
            Show {tone}
          </Button>
        ))}
        <Button
          variant="ghost"
          onClick={() => toast({ title: 'Sticky toast', description: 'Stays until dismissed.', duration: 0 })}
        >
          Persistent
        </Button>
      </Group>
      <Group label="Static preview" className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {toastTones.map((tone) => (
          <Toast key={tone} tone={tone} {...toastCopy[tone]} className="shadow-none" />
        ))}
      </Group>
    </Section>
  );
}

function TablesDemo() {
  return (
    <Section id="tables" title="Table" description="Typed columns with custom renderers; scrolls horizontally on small screens.">
      <Group label="Default" className="block">
        <Table columns={columns} data={students} rowKey={(s) => s.id} caption="Students" />
      </Group>
      <Group label="Striped + compact" className="block">
        <Table columns={columns} data={students} rowKey={(s) => s.id} striped compact />
      </Group>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Group label="Loading" className="block">
          <Table columns={columns} data={[]} rowKey={(s) => s.id} loading />
        </Group>
        <Group label="Empty" className="block">
          <Table
            columns={columns}
            data={[]}
            rowKey={(s) => s.id}
            emptyTitle="No students found"
            emptyDescription="Try adjusting your filters."
          />
        </Group>
      </div>
    </Section>
  );
}

function EmptyStatesDemo() {
  return (
    <Section id="empty" title="EmptyState" description="Default, compact, with action and with a custom icon.">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card variant="outlined">
          <EmptyState title="No assignments" description="You're all caught up for this week." />
        </Card>
        <Card variant="outlined">
          <EmptyState
            title="No children linked"
            description="Link a student account to see their progress."
            icon={<UsersIcon className="h-6 w-6" />}
            action={<Button size="sm">Link a student</Button>}
          />
        </Card>
        <Card variant="outlined" className="md:col-span-2">
          <EmptyState compact title="Compact variant" description="Used inside tables and small panels." />
        </Card>
      </div>
    </Section>
  );
}
