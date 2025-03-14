export function QuickAction({ href, icon, label }: QuickActionProps) {
  return href ? (
    <Link href={href} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
      {icon}
      <span>{label}</span>
    </Link>
  ) : null;
}