# MoviePass — Nền tảng đặt vé xem phim bằng NFT

> **Dự án học thuật** · Môn Công nghệ Blockchain · Đại học

MoviePass là một nền tảng đặt vé xem phim trực tuyến sử dụng công nghệ NFT để phát hành vé điện tử có thể xác thực trên Blockchain. Mỗi vé được xác nhận sẽ được đúc thành một NFT ERC-721 độc nhất, cho phép xác thực tức thì tại cửa rạp mà không thể làm giả hay sử dụng lại.

Dự án được xây dựng hoàn toàn từ đầu. **Phase 1** đặt nền tảng kiến trúc cho toàn bộ hệ thống: cấu trúc monorepo, mô hình cơ sở dữ liệu, các service scaffold, design tokens, và cấu hình phát triển Smart Contract.

---

## Mục lục

1. [Tổng quan hệ thống](#tổng-quan-hệ-thống)
2. [Công nghệ sử dụng](#công-nghệ-sử-dụng)
3. [Kiến trúc dự án](#kiến-trúc-dự-án)
4. [Cấu trúc thư mục](#cấu-trúc-thư-mục)
5. [Chức năng chính](#chức-năng-chính)
6. [NFT và Blockchain](#nft-và-blockchain)
7. [Cài đặt](#cài-đặt)
8. [Chạy dự án](#chạy-dự-án)
9. [Kiểm thử và xác thực](#kiểm-thử-và-xác-thực)
10. [Biến môi trường](#biến-môi-trường)
11. [Lộ trình phát triển](#lộ-trình-phát-triển)
12. [Tài liệu kỹ thuật](#tài-liệu-kỹ-thuật)

---

## Tổng quan hệ thống

MoviePass giải quyết hai vấn đề cốt lõi của hệ thống vé xem phim truyền thống:

- **Vé giả và vé trùng lặp** — Mỗi NFT là duy nhất và không thể sao chép.
- **Scalping (mua đi bán lại vé)** — Vé NFT được thiết kế không thể chuyển nhượng ở phiên bản đầu tiên.

**Triết lý thiết kế:** Blockchain xác lập quyền sở hữu vé và trạng thái sử dụng không thể thay đổi. PostgreSQL quản lý dữ liệu vận hành (rạp, suất chiếu, ghế, đơn hàng, lịch sử). Người dùng trải nghiệm một nền tảng **đặt vé xem phim** bình thường — Blockchain hoạt động âm thầm phía sau.

---

## Công nghệ sử dụng

| Lớp | Công nghệ |
|-----|-----------|
| **Frontend** | Next.js 15 · TypeScript · CSS Modules |
| **Backend API** | NestJS · TypeScript · Node.js 22+ |
| **Cơ sở dữ liệu** | PostgreSQL 16 · Prisma ORM |
| **Smart Contract** | Solidity 0.8.28 · Foundry |
| **Blockchain** | Polygon (Amoy Testnet) |
| **Lưu trữ metadata** | IPFS |
| **Monorepo** | npm Workspaces |
| **Kiểm thử** | Node.js built-in test runner · TypeScript compiler |

---

## Kiến trúc dự án

MoviePass là ứng dụng Web3 lai (_hybrid Web3_): kết hợp hạ tầng Web2 truyền thống với Blockchain để tận dụng điểm mạnh của cả hai.

```
Giao diện khách hàng ─┐
Cổng quản trị       ─┼──▶  NestJS API  ──▶  PostgreSQL
Giao diện check-in  ─┘          │                 │
                                 │                 └─ Phim, suất chiếu, ghế,
                                 │                    đơn hàng, lịch sử audit
                                 ├── Redis        (giữ ghế tạm thời, QR nonce)
                                 ├── IPFS         (metadata & ảnh NFT công khai)
                                 └── Polygon      (sở hữu NFT, xác thực vé)
```

### Phân định trách nhiệm

| Lớp | Trách nhiệm | Không được làm |
|-----|------------|----------------|
| Frontend khách hàng | Duyệt phim, chọn ghế, kết nối ví, hiển thị vé | Tính giá hoặc quyết định tính hợp lệ của vé |
| Cổng quản trị | Quản lý nội dung, rạp chiếu, giá vé, đặt chỗ, kiểm soát cổng vào | Truy cập trực tiếp database hoặc giữ private key |
| API | Phân quyền, tính giá tin cậy, quản lý trạng thái đơn hàng, điều phối mint NFT, audit | Giữ ví của khách hàng |
| PostgreSQL | Dữ liệu vận hành và lịch sử trạng thái | Nguồn sự thật về quyền sở hữu NFT |
| Smart Contract | Phát hành NFT, quyền sở hữu, tính duy nhất, trạng thái đã sử dụng | Dữ liệu cá nhân, danh mục phim, logic sơ đồ ghế |
| IPFS | Metadata NFT công khai, bất biến | Bí mật QR hoặc dữ liệu khách hàng |

---

## Cấu trúc thư mục

```
moviepass-nft/
├── apps/
│   ├── web/                        # Frontend khách hàng (Next.js)
│   │   └── app/
│   │       ├── layout.tsx          # Root layout: navigation, footer
│   │       ├── page.tsx            # Trang chủ
│   │       ├── globals.css         # Stylesheet toàn cục
│   │       └── api/health/         # Health check route
│   └── api/                        # Backend API (NestJS)
│       └── src/
│           ├── main.ts             # Entry point
│           ├── app.module.ts       # Module gốc
│           └── health/             # Health check module
│
├── packages/
│   ├── database/                   # Prisma schema & client
│   │   └── prisma/
│   │       └── schema.prisma       # Toàn bộ mô hình dữ liệu
│   ├── contracts/                  # Solidity / Foundry
│   │   └── foundry.toml            # Cấu hình Solidity 0.8.28
│   ├── shared-types/               # TypeScript types dùng chung
│   └── ui/
│       └── src/tokens.css          # Design tokens (màu sắc, khoảng cách)
│
├── tests/
│   └── architecture.test.mjs       # Kiểm thử cấu trúc Phase 1
│
├── docs/
│   ├── architecture/overview.md    # Tổng quan kiến trúc hệ thống
│   ├── database-design.md          # Thiết kế cơ sở dữ liệu
│   ├── security-model.md           # Mô hình bảo mật
│   └── development-roadmap.md      # Lộ trình phát triển
│
├── .env.example                    # Mẫu biến môi trường
├── package.json                    # Scripts và workspace root
└── README.md                       # Tài liệu này
```

---

## Chức năng chính

### Đã hoàn thành — Phase 1

- ✅ Cấu trúc monorepo với npm Workspaces
- ✅ Frontend Next.js với giao diện rạp phim (trang chủ, điều hướng, footer)
- ✅ Backend NestJS với health check API
- ✅ Mô hình cơ sở dữ liệu PostgreSQL đầy đủ (12 bảng)
- ✅ Design tokens theo chủ đề Cinema Red
- ✅ TypeScript types dùng chung giữa các packages
- ✅ Cấu hình Foundry cho Smart Contract (Solidity 0.8.28)
- ✅ Tài liệu kiến trúc, bảo mật, và lộ trình phát triển

### Dự kiến theo lộ trình

- 🔜 **Phase 2** — Quản trị rạp chiếu phim, phim, suất chiếu
- 🔜 **Phase 3** — Đặt vé, chọn ghế, quản lý đơn hàng
- 🔜 **Phase 4** — Smart Contract NFT ERC-721 (Foundry + Polygon Amoy)
- 🔜 **Phase 5** — Kết nối MetaMask, mint NFT, lịch sử giao dịch
- 🔜 **Phase 6** — QR Code check-in, xác thực on-chain
- 🔜 **Phase 7** — Kiểm thử end-to-end, tài liệu triển khai

---

## NFT và Blockchain

### Cách hoạt động

```
Khách đặt vé
    │
    ▼
API tạo Order → tạo Ticket (trạng thái PAYMENT_PENDING)
    │
    ▼
Khách thanh toán thành công
    │
    ▼
Minter server đúc NFT ERC-721 trên Polygon
    │
    ▼
API lưu Token ID + Transaction Hash vào PostgreSQL
    │
    ▼
Khách nhận Vé điện tử với QR Code
    │
    ▼
Tại cổng rạp: Scanner xác minh chữ ký QR
    → Kiểm tra on-chain quyền sở hữu NFT
    → Ghi nhận trạng thái "đã sử dụng" lên Blockchain
    → Vé không thể dùng lại
```

### Nguyên tắc bảo mật NFT

- Khách hàng ký giao dịch bằng ví riêng — nền tảng **không bao giờ** yêu cầu private key.
- Mỗi vé NFT tương ứng với đúng một token ERC-721 trên Polygon.
- Vé **không thể chuyển nhượng** ở phiên bản đầu tiên (chống scalping).
- Smart Contract lưu hashes và metadata URI công khai — **không lưu dữ liệu cá nhân**.
- QR Code chứa challenge có chữ ký và thời hạn ngắn, không phải Token ID thô.

### Thông tin vé hiển thị cho người dùng

Người dùng thấy giao diện đặt vé thông thường. Thông tin Blockchain được hiển thị trong trang chi tiết vé:

| Thông tin | Mô tả |
|-----------|-------|
| Trạng thái vé | Đang xử lý / Đã xác nhận / Đã sử dụng |
| Mã vé | Booking hash nội bộ |
| Ghế | Mã ghế + hạng ghế |
| Suất chiếu | Tên phim, giờ chiếu, phòng chiếu |
| Rạp | Tên và địa chỉ rạp |
| QR Code | Dùng để check-in tại cổng |
| Token ID | Định danh NFT trên Blockchain |
| Transaction Hash | Mã giao dịch mint NFT trên Polygon |
| Địa chỉ ví | Ví MetaMask của người mua |

---

## Cài đặt

### Yêu cầu hệ thống

| Phần mềm | Phiên bản |
|----------|-----------|
| Node.js | 22 trở lên (khuyến nghị Node 24) |
| npm | 10 trở lên |
| PostgreSQL | 16+ (chỉ cần khi chạy migration, từ Phase 2) |
| Foundry | Chỉ cần khi phát triển Smart Contract (Phase 4) |

### Các bước cài đặt

```bash
# 1. Clone dự án
git clone <repository-url>
cd moviepass-nft

# 2. Cài đặt tất cả dependencies
npm install

# 3. Tạo file biến môi trường
cp .env.example .env
```

Chỉnh sửa file `.env` với thông tin kết nối PostgreSQL thực tế của bạn. **Không commit file `.env` vào Git.**

---

## Chạy dự án

### Chạy toàn bộ môi trường phát triển

Lệnh sau khởi động cả frontend (web) và backend (api) đồng thời:

```bash
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend khách hàng | http://localhost:3000 |
| API health check | http://localhost:4000/api/health |
| Web health route | http://localhost:3000/api/health |

### Chạy từng service riêng biệt

```bash
# Chỉ chạy frontend
npm run dev:web

# Chỉ chạy backend API
npm run dev:api
```

### Build production

```bash
npm run build
```

Lệnh này biên dịch NestJS API bằng TypeScript compiler, sau đó build Next.js cho production.

---

## Kiểm thử và xác thực

### Chạy toàn bộ kiểm thử

```bash
npm test
```

Bao gồm:
1. **Kiểm thử kiến trúc** — Xác nhận tất cả file cần thiết của Phase 1 tồn tại
2. **Kiểm thử schema** — Xác nhận các model chính có trong Prisma schema
3. **Kiểm thử contract config** — Xác nhận Solidity version `0.8.28` được cấu hình
4. **TypeScript typecheck** — Kiểm tra kiểu dữ liệu trên tất cả workspaces

### Xác thực schema cơ sở dữ liệu

```bash
npm run db:validate
```

Xác thực cú pháp và tính hợp lệ của `packages/database/prisma/schema.prisma` mà không cần kết nối database thực.

### Kiểm tra kiểu TypeScript

```bash
npm run typecheck
```

---

## Biến môi trường

Tham khảo file [`.env.example`](.env.example):

```bash
# Kết nối PostgreSQL — dùng cho API và các lệnh Prisma
DATABASE_URL="postgresql://moviepass:moviepass@localhost:5432/moviepass?schema=public"

# Cấu hình runtime cho API
API_PORT=4000
WEB_ORIGIN="http://localhost:3000"

# Thêm vào sau khi triển khai Smart Contract (Phase 4)
# POLYGON_AMOY_RPC_URL=""
# NFT_TICKET_CONTRACT_ADDRESS=""
# MINTER_PRIVATE_KEY=""
```

> ⚠️ **Quan trọng:** Không bao giờ commit `MINTER_PRIVATE_KEY` hay bất kỳ private key nào vào repository. Sử dụng deployment secrets trong môi trường production.

---

## Lộ trình phát triển

| Phase | Tên | Nội dung | Trạng thái |
|-------|-----|----------|------------|
| **1** | Nền tảng | Monorepo, service scaffolds, database schema, design system, tài liệu kiến trúc | ✅ Hoàn thành |
| **2** | Vận hành rạp | Xác thực admin; quản lý phim, rạp, phòng chiếu, sơ đồ ghế, suất chiếu, giá vé | 🔜 Tiếp theo |
| **3** | Đặt vé | Duyệt phim, sơ đồ ghế theo thời gian thực, giữ ghế tạm thời, quy trình đơn hàng | 🔜 Kế hoạch |
| **4** | Smart Contract NFT | ERC-721, phân quyền, đảm bảo tính duy nhất, không thể chuyển nhượng, check-in guard, Foundry tests, triển khai lên Polygon Amoy | 🔜 Kế hoạch |
| **5** | Tích hợp Web3 | Kết nối MetaMask, theo dõi xác nhận mint, tạo metadata IPFS, lịch sử giao dịch, trang Vé của tôi | 🔜 Kế hoạch |
| **6** | Check-in cổng vào | Tạo QR Code có chữ ký, giao diện scanner, xác thực on-chain, ghi nhận sử dụng một lần, báo cáo audit | 🔜 Kế hoạch |
| **7** | Chất lượng & trình bày | Kiểm thử end-to-end, đánh giá bảo mật, dữ liệu demo, tài liệu triển khai, tài liệu thuyết trình | 🔜 Kế hoạch |

---

## Tài liệu kỹ thuật

| Tài liệu | Mô tả |
|----------|-------|
| [Kiến trúc hệ thống](docs/architecture/overview.md) | Tổng quan kiến trúc hybrid Web3, sơ đồ luồng dữ liệu, phân định trách nhiệm giữa các lớp |
| [Thiết kế cơ sở dữ liệu](docs/database-design.md) | Quyết định thiết kế, quan hệ giữa các bảng, vị trí schema Prisma |
| [Mô hình bảo mật](docs/security-model.md) | Ranh giới tin cậy, quy tắc NFT, chính sách QR Code, kiểm soát vận hành |
| [Lộ trình phát triển](docs/development-roadmap.md) | Chi tiết từng Phase từ 1 đến 7 |

---

<div align="center">
  <sub>MoviePass · Dự án học thuật · Môn Công nghệ Blockchain · 2025</sub>
</div>
