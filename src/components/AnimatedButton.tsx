import Link from "next/link";



interface AnimatedButtonProps {
  label: string;
  href: string;
}

export default function AnimatedButton({ label, href }: AnimatedButtonProps) {
  return (
    <Link href={href}>
      <button className="glow-on-hover" type="button">
        {label}
      </button>
    </Link>
  );
}
