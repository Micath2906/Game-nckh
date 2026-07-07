# ☢️ Phóng Xạ Bar - Radiation Bar

Một trò chơi cân não với bí mật, lừa dối và may rủi. Ai sẽ là người sống sót cuối cùng khi lõi nghiên cứu ngày càng bất ổn?

## 🌍 Bối cảnh

Trái Đất đang suy vong vì nguồn phóng xạ lan rộng. Chỉ có **LÕI NGHIÊN CỨU** nằm sâu trong vùng nhiễm xạ mới chứa dữ liệu cứu nhân loại.

Cả nhóm buộc phải **luân phiên tiếp cận lõi** để đo dữ liệu. Nhưng không ai biết chính xác **loại sóng phóng xạ** hay **vị trí nguy hiểm**. Chỉ những người **bắt bài đúng** mới nhận được gợi ý bí mật.

Người trụ lại sau cùng là **người tận dụng tốt nhất thông tin bí mật** và biết chọn giáp phù hợp.

## 📋 Luật chơi

### Chuẩn bị
- **Số người chơi**: 3-5 người/nhóm
- **Trang bị mỗi người**:
  - 3 ❤️ (Tim/Mạng sống)
  - 3 giáp: 📄 Giáp Giấy (chặn α), 🔩 Giáp Nhôm (chặn α+β), 🧱 Giáp Chì (chặn tất cả)

### Tiến trình lượt chơi

#### **Bước 1 — Tuyên bố lý thuyết**
Người đến lượt rút bài lý thuyết về tia phóng xạ, đọc to. **Không ai biết đáp án đúng/sai** — có thể đọc đúng hoặc cố tình đọc sai để bẫy người khác.

#### **Bước 2 — Thách thức (10 giây)**
Các thành viên còn lại có thể "bắt bài" nếu nghi ngờ:
- **Không ai bắt bài** → lượt an toàn
- **Có người bắt bài** → phải giải thích chỗ sai và sửa lại

#### **Bước 3 — Phán xét (Bí mật)**
- **Bắt bài đúng** → Người bắt bài nhận **gợi ý bí mật** về loại sóng và vị trí; **người đọc sai phải đo đạc**
- **Bắt bài sai** → **Người bắt bài phải đo đạc**

**🔒 Gợi ý riêng tư** - Chỉ người bắt bài đúng mới thấy:
- Loại sóng hiện tại (α/β/γ)
- Phương trình phân rã để tính vị trí nguy hiểm
- Thông tin này **CHỈ người đó xem được**, không chia sẻ công khai

#### **Bước 4 — Chọn giáp và Đo đạc**
**Người phải đo đạc được chọn giáp trước** (mỗi loại dùng 1 lần/trận):
- 📄 **Giáp Giấy** → Chặn α
- 🔩 **Giáp Nhôm** → Chặn α + β  
- 🧱 **Giáp Chì** → Chặn tất cả

Sau đó đi đo đạc:
- **An toàn** → Không trúng sóng
- **Trúng sóng** → Trừ máu (trừ khi giáp đúng loại)

### ☢️ Đợt sóng phóng xạ (Bí mật)

**Không ai biết** loại sóng là gì cho đến khi:
1. Trúng sóng (nhận sát thương)
2. Bắt bài đúng (nhận gợi ý riêng tư)

Mỗi đợt sóng:
- Số vị trí đo giảm dần: 4 → 3 → 2 → 1
- Luôn có đúng 1 vị trí nguy hiểm
- Loại sóng thay đổi ngẫu nhiên mỗi đợt

| Đợt sóng | Vị trí đo | Vị trí nguy hiểm | Tỉ lệ trúng |
|----------|-----------|------------------|-------------|
| Đợt 1    | 4 vị trí  | 1 vị trí         | 25%         |
| Đợt 2    | 3 vị trí  | 1 vị trí         | 33%         |
| Đợt 3    | 2 vị trí  | 1 vị trí         | 50%         |
| Đợt 4+   | 1 vị trí  | 1 vị trí         | 100%        |

### Sát thương
- **Tia Alpha (α)**: -1❤️ (chặn bằng Giáp Giấy)
- **Tia Beta (β)**: -2❤️ (chặn bằng Giáp Nhôm)
- **Tia Gamma (γ)**: -3❤️ (chặn bằng Giáp Chì)

**Nếu dùng giáp đúng loại → Không trừ máu**

### 🧮 Gợi ý bí mật

Khi bắt bài thành công, nhận:
```
Đợt 3: Tia Beta (β)
Gợi ý: Tia này là dòng electron
Phương trình: N = 8·(1/2)^(t/1), biết N = 2. Tính t?
```

Giải phương trình → biết **lượt nào** vị trí nguy hiểm xuất hiện → chọn giáp phù hợp hoặc tránh rủi ro.

**Lưu ý:** Thông tin này CHỈ bạn xem, đừng chia sẻ trừ khi muốn giúp đội!

### 🏆 Điều kiện thắng
1. **Người duy nhất còn Tim** trong nhóm
2. **Trả lời đúng Câu hỏi Then chốt** khi hết giờ

→ Người thắng là **người tận dụng tốt nhất thông tin bí mật**!

## 🚀 Cài đặt và Chạy

```bash
npm install
npm run dev
```

Chọn **Vật Lý → Phóng xạ và Hạt nhân** để bắt đầu!

## 📚 Kiến thức vật lý

Game dựa trên ba loại tia phóng xạ thực tế:
- **Tia Alpha (α)**: Hạt nhân Heli, chặn bằng giấy
- **Tia Beta (β)**: Dòng electron, chặn bằng nhôm
- **Tia Gamma (γ)**: Sóng điện từ, chặn bằng chì dày

---

**Chúc bạn chơi vui và học được nhiều kiến thức! 🎓☢️**
