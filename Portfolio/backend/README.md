# Portfolio Backend

Bu backend, portfolio sitenizin contact form'u için email gönderme sistemi sağlar.

## 🚀 Kurulum

### 1. Dependencies Yükle
```bash
npm install
```

### 2. Gmail App Password Oluştur
1. **Google Account Settings** → Security
2. **2-Step Verification** → App passwords
3. **Generate** → "Portfolio" adında yeni password oluştur
4. **16 karakterlik password'ü kopyala**

### 3. Environment Variables Ayarla
`.env` dosyası oluştur:
```env
EMAIL_USER=sabiraliyev2005@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### 4. Server'ı Başlat
```bash
# Development
npm run dev

# Production
npm start
```

## 📧 Email Template

Gelen emailler şu formatta olacak:
- **Subject:** Portfolio'dan Yeni Mesaj - [İsim] [Soyisim]
- **From:** [İsim] [Soyisim] <sabiraliyev2005@gmail.com>
- **Content:** Temiz HTML formatında mesaj

## 🌐 Kullanım

1. **Frontend:** `http://localhost:3000`
2. **API Endpoint:** `POST /api/contact`
3. **Form doldur** → Email otomatik gönderilir

## 🔧 Özellikler

- ✅ Temiz email formatı
- ✅ CORS desteği
- ✅ Error handling
- ✅ Form validation
- ✅ Responsive design
