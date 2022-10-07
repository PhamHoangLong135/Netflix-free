CHƯƠNG 4. XÂY DỰNG VÀ TRIỂN KHAI HỆ THỐNG

4.1 Ngôn ngữ và công cụ sử dụng để hỗ trợ và xây dựng website
4.1.1 Các ngôn ngữ sử dụng
	Javascript, HTML ,CSS, SASS, Reactjs, MongoDB.
4.1.2 Các công cụ để xây dựng
	Visual Studio Code, Note.js, Firebase.
4.1.3 Công cụ để quản lý code và tài liệu
	Github, Google Drive.

4.2 Sơ lược về bố cục của hệ thống website
Hệ thống website gồm 2 trang chính : trang admin và trang người dùng.
4.2.1 Trang admin
Ở trang này admin sẽ có thể theo dõi được :
•	Số lượng người đăng ký vào trang web.
•	Số lượng phim được admin tải lên và danh sách phim được tạo.
•	Thêm được phim và tạo danh sách phim mong muốn.
•	Chỉnh sửa được thông tin người dùng , thông tin phim và danh sách phim.
4.2.2 Trang người dùng
Ở trang này người dùng có thể :
•	Xem các phim trực tuyến mà trang web cung cấp.
•	Tìm kiếm phim một cách dễ dàng.
•	Thêm phim vào danh sách của mình để có thể xem dễ dàng hơn.
•	Trải nghiệm các thao tác một cách đơn giản để đem lại trải nghiệm cho người dùng.

4.3 Trang admin
4.3.1 Trang chủ
Ở trang chủ này, admin có thể theo dõi được số lượng người đăng ký theo từng tháng dựa trên biểu đồ hiển thị và cũng như số lượng người dùng mới đăng ký vào trang web xem phim.
 
Hình 4.2.1: Trang chủ của trang admin

4.3.2 Trang danh sách người dùng
Tại trang này, admin có thể xem một số thông tin của người dùng như là: tên, email, thời gian đăng ký và quyền hạn của tài khoản đó. Admin cũng có thể xóa tài khoản người dùng.
 
Hình 4.2.2: Trang danh sách người dùng
4.3.3 Trang chỉnh sửa thông tin người dùng
Khi admin nhấn vào nút Edit ở trang thông tin người dùng thì sẽ liên kết qua trang chỉnh sửa thông tin. Ở đây admin có thể chỉnh sửa một số thông tin cơ bản của người dùng.

Hình 4.2.3: Trang chỉnh sửa thông tin người dùng 

4.3.4 Trang tạo tài khoản
Ở đây admin có thể tạo tài khoản giống như việc đăng ký tài khoản bên trang người dùng, nhưng ở đây admin có thể cấp quyền cho tài khoản đó là admin hay người dùng 

Hình 4.2.4: Trang tạo tài khoản

4.3.5 Trang thông tin phim
Xem thông tin các phim đã được đăng trên web và có thể xóa các phim không muốn xuất hiện trên web ra khỏi danh sách đó. 

Hình 4.2.5: Trang thông tin phim

4.3.6 Trang chỉnh sửa thông tin phim
Có thể chỉnh sửa một số thông tin cơ bản của phim.

 Hình 4.2.6: Trang chỉnh sửa thông tin phim
 
4.3.7 Trang danh sách phim
Xem và xóa thông tin danh sách phim hiện có trên trang web.

 Hình 4.2.7: Trang danh sách phim

4.3.8 Trang chỉnh sửa thông tin danh sách phim
Có thể chỉnh sửa thông tin cơ bản của danh sách phim.

 Hình 4.2.8: Trang chỉnh sửa thông tin danh sách phim

4.3.9 Trang thêm phim
Tại đây admin có thể thêm bất kì bộ phim với đầy đủ thông tin cần thiết mà trang yêu cầu thì đều có thể thêm phim mới vào trang web.
Khi đã điền đầy đủ thông tin mà trang yêu cầu thì nhấn vào nút Update và chờ tới khi nào chuyển qua Create thì nhấn vào lần nữa thì phim sẽ được thêm vào.

 Hình 4.2.9: Trang thêm phim

4.3.10 Trang tạo danh sách
Ở đây admin có thể tạo mới một danh sách haocwj thêm phim đã có vào danh sách bất kỳ.

 Hình 4.2.10: Trang tạo danh sách

4.4 Trang người dùng
4.4.1 Đăng ký
Để vào trang xem phim thì người dùng buộc phải tạo tài khoản cho riêng mình tại trang đăng ký này.
 
Hình 4.3.1: Trang đăng lý

4.4.2 Đăng nhập
Khi người dùng đã đăng ký thành công thì trang đăng nhập sẽ xuất hiện, người dùng nhập thông tin mà mình đăng ký vào trang đăng nhập này. Khi đăng nhập thành công thì người dùng sẽ được vào trang chủ để xem phim.
 
Hình 4.3.2: Trang đăng nhập

4.4.3 Trang chủ (Home)
Khi đăng nhập thành công thì trang chủ sẽ xuất hiện để người dùng có thể bắt đầu trải nghiệm việc xem phim của mình.
 
Hình 4.3.3: Trang chủ

4.4.4 Trang phim bộ (Series)
Trang này cũng tương tự như trang chủ, nhưng nó chỉ hiển thị các danh sách phim bộ để người dùng dễ tìm kiếm.
 
Hình 4.3.4: Trang phim bộ

4.4.5 Trang phim lẻ (Movies)
Trang này cũng tương tự như trang chủ, nhưng nó chỉ hiển thị các danh sách phim lẻ để người dùng dễ tìm kiếm.
 
Hình 4.3.5: Trang phim lẻ

4.4.6 Trang danh sách của tôi (My List)
Đay là trang mà người dùng đã lưu các bộ phim mà mình yêu thích vào để có thể xem lại mà không phải kiếm lại phim đó.
 
Hình 4.3.6: Trang danh sách của tôi

4.4.7 Trang xem phim
Khi người dùng đã chọn được phim mà mình muốn xem và nhấn vào nút 
hoặc nút Play thì trang xem phim sẽ xuất hiện.
 
Hình 4.3.7: Trang xem phim

4.4.8 Thông tin chi tiết của phim 
Tại đây người dùng sẽ xem được thêm các thông tin về bộ phim mà mình muốn.
 
Hình 4.3.8: Thông tin chi tiết của phim

4.4.9 Chức năng tìm kiếm phim
Tại đây người dùng có thể tìm kiếm bất kỳ bộ phim nào mà mình muốn xem bằng cách nhập tên của tựa phim đó vào thì nó sẽ hiện ra như hình dưới đây.
 
Hình 4.3.9: Chức năng tìm kiếm
 
