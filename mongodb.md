## **ORM**

- ORM (Object Relational Mapping), là một kỹ thuật/cơ chế lập trình thực hiện ánh xạ CSDL sang các đối tượng trong các ngôn ngữ lập trình hướng đối tượng như Java, C# …(các table tương ứng các class, mối ràng buộc giữa các table tương ứng quan hệ giữa các class ‘has a’ , ‘is a’).
-  ORM hỗ trợ mapping giữa Object Model với Relational DB.

**ƯU Điểm**

- OOP: ORM giúp lập trình viên tập trung vào lập trình hướng đối tượng
- Tính độc lập: Làm việc được với nhiều loại database(hệ quản trị cơ sở dữ liệu), nhiều kiểu dữ liệu khác nhau. Dễ dàng thay đổi loại database hơn. Các câu lệnh SQL không phụ thuộc vào loại database.
- Đơn giản, dễ sử dụng: Hỗ trợ HSQL, cung cấp nhiều nhiều API truy vấn.
- Năng suất hơn: viết code ít hơn, dễ hiểu hơn. Phù hợp các case CRUD (Create, Read, Update, Delete)
- Khả năng sử dụng lại code.

**Nhược Điểm**

- Khả năng truy vấn bị hạn chế, nhiều trường hợp ta vẫn phải dùng native SQL để truy vấn database.
- Khó tối ưu câu lệnh SQL (do câu lệnh SQL được ORM tự động sinh ra).

## **driver**

- Là một thư viện giúp database và các ứng dụng có thể giao tiếp với nhau, và có thể truy vấn với nhau như thêm xóa sửa.

## **Design** 

- Schema Quan hệ 1:1, 1:N, N:N

## Mongoose 
- Mongoose là một Object Data Modeling (ODM) cho Node.js và MongoDB. Nó cho phép chúng ta tương tác với database thông qua các đối tượng JavaScript. Mongoose sử dụng các schema để định nghĩa cấu trúc của các document trong database. Mongoose cũng hỗ trợ các tính năng như validation, middleware, hooks, virtuals, indexes, inheritance, và các tính năng khác.

## SQL and NoSQL

|             | SQL     | NoSQL       |
| :---        |    :----:   |          ---: |
|**Hiệu Xuất**| Kém hơn NoSQL vì khi truy vấn nó phải tính toán, kiểm tra và sử lý các mối quan hệ ràng buộc       | Tốt hơn SQL vì bỏ qua các ràng buộc     |
| **Mở rộng theo chiều ngang**   | Có thể thực hiện được nhưng. Quá trình mở rộng sẽ rất phức tập nếu đã tồn tại dữ liệu trong database        | Mở Rộng dễ dàng      |
| **Tốc đố read/write**   | Kém hơn NoSQL  vì phải đảm bảo tính ràng buộc giữa các bảng. Nếu sử dụng nhiều server thì phải bảo toàn tính nhất quán về dữ liệu ở các server với nhau        |  Tố độ nhanh hơn SQL vì bỏ qua các cơ cế ràng buộc của cá bảng. Vì dữ liệu dược lưu trong Ram, Sau đó mới đẩy xuống HĐ và nó tính nất quán cuối      |
| **Phần cứng**   | Đòi hỏi phần cứng cao        | Không đòi hỏi quá nhiều phần cứng      |
| **Thay Đổi số node trong hệ thống**   | Vì tính nhất quán về dữ liệu nên khi thêm hay xóa 1 node cần phải shutdown hệ thống trong một khoảng thời gian        | Vì tính nhất quán cuối nên sẽ không cần phải shutdown hệ thống      |
| **Truy vấn và báo cáo**   | Dễ dàng sử dụng ngôn ngữ SQL query để truy vấn trực tiếp dữ liệu từ database hoặc dùng công cụ hỗ trợ để lấy báo cáo         | Việc lấy báo cáo dữ liệu trực tiếp từ NoSQL chưa được hỗ trợ tốt, thực hiện chủ yêu thông qua giao diện ứng dụng      |
| **Mở rộng dữ liệu**   | Khi muốn bổ xung thêm cột cho một bảng, chúng ta phải khai báo trước        | Không cần khai báo trước      |
| **Ứng dụng**   | Sử dụng để xay dựng những hệ thống có quan hệ chặt chẽ và cần tính đồng nhất về dữ liệu như : tài chính ngân hàng, chứng khoán        | Sử dụng xây dựng những hệ thống lưu trữ thông tin lớn, không quá quan trọng về vấn đề đồng nhất dữ liệu trong 1 thời gian nhất định. VD như: mạng xã hội, shpopping      |

## **Index**

- Index trong database cũng giống như mục lục của một cuốn sách. Thay vì tìm từng trang của cuốn sách Database tạo một mục lục, và nó chỉ việc tìm nội dung của cuốn sách qua mục lục đó. Qua đó giúp cho câu lệnh truy vấn nhanh hơn. Một câu truy vấn không có index được gọi là table scan. Nghĩa là Database phải xem qua toàn bộ các Document để tìm được kết quả truy vấn, và đối với các collection lớn, câu truy vấn sẽ rất chậm

**Các loại index**

- Single Field Index

- Compound Index

## **Crud**

- *create*

