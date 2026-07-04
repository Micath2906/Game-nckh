// Câu hỏi mặc định cho từng môn học

export const SUBJECT_QUESTIONS = {
  physics: [
    { id: 1, statement: 'Tia Alpha là hạt nhân Heli', isTrue: true, explanation: 'Đúng. Tia Alpha gồm 2 proton và 2 neutron' },
    { id: 2, statement: 'Tia Beta là dòng electron', isTrue: true, explanation: 'Đúng. Tia Beta là electron phát ra từ hạt nhân' },
    { id: 3, statement: 'Tia Gamma là sóng điện từ', isTrue: true, explanation: 'Đúng. Tia Gamma là bức xạ năng lượng cao' },
    { id: 4, statement: 'Giấy có thể chặn tia Gamma', isTrue: false, explanation: 'Sai. Chỉ có chì mới chặn được Gamma' },
    { id: 5, statement: 'Nhôm có thể chặn tia Alpha và Beta', isTrue: true, explanation: 'Đúng. Nhôm chặn được cả Alpha và Beta' },
    { id: 6, statement: 'Tia Alpha có tốc độ cao nhất', isTrue: false, explanation: 'Sai. Tia Gamma có tốc độ ánh sáng' },
    { id: 7, statement: 'Phóng xạ là hiện tượng vật lý', isTrue: true, explanation: 'Đúng. Là quá trình hạt nhân tự phân rã' },
    { id: 8, statement: 'Tia Beta mang điện tích âm', isTrue: true, explanation: 'Đúng. Electron mang điện tích âm' },
    { id: 9, statement: 'Chì có thể chặn mọi loại tia phóng xạ', isTrue: true, explanation: 'Đúng. Chì là lá chắn tốt nhất' },
    { id: 10, statement: 'Tia Beta có khối lượng lớn hơn tia Alpha', isTrue: false, explanation: 'Sai. Electron nhỏ hơn nhiều so với hạt Alpha' },
    { id: 11, statement: 'Ánh sáng truyền thẳng trong môi trường đồng tính', isTrue: true, explanation: 'Đúng. Định luật truyền thẳng ánh sáng' },
    { id: 12, statement: 'Tốc độ ánh sáng trong chân không là 3×10⁸ m/s', isTrue: true, explanation: 'Đúng. Đây là hằng số vật lý cơ bản' },
    { id: 13, statement: 'Sóng âm truyền được trong chân không', isTrue: false, explanation: 'Sai. Sóng âm cần môi trường truyền' },
    { id: 14, statement: 'Gia tốc trọng trường trên Trái Đất là 9.8 m/s²', isTrue: true, explanation: 'Đúng. Giá trị trung bình tại mặt đất' },
    { id: 15, statement: 'Năng lượng được bảo toàn trong hệ cô lập', isTrue: true, explanation: 'Đúng. Định luật bảo toàn năng lượng' }
  ],
  
  chemistry: [
    { id: 1, statement: 'Nước có công thức hóa học là H2O', isTrue: true, explanation: 'Đúng. 2 nguyên tử H và 1 nguyên tử O' },
    { id: 2, statement: 'Oxy là khí trơ', isTrue: false, explanation: 'Sai. Oxy rất hoạt động, khí trơ là Heli, Neon...' },
    { id: 3, statement: 'Acid có pH nhỏ hơn 7', isTrue: true, explanation: 'Đúng. pH < 7 là acid, pH > 7 là base' },
    { id: 4, statement: 'Muối ăn là NaCl', isTrue: true, explanation: 'Đúng. Natri Clorua' },
    { id: 5, statement: 'Kim loại kiềm phản ứng mạnh với nước', isTrue: true, explanation: 'Đúng. Tạo hiđroxit và giải phóng H2' },
    { id: 6, statement: 'CO2 là khí gây hiệu ứng nhà kính', isTrue: true, explanation: 'Đúng. Cacbon điôxit hấp thụ bức xạ nhiệt' },
    { id: 7, statement: 'Vàng có ký hiệu hóa học là Au', isTrue: true, explanation: 'Đúng. Từ tiếng Latin Aurum' },
    { id: 8, statement: 'Nước là hợp chất hữu cơ', isTrue: false, explanation: 'Sai. Nước là hợp chất vô cơ' },
    { id: 9, statement: 'Methan là khí nhà kính mạnh hơn CO2', isTrue: true, explanation: 'Đúng. CH4 mạnh gấp 25 lần CO2' },
    { id: 10, statement: 'Số Avogadro là 6.02×10²³', isTrue: true, explanation: 'Đúng. Số hạt trong 1 mol' },
    { id: 11, statement: 'Bảng tuần hoàn có 118 nguyên tố', isTrue: true, explanation: 'Đúng. Tính đến năm 2023' },
    { id: 12, statement: 'Protein được cấu tạo từ amino acid', isTrue: true, explanation: 'Đúng. Chuỗi polypeptide' },
    { id: 13, statement: 'Kim cương và than chì đều là Carbon', isTrue: true, explanation: 'Đúng. Chỉ khác về cấu trúc tinh thể' },
    { id: 14, statement: 'Phản ứng thu nhiệt là phản ứng tỏa năng lượng', isTrue: false, explanation: 'Sai. Phản ứng thu nhiệt cần năng lượng' },
    { id: 15, statement: 'Clo có màu vàng lục', isTrue: true, explanation: 'Đúng. Khí clo có màu vàng lục đặc trưng' }
  ],
  
  biology: [
    { id: 1, statement: 'DNA mang thông tin di truyền', isTrue: true, explanation: 'Đúng. DNA chứa mã di truyền' },
    { id: 2, statement: 'Tế bào là đơn vị cơ bản của sự sống', isTrue: true, explanation: 'Đúng. Học thuyết tế bào' },
    { id: 3, statement: 'Quang hợp xảy ra ở lục lạp', isTrue: true, explanation: 'Đúng. Chứa chất diệp lục' },
    { id: 4, statement: 'Con người có 46 nhiễm sắc thể', isTrue: true, explanation: 'Đúng. 23 cặp NST' },
    { id: 5, statement: 'Virut là sinh vật đơn bào', isTrue: false, explanation: 'Sai. Virut không có cấu trúc tế bào' },
    { id: 6, statement: 'Ty thể sản xuất năng lượng ATP', isTrue: true, explanation: 'Đúng. Nhà máy năng lượng của tế bào' },
    { id: 7, statement: 'Enzyme là chất xúc tác sinh học', isTrue: true, explanation: 'Đúng. Protein có hoạt tính xúc tác' },
    { id: 8, statement: 'Hô hấp tế bào giải phóng năng lượng', isTrue: true, explanation: 'Đúng. Chuyển hóa glucose thành ATP' },
    { id: 9, statement: 'Vi khuẩn có nhân thực sự', isTrue: false, explanation: 'Sai. Vi khuẩn là sinh vật nhân sơ' },
    { id: 10, statement: 'RNA tham gia tổng hợp protein', isTrue: true, explanation: 'Đúng. mRNA, tRNA, rRNA' },
    { id: 11, statement: 'Tất cả động vật đều cần oxy', isTrue: false, explanation: 'Sai. Một số sinh vật yếm khí' },
    { id: 12, statement: 'Gen là đoạn DNA mã hóa protein', isTrue: true, explanation: 'Đúng. Đơn vị di truyền cơ bản' },
    { id: 13, statement: 'Thực vật thực hiện quang hợp ban đêm', isTrue: false, explanation: 'Sai. Quang hợp cần ánh sáng' },
    { id: 14, statement: 'Hệ sinh thái bao gồm sinh vật và môi trường', isTrue: true, explanation: 'Đúng. Tương tác giữa sinh vật và vô sinh' },
    { id: 15, statement: 'Đột biến gen luôn có hại', isTrue: false, explanation: 'Sai. Đột biến có thể có lợi, có hại hoặc trung tính' }
  ],
  
  math: [
    { id: 1, statement: 'Số Pi có giá trị xấp xỉ 3.14', isTrue: true, explanation: 'Đúng. π ≈ 3.14159...' },
    { id: 2, statement: '0 chia cho 0 bằng 1', isTrue: false, explanation: 'Sai. 0/0 là dạng vô định' },
    { id: 3, statement: 'Tổng các góc trong tam giác là 180°', isTrue: true, explanation: 'Đúng. Định lý hình học Euclid' },
    { id: 4, statement: 'Số âm nhân số âm ra số dương', isTrue: true, explanation: 'Đúng. (-a) × (-b) = ab' },
    { id: 5, statement: 'Căn bậc hai của 9 là 3', isTrue: true, explanation: 'Đúng. √9 = ±3, nhưng thường lấy 3' },
    { id: 6, statement: 'Hàm số f(x) = x² là hàm chẵn', isTrue: true, explanation: 'Đúng. f(-x) = f(x)' },
    { id: 7, statement: 'Logarit cơ số 10 của 100 là 2', isTrue: true, explanation: 'Đúng. log₁₀(100) = 2' },
    { id: 8, statement: 'Đạo hàm của hằng số khác 0', isTrue: false, explanation: 'Sai. Đạo hàm của hằng số bằng 0' },
    { id: 9, statement: 'e là cơ số của logarit tự nhiên', isTrue: true, explanation: 'Đúng. e ≈ 2.71828...' },
    { id: 10, statement: '1 là số nguyên tố', isTrue: false, explanation: 'Sai. Số nguyên tố phải lớn hơn 1' },
    { id: 11, statement: 'Định lý Pythagoras: a² + b² = c²', isTrue: true, explanation: 'Đúng. Cho tam giác vuông' },
    { id: 12, statement: 'Sin²x + Cos²x = 1', isTrue: true, explanation: 'Đúng. Công thức lượng giác cơ bản' },
    { id: 13, statement: 'Tích phân là phép toán ngược của đạo hàm', isTrue: true, explanation: 'Đúng. Định lý cơ bản giải tích' },
    { id: 14, statement: 'Ma trận luôn có định thức', isTrue: false, explanation: 'Sai. Chỉ ma trận vuông mới có định thức' },
    { id: 15, statement: 'Số phức có dạng a + bi', isTrue: true, explanation: 'Đúng. a là phần thực, bi là phần ảo' }
  ],
  
  literature: [
    { id: 1, statement: 'Nguyễn Du là tác giả Truyện Kiều', isTrue: true, explanation: 'Đúng. Tác phẩm vĩ đại nhất văn học Việt Nam' },
    { id: 2, statement: 'Truyện Kiều có 3254 câu thơ lục bát', isTrue: true, explanation: 'Đúng. Đúng 3254 câu' },
    { id: 3, statement: 'Tố Hữu là nhà thơ cách mạng', isTrue: true, explanation: 'Đúng. Tác giả "Việt Bắc"' },
    { id: 4, statement: 'Chữ Nôm được tạo từ chữ Hán', isTrue: true, explanation: 'Đúng. Hệ thống chữ viết cổ Việt Nam' },
    { id: 5, statement: 'Hồ Xuân Hương được mệnh danh "Bà chúa thơ Nôm"', isTrue: true, explanation: 'Đúng. Nữ thi sĩ nổi tiếng thời Lê' },
    { id: 6, statement: 'Nam Cao viết "Lão Hạc"', isTrue: true, explanation: 'Đúng. Tác phẩm hiện thực xuất sắc' },
    { id: 7, statement: 'Shakespeare là nhà văn Pháp', isTrue: false, explanation: 'Sai. Shakespeare là nhà văn Anh' },
    { id: 8, statement: '"Chí Phèo" là tác phẩm của Nam Cao', isTrue: true, explanation: 'Đúng. Vẽ nên số phận người nông dân' },
    { id: 9, statement: 'Thơ lục bát có vần chéo', isTrue: true, explanation: 'Đúng. Câu 6 vần với câu 8 tiếp theo' },
    { id: 10, statement: 'Xuân Diệu được gọi là "Vua thơ tình"', isTrue: true, explanation: 'Đúng. Thơ tình lãng mạn độc đáo' },
    { id: 11, statement: 'Nguyễn Trãi soạn "Bình Ngô đại cáo"', isTrue: true, explanation: 'Đúng. Tác phẩm văn xuôi kiệt tác' },
    { id: 12, statement: '"Số đỏ" là tác phẩm của Vũ Trọng Phụng', isTrue: true, explanation: 'Đúng. Phê phán xã hội sắc bén' },
    { id: 13, statement: 'Hồ Chí Minh viết "Nhật ký trong tù"', isTrue: true, explanation: 'Đúng. Thơ Bác Hồ viết năm 1942-1943' },
    { id: 14, statement: 'Thơ Đường luật có 8 câu', isTrue: true, explanation: 'Đúng. Thể thơ cổ Trung Hoa' },
    { id: 15, statement: '"Tắt đèn" là tác phẩm của Ngô Tất Tố', isTrue: true, explanation: 'Đúng. Tiểu thuyết hiện thực phê phán' }
  ],
  
  history: [
    { id: 1, statement: 'Chiến thắng Điện Biên Phủ năm 1954', isTrue: true, explanation: 'Đúng. 7/5/1954 lịch sử' },
    { id: 2, statement: 'Việt Nam thống nhất năm 1975', isTrue: true, explanation: 'Đúng. 30/4/1975' },
    { id: 3, statement: 'Khởi nghĩa Bạch Đằng diễn ra năm 938', isTrue: true, explanation: 'Đúng. Ngô Quyền đánh tan quân Nam Hán' },
    { id: 4, statement: 'Chiến tranh thế giới thứ 2 kết thúc năm 1945', isTrue: true, explanation: 'Đúng. Ngày 2/9/1945' },
    { id: 5, statement: 'Cách mạng tháng Tám thành công năm 1945', isTrue: true, explanation: 'Đúng. Tháng 8/1945' },
    { id: 6, statement: 'Hội nghị Yalta năm 1945', isTrue: true, explanation: 'Đúng. Hội nghị của các cường quốc' },
    { id: 7, statement: 'Trận Waterloo Napoleon thua năm 1815', isTrue: true, explanation: 'Đúng. Kết thúc đế chế Napoleon' },
    { id: 8, statement: 'Bức tường Berlin sụp đổ năm 1989', isTrue: true, explanation: 'Đúng. 9/11/1989' },
    { id: 9, statement: 'Liên Xô tan rã năm 1991', isTrue: true, explanation: 'Đúng. Kết thúc chiến tranh lạnh' },
    { id: 10, statement: 'Columbus khám phá châu Mỹ năm 1492', isTrue: true, explanation: 'Đúng. Tháng 10/1492' },
    { id: 11, statement: 'Cách mạng tháng Mười Nga năm 1917', isTrue: true, explanation: 'Đúng. Tháng 11/1917' },
    { id: 12, statement: 'Vương triều cuối cùng của Việt Nam là nhà Nguyễn', isTrue: true, explanation: 'Đúng. 1802-1945' },
    { id: 13, statement: 'Khởi nghĩa Hai Bà Trưng năm 40', isTrue: true, explanation: 'Đúng. Năm 40 sau Công nguyên' },
    { id: 14, statement: 'Chiến tranh thế giới thứ nhất bắt đầu năm 1914', isTrue: true, explanation: 'Đúng. 1914-1918' },
    { id: 15, statement: 'Chủ nghĩa phát xít phát triển sau WW1', isTrue: true, explanation: 'Đúng. Tại Ý, Đức, Nhật' }
  ]
}

// Hàm lấy câu hỏi theo môn
export function getQuestionsBySubject(subjectId) {
  return SUBJECT_QUESTIONS[subjectId] || []
}
