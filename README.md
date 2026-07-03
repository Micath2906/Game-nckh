# 🎲 Radiation Bar - Game Phóng Xạ

Một trò chơi cân não kết hợp giữa kiến thức vật lý, sự lừa dối và một chút may rủi. Ai sẽ là người sống sót cuối cùng trước những tia phóng xạ chết chóc?

## 🎮 Giới thiệu

Radiation Bar là trò chơi kết hợp Russian Roulette với kiến thức về tia phóng xạ (Alpha, Beta, Gamma). Người chơi phải sử dụng kiến thức vật lý, kỹ năng phán đoán và một chút may mắn để sống sót.

## 📋 Luật chơi

### Chuẩn bị
- **Số người chơi**: 3-5 người
- **Trang bị mỗi người**:
  - 3 ❤️ (Tim/Mạng sống)
  - 3 lá chắn: 📄 Giấy (chặn α), 🔩 Nhôm (chặn α+β), 🔘 Chì (chặn tất cả)

### Tiến trình lượt chơi

1. **Giai đoạn Lý thuyết**: Người chơi rút một câu lý thuyết vật lý về tia phóng xạ
2. **Giai đoạn Thách thức**: 
   - Người chơi khác có thể "bắt bài" nếu nghĩ câu lý thuyết sai
   - Nếu bắt bài đúng: Nhận gợi ý về loại tia trong ổ đạn
   - Nếu bắt bài sai: Phải tự bóp cò
3. **Giai đoạn Bóp cò**:
   - Chọn lá chắn để bảo vệ (nếu muốn)
   - Bóp cò và hy vọng may mắn!

### Sát thương
- **Tia Alpha (α)**: -1❤️
- **Tia Beta (β)**: -2❤️  
- **Tia Gamma (γ)**: -3❤️

### Điều kiện thắng
Người chơi sống sót cuối cùng chiến thắng!

## 🚀 Cài đặt và Chạy

### Yêu cầu
- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn

### Cài đặt
```bash
# Clone repository
git clone https://github.com/Micath2906/Game-nckh.git
cd Game-nckh

# Cài đặt dependencies
npm install
```

### Chạy game
```bash
# Chế độ development
npm run dev

# Build cho production
npm run build

# Xem preview build
npm run preview
```

Sau khi chạy `npm run dev`, mở trình duyệt tại địa chỉ hiển thị (thường là http://localhost:5173)

## 🛠️ Công nghệ sử dụng

- **React 19**: Thư viện UI
- **Vite**: Build tool nhanh
- **CSS3**: Styling với gradient và animations
- **JavaScript ES6+**: Logic game

## 📚 Kiến thức vật lý

Game dựa trên kiến thức thực tế về ba loại tia phóng xạ:

### Tia Alpha (α)
- Hạt nhân Heli (2 proton + 2 neutron)
- Khối lượng lớn, tốc độ chậm
- Dễ bị chặn (giấy đã đủ)
- Mang điện tích dương (+2e)

### Tia Beta (β)
- Dòng electron chuyển động nhanh
- Khối lượng nhỏ, tốc độ cao
- Cần nhôm để chặn
- Mang điện tích âm

### Tia Gamma (γ)
- Sóng điện từ năng lượng cao
- Không khối lượng, tốc độ ánh sáng
- Khó chặn, cần chì dày
- Không mang điện tích

## 🎨 Tính năng

- ✅ Giao diện đẹp mắt với gradient và animations
- ✅ Game logic hoàn chỉnh theo đúng luật
- ✅ Hệ thống gợi ý thông minh
- ✅ Log game chi tiết
- ✅ Responsive design
- ✅ 20+ câu hỏi lý thuyết vật lý
- ✅ Hiệu ứng âm thanh và thị giác (sẵn sàng mở rộng)

## 📝 Tác giả

Game được phát triển cho mục đích nghiên cứu khoa học (NCKH), kết hợp giáo dục và giải trí.

## 📄 License

ISC License

---

**Chúc bạn chơi vui vẻ và học được nhiều kiến thức về vật lý! 🎓☢️**
