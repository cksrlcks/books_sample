export default function Inner({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`global-inner ${className}`} style={style}>
      {children}
    </div>
  );
}
