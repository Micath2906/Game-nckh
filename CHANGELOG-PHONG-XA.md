# 📝 CHANGELOG - Cập nhật bài "Phóng Xạ" (Vật lý 12)

## 🎯 Mục tiêu
Áp dụng luật chơi cho bài "Phóng xạ và Hạt nhân" với cơ chế: **Ai sai phải đi**, không có đẩy vai

## ✅ Các thay đổi đã thực hiện (Phiên bản cuối)

### 1. **File: `src/App.jsx`**
**Thay đổi:** Bỏ Thẻ Đẩy vai, giữ cấu trúc đơn giản
- Chỉ có: `hearts`, `shields`, `isAlive`, `hints`
- **Bỏ:** `pushCard`, `lastPushedBy`

**Dòng:** 66-76

---

### 2. **File: `src/components/GameScreen.jsx`**
**Các thay đổi chính:**

#### a) State đơn giản hơn (dòng 7-10):
- `gamePhase: 'draw'` - Bắt đầu luôn từ rút bài
- `waveNumber: 1` - Đợt sóng phóng xạ
- **Bỏ:** `selectedPushTarget`, `actualPlayerIndex`

#### b) Ổ đạn giảm dần theo đợt sóng (dòng 24-36):
```javascript
const chamberSize = Math.max(1, 5 - waveNumber)
// Đợt 1: 4 viên (25% trúng)
// Đợt 2: 3 viên (33% trúng)
// Đợt 3: 2 viên (50% trúng)
// Đợt 4+: 1 viên (100% trúng)
```

#### c) Logic "Ai sai phải đi" (dòng 64-103):
- **Người đọc bài nói dối** → Người đọc bài phải bóp cò
- **Người bắt bài sai** → Người bắt bài phải bóp cò
- Người bắt bài đúng nhận phương trình phân rã

#### d) Phương trình phân rã khi bắt bài đúng:
```javascript
const equation = `N = ${N0}·(1/2)^(t/${T}), biết N = ${N.toFixed(1)}. Tính t?`
randomPlayer.hints.push({ hint, equation, answer: turnsUntilBullet })
```

#### e) Lá chắn được chọn TRONG giai đoạn shoot:
- Người phải bóp cò được quyền chọn lá chắn trước khi bóp
- Mỗi loại lá chắn chỉ dùng 1 lần/trận

#### f) UI hiển thị (dòng 220-228):
- Tên game: "☢️ PHÓNG XẠ BAR"
- Hiển thị đợt sóng hiện tại và số viên còn lại
- **Bỏ:** Giai đoạn đẩy vai, UI chọn người đẩy

---

### 3. **File: `src/components/PlayerCard.jsx`**
**Thay đổi:** Bỏ hiển thị Thẻ Đẩy vai

#### a) Label đơn giản (dòng 71):
- "Lá chắn bảo vệ"

#### b) Chỉ hiển thị 3 lá chắn (dòng 72-118):
- 📄 Giấy
- 🔩 Nhôm
- 🧱 Chì

#### c) Hiển thị phương trình trong gợi ý (dòng 142-152):
- Hỗ trợ object `{ hint, equation, answer }`
- Hiển thị phương trình với icon 📐

---

### 4. **File: `README.md`**
**Thay đổi:** Cập nhật toàn bộ mô tả game

#### Nội dung mới:
- **Bối cảnh:** Lõi nghiên cứu, không còn đẩy vai
- **Bước 1-3:** Rút bài → Thách thức → Phán xét
- **Bước 4:** **Ai sai chọn lá chắn rồi bóp cò**
- **Đợt sóng phóng xạ:** Bảng giảm dần 4→3→2→1 viên
- **Gợi ý phương trình:** Giải N = N₀·(1/2)^(t/T)
- **Điều kiện thắng:** Sống sót cuối hoặc trả lời Câu Then chốt

---

## 🔒 Các file KHÔNG thay đổi (engine dùng chung)

- `src/data/theories.js` - Dữ liệu tia phóng xạ
- `src/data/subjectQuestions.js` - Câu hỏi các môn
- `src/components/SubjectSelection.jsx` - Chọn môn
- `src/components/LessonSelection.jsx` - Chọn bài
- `src/components/QuestionManager.jsx` - Công cụ tạo câu hỏi
- `src/components/SetupScreen.jsx` - Màn hình setup
- `src/components/WinnerScreen.jsx` - Màn hình thắng cuộc
- `src/components/GameLog.jsx` - Log game
- `src/components/Navbar.jsx` - Navigation

---

## ✅ Xác nhận tính tương thích

### Build thành công:
```
✓ 33 modules transformed.
dist/index.html                   0.90 kB │ gzip:  0.59 kB
dist/assets/index-Drv5NKHl.css   80.49 kB │ gzip: 13.35 kB
dist/assets/index-BhgJMqtM.js   297.52 kB │ gzip: 88.83 kB
```

### Các môn/bài khác:
- **Không bị ảnh hưởng** - Engine `GameScreen.jsx` nhận dữ liệu qua prop `customQuestions`
- Mỗi môn dùng câu hỏi riêng từ `subjectQuestions.js`
- Cấu trúc player chung (Tim, lá chắn) áp dụng cho tất cả môn

---

## 🎮 Luật chơi đã implement

✅ **1. Bối cảnh:** Tiếp cận lõi nghiên cứu, phóng xạ mạnh dần  
✅ **2. Ai sai phải đi:** Không có đẩy vai, người sai tự chịu trách nhiệm  
✅ **3. Chọn lá chắn trước:** Người phải bóp cò được chọn lá chắn (mỗi loại 1 lần)  
✅ **4. Ổ giảm dần:** 4→3→2→1 viên, luôn 1 viên lỗi  
✅ **5. Sát thương:** Alpha(1), Beta(2), Gamma(3)  
✅ **6. Phương trình:** N = N₀·(1/2)^(t/T) khi bắt bài đúng  
✅ **7. Dữ liệu chung:** Gợi ý thuộc cả nhóm  
✅ **8. Điều kiện thắng:** Sống sót cuối hoặc trả lời Câu Then chốt  

---

## 🚀 Cách chạy game

```bash
npm run dev
# Hoặc
npm run build && npm run preview
```

Chọn môn **Vật Lý** → Bài **Phóng xạ và Hạt nhân** → Bắt đầu chơi!

---

**Ngày cập nhật:** 8/7/2026  
**Phiên bản:** 2.1 - Ai sai phải đi  
**Tài liệu tham khảo:** Getter-Saver-LuatChoi-v2.docx (điều chỉnh theo feedback)