>const user = new User({ name: 'John', age: 20 });
>user.save();

Trong đó: 

1 new User({ name: 'John', age: 20 }) là một document
2 user.save() là phương thức để lưu document vào database

Create() model

>const Tank = mongoose.model('Tank', yourSchema);

>const small = new Tank({ size: 'small' });
>small.save(function (err) {
>  if (err) return handleError(err);
>  // saved!
>});
>
>// or
>
>Tank.create({ size: 'small' }, function (err, small) {
>  if (err) return handleError(err);
>  // saved!
>});
>
>// or, for inserting large batches of documents
>Tank.insertMany([{ size: 'small' }], function(err) {
>
>})

## Model findByID

>// Find the adventure with the given `id`, or `null` if not found
>await Adventure.findById(id).exec();
>
>// using callback
>Adventure.findById(id, function (err, adventure) {});
>
>// select only the adventures name and length
>await Adventure.findById(id, 'name length').exec();

## Model FindByidAnđelete

>// Find the adventure with the given `id`, or `null` if not found
>await Adventure.findByIdAndDelete(id).exec();
>await Adventure.findByIdAndDelete({ _id: id }).exec();

## Model findByIdAndRemove

>A.findByIdAndRemove(id, options, callback) // executes
>A.findByIdAndRemove(id, options)  // return Query
>A.findByIdAndRemove(id, callback) // executes
>A.findByIdAndRemove(id) // returns Query
>A.findByIdAndRemove() 

## Model findByIdAndUpdate

>A.findByIdAndUpdate(id, update, options, callback) // executes
>A.findByIdAndUpdate(id, update, options)  // returns Query
>A.findByIdAndUpdate(id, update, callback) // executes
>A.findByIdAndUpdate(id, update)           // returns Query
>A.findByIdAndUpdate()    

- **find**
- Accountmodl.find({username: "nodeudemy"}).then(data => {data => {console.log('dulieu', data)}
.catch(err => {
  console.log)'err,err})
})

- **create**
AccountModel.create({
  usernamee: "Anh"
  password: 5555
})
.then(data=>{
  console.log("thanh cong")
})
.catch(err => {
  console.log("that bai")
})

- **Update**
Account.updateMany({username: 'nodemy'},{password: 112},{password: '456'}).then(data=>{console.log(data)})

- **updateOne**
- **delete**
- **deleteOne**

## **Aggregation**

- Aggregation framework là một truy vấn nâng cao của MongoDb, cho phép thực hiện tính toán , xử lý và kết hợp từ nhiều document(tương tự các bảng trong SQL) để cho ra thông tin cần thiết.

- Aggregation là một trong những tính năng nổi bật và quan trọng trong việc tính toán xử lý dữ liệu trong mongoDb mà hầu hết các hệ thống hiện nay đang dùng. Nắm vững Aggregation Framework khiến chúng ta dễ dàng thao tác xử lý một cách đơn giản data với MongoDB.

> // chọn những file muốn ra. 
>db.Customer.aggregate( [ { $project : { address : 1 , city : 1 , state: 1 } } ] )
## **Populate**

- viết câu lệnh populate(Trường nào)

- schema: ref => model nào

- Trường hợp bình thường: .populate(1 lần populate)

- trường hợp bên trong có 1 object con: .populate({list_c})

account.find({
  username: 'student1'
})
.populate('course'){
  .populate({
    path: 'course'
    populate: {path: 'teache'}
  })
}

- **create Populate**

>Story.
> findOne({ title: 'Casino Royale' }).
>  populate('author').
>  exec(function (err, story) {
>    if (err) return handleError(err);
>    console.log(story);
>});
## **Mongoose**

- Mongoose là một Object Data Modeling (ODM) cho Node.js và MongoDB. Nó cho phép chúng ta tương tác với database thông qua các đối tượng JavaScript. Mongoose sử dụng các schema để định nghĩa cấu trúc của các document trong database. Mongoose cũng hỗ trợ các tính năng như validation, middleware, hooks, virtuals, indexes, inheritance, và các tính năng khác.

- Các kểu dữ liệu trong Schema String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema.

## **Index**
- Chỉ mục (Index) hỗ trợ việc phân giải các truy vấn hiệu quả hơn. Nếu không có chỉ mục, MongoDB phải quét qua mọi Document của một Collection để chọn các Document mà kết nối với lệnh truy vấn. Việc quét này có thể không hiệu quả và yêu cầu MongoDB xử lý một số lượng lớn dữ liệu.
Chỉ mục (Index) là các cấu trúc dữ liệu đặc biệt, lưu giữ một phần nhỏ của tập hợp dữ liệu, giúp việc "vọc" vào Collection một cách dễ dàng hơn. Chỉ mục lưu giữ giá trị của một trường cụ thể hoặc tập hợp các trường, được sắp xếp bởi giá trị của trường như đã được xác định trong chỉ mục.

- **create Index**

>db.nember.createindex({email:1})

## **Object ID**

- 12 bytes (24 hexadecimal character)
- contain a 4-byte timestamp value + 5-bye random value +3-bye incrementing counter
- when a document is created, _id is automatically assigned with a new ObjectId
- Method: 
- getTimestamp
- valueOf
- toString
- Properties
- Str