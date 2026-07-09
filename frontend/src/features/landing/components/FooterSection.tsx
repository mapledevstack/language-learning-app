const footerLinks = {
  Navigation: [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Get Started", href: "#cta" },
    {
      name: "GitHub",
      href: "https://github.com/mapledevstack/language-learning-app",
    },
  ],
}

const FooterSection = () => {
  return (
    <footer className="border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-md">
            <a href="#" className="text-xl font-semibold tracking-tight">
              Learn Japanese
            </a>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Learn Japanese with interactive tools designed to help you build
              vocabulary, grammar, and reading skills.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6">
            {footerLinks.Navigation.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Learn Japanese
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
