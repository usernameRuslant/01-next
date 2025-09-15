import Link from 'next/link';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        LELEKA
      </Link>
      <button>open modal</button>
    </header>
  );
};

export default Header;
