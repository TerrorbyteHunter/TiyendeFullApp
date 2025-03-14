
import { ErrorBoundary } from '@shared/components/error-boundary';

export function DataComponent() {
  return (
    <ErrorBoundary fallback={<div>Failed to load data</div>}>
      {/* Your component logic here */}
    </ErrorBoundary>
  );
}
