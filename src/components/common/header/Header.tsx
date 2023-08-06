import { container } from '@/components/common/header/header.css';

export default function Header() {
  return (
    <header>
      <nav className={container} data-testid="nav">
        <div>TODO</div>
        <div>menu</div>
      </nav>
    </header>
  );
}
