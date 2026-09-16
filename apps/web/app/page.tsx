/* ─────────────────────────────────────────────────────────────────────
   Demo data — will be replaced by real API data in Phase 2
   ───────────────────────────────────────────────────────────────────── */

interface Movie {
  id: string;
  title: string;
  genre: string[];
  duration: number;      // minutes
  releaseDate: string;
  rating?: string;
  score?: number;
  status: "nowPlaying" | "comingSoon";
  emoji: string;         // placeholder poster icon
}

interface Showtime {
  id: string;
  movie: string;
  cinema: string;
  hall: string;
  time: string;
  timeLabel: string;
  seatsLeft: number;
  totalSeats: number;
}

interface Cinema {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  tags: string[];
}

const nowPlayingMovies: Movie[] = [
  { id: "m1", title: "Godzilla × Kong: Đế Chế Mới", genre: ["Hành động", "Khoa học viễn tưởng"], duration: 115, releaseDate: "05/04/2024", rating: "T13", score: 8.1, status: "nowPlaying", emoji: "🦖" },
  { id: "m2", title: "Dune: Phần Hai",               genre: ["Khoa học viễn tưởng", "Sử thi"],   duration: 166, releaseDate: "01/03/2024", rating: "T16", score: 9.0, status: "nowPlaying", emoji: "🏜️" },
  { id: "m3", title: "Deadpool & Wolverine",          genre: ["Hành động", "Hài"],                 duration: 128, releaseDate: "26/07/2024", rating: "T16", score: 8.7, status: "nowPlaying", emoji: "🦸" },
  { id: "m4", title: "Ngôi Nhà Không Bình Yên",       genre: ["Kinh dị", "Hồi hộp"],               duration: 102, releaseDate: "19/04/2024", rating: "T18", score: 7.4, status: "nowPlaying", emoji: "👻" },
  { id: "m5", title: "Inside Out 2",                  genre: ["Hoạt hình", "Gia đình"],             duration: 100, releaseDate: "14/06/2024", rating: "P",   score: 8.9, status: "nowPlaying", emoji: "🧠" },
  { id: "m6", title: "Ác Quỷ Ma Sơ 2",               genre: ["Kinh dị"],                           duration: 110, releaseDate: "06/09/2024", rating: "T18", score: 7.2, status: "nowPlaying", emoji: "🙏" },
] as const;

const comingSoonMovies: Movie[] = [
  { id: "c1", title: "Avengers: Doomsday",      genre: ["Hành động", "Siêu anh hùng"], duration: 150, releaseDate: "02/05/2025", rating: "T13", status: "comingSoon", emoji: "⚡" },
  { id: "c2", title: "Joker: Folie à Deux",     genre: ["Tâm lý", "Hồi hộp"],          duration: 138, releaseDate: "04/10/2024", rating: "T18", status: "comingSoon", emoji: "🃏" },
  { id: "c3", title: "Venom: The Last Dance",   genre: ["Hành động", "Kinh dị"],        duration: 109, releaseDate: "25/10/2024", rating: "T16", status: "comingSoon", emoji: "🕷️" },
  { id: "c4", title: "Moana 2",                 genre: ["Hoạt hình", "Phiêu lưu"],      duration: 100, releaseDate: "27/11/2024", rating: "P",   status: "comingSoon", emoji: "🌊" },
] as const;

const todayShowtimes: Showtime[] = [
  { id: "s1", movie: "Dune: Phần Hai",           cinema: "MoviePass CGV Vincom",  hall: "IMAX", time: "09:00", timeLabel: "SA", seatsLeft: 42,  totalSeats: 200 },
  { id: "s2", movie: "Deadpool & Wolverine",     cinema: "MoviePass Lotte Gò Vấp", hall: "4DX",  time: "10:30", timeLabel: "SA", seatsLeft: 15,  totalSeats: 100 },
  { id: "s3", movie: "Inside Out 2",             cinema: "MoviePass Galaxy Tân Bình", hall: "Phòng 3", time: "13:00", timeLabel: "CH", seatsLeft: 87, totalSeats: 150 },
  { id: "s4", movie: "Godzilla × Kong",          cinema: "MoviePass CGV Vincom",  hall: "IMAX", time: "14:45", timeLabel: "CH", seatsLeft: 6,   totalSeats: 200 },
  { id: "s5", movie: "Ác Quỷ Ma Sơ 2",          cinema: "MoviePass Lotte Gò Vấp", hall: "Phòng 1", time: "18:15", timeLabel: "TT", seatsLeft: 0,  totalSeats: 120 },
  { id: "s6", movie: "Dune: Phần Hai",           cinema: "MoviePass Galaxy Tân Bình", hall: "Phòng 2", time: "20:30", timeLabel: "TT", seatsLeft: 110, totalSeats: 150 },
] as const;

