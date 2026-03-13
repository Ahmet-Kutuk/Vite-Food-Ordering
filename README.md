# 🍽️ Restoran POS

Modern, hızlı ve kullanımı kolay restoran sipariş yönetim sistemi. React + TypeScript + Firebase ile geliştirilmiştir.

![License](https://img.shields.io/badge/license-MIT-orange)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange)

---

## ✨ Özellikler

- 📋 **Menü Yönetimi** — Ürün ekleme, düzenleme, silme
- 🔍 **Arama & Filtreleme** — Kategori ve isimle anlık filtreleme
- 🛒 **Sipariş Yönetimi** — Sepet oluşturma, miktar kontrolü
- 💳 **Ödeme Alma** — Nakit, kart ve QR seçenekleri
- ☁️ **Firebase Entegrasyonu** — Firestore ile gerçek zamanlı veri
- 🖥️ **Tam Ekran Modu** — Kiosk kullanımı için
- 📱 **Responsive** — Tablet ve masaüstü uyumlu

---

## 🛠️ Teknoloji Stack

| Katman        | Teknoloji          |
| ------------- | ------------------ |
| UI Framework  | React 19           |
| Dil           | TypeScript 5.6     |
| Build Tool    | Vite 6             |
| CSS Framework | Bootstrap 5        |
| Backend       | Firebase Firestore |
| Hosting       | Firebase Hosting   |

---

## 🚀 Kurulum

### 1. Repoyu klonla

```bash
git clone https://github.com/kullaniciadi/restoran-pos.git
cd restoran-pos
```

### 2. Paketleri yükle

```bash
npm install
```

### 3. Firebase projesi oluştur

1. [Firebase Console](https://console.firebase.google.com)'a git
2. Yeni proje oluştur
3. Firestore Database'i aktif et (test mode)
4. Web uygulaması ekle, config'i kopyala

### 4. Environment variables

`.env.example`'ı kopyala ve kendi değerlerini gir:

```bash
cp .env.example .env
```

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Geliştirme sunucusunu başlat

```bash
npm run dev
```

Uygulama `http://localhost:5173` adresinde açılır.

---

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── menu/
│   │   ├── SearchBar.tsx        # Arama ve yeni ürün butonu
│   │   ├── CategoryFilter.tsx   # Kategori filtre butonları
│   │   ├── MenuCard.tsx         # Tekil ürün kartı
│   │   └── MenuGrid.tsx         # Ürün kartları grid'i
│   ├── modal/
│   │   └── EmojiPicker.tsx      # Emoji seçici
│   ├── Icon.tsx                 # Merkezi SVG icon sistemi
│   ├── MenuPanel.tsx            # Sol panel — menü
│   ├── OrderPanel.tsx           # Sağ panel — sipariş
│   ├── PaymentModal.tsx         # Ödeme modalı
│   ├── AddProductModal.tsx      # Ürün ekle/düzenle modalı
│   └── Topbar.tsx               # Üst navigasyon
├── hooks/
│   ├── useMenu.ts               # Menü state ve Firestore işlemleri
│   └── useOrder.ts              # Sipariş state yönetimi
├── services/
│   └── menuService.ts           # Firestore CRUD fonksiyonları
├── data/
│   └── initialMenu.ts           # Başlangıç menü verileri
├── types/
│   └── index.ts                 # TypeScript tip tanımları
├── firebase.ts                  # Firebase başlatma
├── App.tsx                      # Ana uygulama
└── main.tsx                     # Giriş noktası
```

---

## 🧑‍💻 Geliştirme

```bash
npm run dev

# Build
npm run build

# Lint
npm run lint

# Build önizleme
npm run preview
```

---

## 📝 Lisans

MIT
