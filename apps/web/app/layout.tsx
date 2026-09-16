import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoviePass | Đặt vé xem phim trực tuyến",
  description: "Nền tảng đặt vé xem phim trực tuyến với vé điện tử NFT độc nhất. Đặt vé dễ dàng, xác thực nhanh chóng.",
};

const navLinks = [
  { href: "/",          label: "Trang chủ" },
  { href: "/movies",    label: "Phim" },
  { href: "/cinemas",   label: "Rạp chiếu phim" },
  { href: "/showtimes", label: "Suất chiếu" },
  { href: "/my-tickets", label: "Vé của tôi" },
] as const;

const footerColumns = [
  {
    title: "Khám phá",
    links: [
      { href: "/movies",      label: "Phim đang chiếu" },
      { href: "/movies/soon", label: "Phim sắp chiếu" },
      { href: "/cinemas",     label: "Rạp chiếu phim" },
      { href: "/showtimes",   label: "Suất chiếu hôm nay" },
    ],
  },
  {
    title: "Tài khoản",
    links: [
      { href: "/login",       label: "Đăng nhập" },
      { href: "/register",    label: "Đăng ký" },
      { href: "/my-tickets",  label: "Vé của tôi" },
      { href: "/profile",     label: "Tài khoản" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { href: "/faq",         label: "Câu hỏi thường gặp" },
      { href: "/contact",     label: "Liên hệ" },
      { href: "/terms",       label: "Điều khoản sử dụng" },
      { href: "/privacy",     label: "Chính sách bảo mật" },
    ],
  },
] as const;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        {/* ─── Navigation ─────────────────────────────────────── */}
        <nav className="site-nav" aria-label="Điều hướng chính">
          <div className="nav-inner">
            <a href="/" className="nav-logo" aria-label="MoviePass trang chủ">
              <span className="nav-logo-icon" aria-hidden="true">🎬</span>
              <span>MoviePass</span>
            </a>

            <ul className="nav-links" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>

            <div className="nav-actions">
              <a href="/login" className="btn btn-ghost">Đăng nhập</a>
              <a href="/register" className="btn btn-primary">Đăng ký</a>
            </div>
          </div>
        </nav>

        {/* ─── Page content ─────────────────────────────────────── */}
        {children}

        {/* ─── Footer ───────────────────────────────────────────── */}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-top">
              {/* Brand */}
              <div>
                <p className="footer-brand-name">🎬 MoviePass</p>
                <p className="footer-brand-desc">
                  Nền tảng đặt vé xem phim trực tuyến với vé điện tử NFT — xác thực nhanh chóng, an toàn tuyệt đối.
                </p>
              </div>

              {/* Link columns */}
              {footerColumns.map(({ title, links }) => (
                <div key={title}>
                  <p className="footer-col-title">{title}</p>
                  <ul className="footer-links" role="list">
                    {links.map(({ href, label }) => (
                      <li key={href}>
                        <a href={href}>{label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="footer-bottom">
              <span>© 2025 MoviePass. Dự án học thuật — Môn Công nghệ Blockchain.</span>
              <span className="footer-nft-badge">⬡ Vé NFT · Blockchain</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
