interface EmptyStateProps {
  title: string;
  message?: string;
}

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      {message && <p className="muted">{message}</p>}
    </div>
  );
}
