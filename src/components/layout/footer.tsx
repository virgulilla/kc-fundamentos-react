function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark:bg-dark-background dark:text-dark-text border-boder dark:border-dark-border mt-auto border-t bg-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-4 text-center text-sm">
        &copy; {year} <span className="font-medium">KeepCoding</span>. Todos los
        derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