const cinemas: Cinema[] = [
  { id: "c1", name: "MoviePass CGV Vincom Center", address: "72 Lê Thánh Tôn, Bến Nghé", district: "Quận 1", city: "TP. Hồ Chí Minh", tags: ["IMAX", "4DX", "ScreenX"] },
  { id: "c2", name: "MoviePass Lotte Gò Vấp",      address: "242 Nguyễn Văn Lượng, P.16", district: "Quận Gò Vấp", city: "TP. Hồ Chí Minh", tags: ["4DX", "Premium"] },
  { id: "c3", name: "MoviePass Galaxy Tân Bình",   address: "246 Nguyễn Thái Bình, P.12", district: "Quận Tân Bình", city: "TP. Hồ Chí Minh", tags: ["Dolby Atmos", "VIP"] },
  { id: "c4", name: "MoviePass BHD Phạm Hùng",     address: "CBD Premium Home, Phạm Hùng", district: "Quận 8", city: "TP. Hồ Chí Minh", tags: ["IMAX", "Luxury"] },
] as const;

/* ─────────────────────────────────────────────────────────────────────
   Helper components
   ───────────────────────────────────────────────────────────────────── */

function MovieCard({ movie }: { movie: Movie }) {
  const badgeLabel = movie.status === "nowPlaying" ? "Đang chiếu" : "Sắp chiếu";
  const seatsLabel = `${movie.duration} phút`;

  return (
    <article className="movie-card">
      {/* Poster */}
      <div className="movie-poster">
        <div className="movie-poster-placeholder">
          <span aria-hidden="true">{movie.emoji}</span>
          <span className="movie-poster-title">{movie.title}</span>
        </div>
        <span className={`movie-badge ${movie.status === "comingSoon" ? "movie-badge-soon" : ""}`}>
          {badgeLabel}
        </span>
        {movie.score !== undefined && (
          <span className="movie-rating">⭐ {movie.score}</span>
        )}
      </div>

      {/* Info */}
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span>{seatsLabel}</span>
          {movie.rating && <span className="movie-genre-tag">{movie.rating}</span>}
        </div>
        <div className="movie-meta" style={{ marginTop: "0.25rem" }}>
          {movie.genre.map((g) => (
            <span key={g} className="movie-genre-tag">{g}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="movie-actions">
        <a href={`/movies/${movie.id}`} className="btn btn-ghost">Chi tiết</a>
        {movie.status === "nowPlaying"
          ? <a href={`/booking/${movie.id}`} className="btn btn-primary">Đặt vé</a>
          : <button className="btn btn-ghost" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>Sắp chiếu</button>
        }
      </div>
    </article>
  );
}

function ShowtimeRow({ showtime }: { showtime: Showtime }) {
  const pct = showtime.seatsLeft / showtime.totalSeats;
  const seatsClass = showtime.seatsLeft === 0
    ? "seats-sold"
    : pct <= 0.15 ? "seats-limited" : "seats-available";
  const seatsText = showtime.seatsLeft === 0
    ? "Hết chỗ"
    : pct <= 0.15
      ? `${showtime.seatsLeft} chỗ (sắp hết!)`
      : `${showtime.seatsLeft} chỗ trống`;

  return (
    <div className="showtime-item">
      <div className="showtime-time">
        {showtime.time}
        <span className="showtime-time-ampm">{showtime.timeLabel}</span>
      </div>
      <div className="showtime-info">
        <p className="showtime-movie">{showtime.movie}</p>
        <div className="showtime-details">
          <span>🎭 {showtime.cinema}</span>
          <span>· {showtime.hall}</span>
        </div>
      </div>
      <div className="showtime-seats">
        <span className={`seats-available ${seatsClass}`}>{seatsText}</span>
        {showtime.seatsLeft > 0 && (
          <div style={{ marginTop: "0.4rem" }}>
            <a href={`/booking/showtime/${showtime.id}`} className="btn btn-primary" style={{ fontSize: "0.78rem", padding: "0.4rem 0.9rem" }}>
              Đặt vé
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function CinemaCard({ cinema }: { cinema: Cinema }) {
  return (
    <div className="cinema-card">
      <div className="cinema-icon" aria-hidden="true">🏛️</div>
      <div>
        <h3 className="cinema-name">{cinema.name}</h3>
        <p className="cinema-address">
          {cinema.address}, {cinema.district}, {cinema.city}
        </p>
      </div>
      <div className="cinema-tags">
        {cinema.tags.map((tag) => (
          <span key={tag} className="cinema-tag">{tag}</span>
        ))}
      </div>
      <a href={`/cinemas/${cinema.id}`} className="btn btn-ghost" style={{ fontSize: "0.82rem", marginTop: "0.25rem" }}>
        Xem suất chiếu →
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Homepage
   ───────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO BANNER
         ══════════════════════════════════════════════ */}
      <section className="hero-banner" aria-label="Giới thiệu">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span aria-hidden="true">🎬</span>
            Hệ thống đặt vé xem phim trực tuyến
          </p>
          <h1 className="hero-title">
            Trải nghiệm rạp phim<br />
            <span>đẳng cấp mới.</span>
          </h1>
          <p className="hero-desc">
            Đặt vé dễ dàng, nhận vé điện tử tức thì. Mỗi vé là một NFT độc nhất — xác thực nhanh, không thể làm giả.
          </p>
          <div className="hero-actions">
            <a href="/movies" className="btn btn-primary">Xem phim đang chiếu</a>
            <a href="/showtimes" className="btn btn-ghost">Suất chiếu hôm nay</a>
          </div>

          <div className="hero-meta" aria-label="Thống kê nền tảng">
            <div className="hero-stat">
              <span className="hero-stat-value">4</span>
              <span className="hero-stat-label">Rạp chiếu phim</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">10+</span>
              <span className="hero-stat-label">Phim đang chiếu</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">NFT</span>
              <span className="hero-stat-label">Vé điện tử bảo mật</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">QR</span>
              <span className="hero-stat-label">Check-in tức thì</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NFT FEATURE STRIP
         ══════════════════════════════════════════════ */}
      <div className="nft-strip" aria-label="Tính năng vé NFT">
        <div className="nft-strip-inner">
          <span className="nft-strip-label">
            <span aria-hidden="true">⬡</span>
            Vé điện tử NFT
          </span>
          <div className="nft-strip-features">
            <span className="nft-feature"><span className="nft-feature-icon">🔒</span> Không thể làm giả</span>
            <span className="nft-feature"><span className="nft-feature-icon">⚡</span> Xác thực tức thì</span>
            <span className="nft-feature"><span className="nft-feature-icon">📱</span> QR Code thông minh</span>
            <span className="nft-feature"><span className="nft-feature-icon">🔗</span> Ghi nhận trên Blockchain</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MAIN CONTENT
         ══════════════════════════════════════════════ */}
      <main aria-label="Nội dung trang chủ">
        <div className="container">

          {/* ── Phim đang chiếu ────────────────────────────── */}
          <section className="section" aria-labelledby="now-playing-heading">
            <div className="section-header">
              <div>
                <p className="section-eyebrow">Đang chiếu</p>
                <h2 className="section-title" id="now-playing-heading">Phim đang chiếu</h2>
              </div>
              <a href="/movies?status=nowPlaying" className="section-link">Xem tất cả →</a>
            </div>
            <div className="movies-grid">
              {nowPlayingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* ── Suất chiếu hôm nay ─────────────────────────── */}
          <section className="section" aria-labelledby="showtimes-heading">
            <div className="section-header">
              <div>
                <p className="section-eyebrow">Hôm nay · {today}</p>
                <h2 className="section-title" id="showtimes-heading">Suất chiếu hôm nay</h2>
              </div>
              <a href="/showtimes" className="section-link">Xem tất cả →</a>
            </div>
            <div className="showtime-list">
              {todayShowtimes.map((st) => (
                <ShowtimeRow key={st.id} showtime={st} />
              ))}
            </div>
          </section>

          {/* ── Phim sắp chiếu ─────────────────────────────── */}
          <section className="section" aria-labelledby="coming-soon-heading">
            <div className="section-header">
              <div>
                <p className="section-eyebrow">Sắp ra mắt</p>
                <h2 className="section-title" id="coming-soon-heading">Phim sắp chiếu</h2>
              </div>
              <a href="/movies?status=comingSoon" className="section-link">Xem tất cả →</a>
            </div>
            <div className="movies-grid">
              {comingSoonMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* ── Rạp chiếu phim ─────────────────────────────── */}
          <section className="section" aria-labelledby="cinemas-heading">
            <div className="section-header">
              <div>
                <p className="section-eyebrow">Hệ thống rạp</p>
                <h2 className="section-title" id="cinemas-heading">Rạp chiếu phim</h2>
              </div>
              <a href="/cinemas" className="section-link">Xem tất cả →</a>
            </div>
            <div className="cinemas-grid">
              {cinemas.map((cinema) => (
                <CinemaCard key={cinema.id} cinema={cinema} />
              ))}
            </div>
          </section>

          {/* ── Booking CTA ────────────────────────────────── */}
          <div className="booking-cta" role="complementary" aria-label="Kêu gọi đặt vé">
            <h2>Sẵn sàng xem phim?</h2>
            <p>Đặt vé ngay hôm nay — nhận vé điện tử tức thì, check-in dễ dàng bằng QR Code.</p>
            <a href="/movies" className="btn btn-primary">Đặt vé ngay</a>
          </div>

        </div>
      </main>
    </>
  );
}
