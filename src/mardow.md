- **cache**
- lưu lại data để những request kế tiếp cần dataddos được trả veef nhanh hơn. 
- DAta lưu trong cache có thể là kết quả của lần tính toán trước hoặc 1 phần dữ liệu được lưu ở nơi khác 
- là khi dữ liệu được tìm thấy trong cache
- **cache miss**
- là khi dữ liệu yêu cầu không tìm thấy trong cache
- *read through*: trong trường hợp cache miss, delay cao do cần đến 3 network round trip
- Nếu có thay đổi trong database và cache chưa expire -> trả về data cũ cho ứng dụng.
- *write through*: Thêm cập nhật database cũng sẽ cập nhập trong cache.
- Hai thao tác này xảy ra trong cùng 1 transaction
- Đảm bảo dữ liệu trong cache luôn là mới nhất 
- *write behind caching*: Data được ghi trực tiếp vào cache, Sau đó data mới được ghi vào database bất đồng bộ, phù hợp với các hệ thống có nhu cầu read/write cao. - bất đồng bộ giữa cache và database - write cache và database không được xử lý trong 1 transaction nên phải có cơ chế rollback nếu dữ liệu không thể write vào database
**REdis**
- Chạy ở bên trong Ram là lưu trữ ở đó. nếu hệ thống hống dữ liệu bên trong sẽ mất.
- Redis là một kho lưu trữ cấu trúc dữ liệu trong bộ nhớ mã nguồn mở (được cấp phép BSD), được sử dụng làm cơ sở dữ liệu, bộ nhớ đệm, trình trung gian thông báo và công cụ phát trực tuyến. 

- **what is redis**

- redis is an open source, BDS licensed advancced key-value store

- an in-memory key-value store, with persistence 

- open source

- written in c 

- **what is redis used for**

- redis is an advanced key-value store that can function as a NoSql database or as a memory-cache store to improve performance when serving data  that is stored in system memory

- **how to interact with Redis**

- Once installed in a server, run the Redis Cli(command Line Interface) to issue commands to Redis . Wile working on the CLI tool, your command-line prompt will change to: redis>

**data type**
* Redis Strings

- Chuỗi Redis lưu trữ chuỗi byte, bao gồm văn bản, đối tượng được tuần tự hóa và mảng nhị phân. Như vậy, chuỗi là kiểu dữ liệu Redis cơ bản nhất. Chúng thường được sử dụng cho bộ nhớ đệm, nhưng chúng hỗ trợ chức năng bổ sung cho phép bạn triển khai bộ đếm và thực hiện các thao tác theo bit.

**Limits**

- Theo mặc định, một chuỗi Redis có thể có kích thước tối đa là 512 MB.

**Basic commands**
- **Getting and setting Strings**

- SETlưu trữ một giá trị chuỗi.

- SETNXchỉ lưu trữ một giá trị chuỗi nếu khóa chưa tồn tại. Hữu ích cho việc thực hiện khóa.

- GETlấy một giá trị chuỗi.

- MGETtruy xuất nhiều giá trị chuỗi trong một thao tác.

- Lệnh LTRIMtương tự như LRANGE, nhưng thay vì hiển thị phạm vi phần tử đã chỉ định , nó đặt phạm vi này làm giá trị danh sách mới.

- hget lấy giá trị hiện ra của hash 

- *hincrby* : tăng số nguyên theo ta muốn cho 

- *mysadd* thêm phần tử vào tập hợp của mình và *smembers* sẽ sắp xếp chuỗi đó nếu từ thấp đến cao, ngoài ra còn có thể kiểm tra phần tử đó có tồn tại  hay không

- *zrange*: sắp xếp  nếu 0 -1 sẽ là từ nhỏ đến lớn 

- *zrevrange*: sắp xếp từ lớn đến nhỏ

- *zrangebyscore* hackers -inf : lấy những tập hợp từ nhỏ đến số ta chỉ đỉnh là bao nhiêu *zremrangebyscore hackers 1940 1960*: nếu ta muốn truyền vào đối số để loại bỏ trong một khoảng nào đó. 

- *zrangebylex hackers [B [P*  : chúng ta có thể yêu cầu sắp xếp theo phạm vi từ điển

- *setex*: tao va xoa trong mot khoang thoi gian nao do 

- *flushall* : xóa tất cả đối tượng ta đã tạo 

- *decr*: giảm giá trị đi 1 *incr* Tăng giá trị lên một 

- *incrby* tăng giá trị lên bao nhiêu cũng được theo ta muốn. ngược lại với tăng *decrby* giảm

- append nối chuỗi lại với nhau.

- **hash**
- HSETđặt giá trị của một hoặc nhiều trường trên hàm băm.
- HGETtrả về giá trị tại một trường nhất định.
- HMGETtrả về các giá trị tại một hoặc nhiều trường nhất định.
- HINCRBYtăng giá trị tại một trường nhất định theo số nguyên được cung cấp.

- **list**

-  *lpush*: thêm phần tử bên trái

-  *rpush*: thêm phần tử mới vào bên phải

-  *lrange*: liệt kê các danh sách phần tử 

- **set**

- *sadd*: thêm giá trị cho 1 đối tượng 

- *scard*: xem trong doi tuong co bao nhieu gia tri 

- *smembers*: hiển thị tat ca gia tri trong doi tuong do 

- *sdiff*: Su khac  nhau giữa đối tượng 1 đối với đối tượng 2 

- *sunionstore*: gộp  lại tất cả các giá và sắp xêp có trong đối tương và trả về cho đối tương k có giá trị

- *spop* xoas cac  gia trị ngẫu nhiên của đối tượng nếu ta cho vào số bao nhiêu thì sẽ random bao nhiêu số để xóa.

- *sinter* giao điểm những giá trị giống nhau trong đói tượng. 

- **sorted sets**

- ZADDthêm một thành viên mới và điểm liên quan vào một tập hợp đã sắp xếp. Nếu thành viên đã tồn tại, điểm sẽ được cập nhật.
- ZRANGEtrả về các thành viên của một tập hợp đã sắp xếp, được sắp xếp trong một phạm vi nhất định.
- ZRANKtrả về thứ hạng của thành viên được cung cấp, giả sử sắp xếp theo thứ tự tăng dần.
- ZREVRANKtrả về thứ hạng của thành viên được cung cấp, giả sử tập hợp được sắp xếp theo thứ tự giảm dần.

- **Publish Subscribe**

- *psubscribe r* : dung de dang ky va co the goi qua nhau theo kểu tin nhắn.  